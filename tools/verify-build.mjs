import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { resolve, dirname, join, extname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = join(root, 'dist');
export function verifyBuild() {
  assert.ok(existsSync(join(output, 'index.html')), 'Run npm run build first');
  const manifest = JSON.parse(readFileSync(join(root, 'tools/.build/manifest.json'), 'utf8'));
  const config = JSON.parse(readFileSync(join(root, 'vercel.json'), 'utf8'));
  assert.equal(config.outputDirectory, 'dist');
  assert.equal(config.cleanUrls, true);
  assert.equal(config.trailingSlash, false);
  assert.ok(existsSync(join(output, '404.html')));
  assert.ok(!existsSync(join(output, 'components.html')));
  const files = directory => readdirSync(directory).flatMap(name => {
    const path = join(directory, name);
    return statSync(path).isDirectory() ? files(path) : [path];
  });
  const all = files(output);
  const permitted = new Set(['.html', '.css', '.js', '.svg', '.png', '.webp', '.woff2', '.txt', '.xml']);
  for (const file of all) {
    assert.ok(permitted.has(extname(file)), 'Unexpected public file: ' + relative(output, file));
    assert.ok(!/originals|generation-journal|image-map|image-variants|node_modules|documentation|\.frames/.test(relative(output, file)), 'Private source in output');
  }
  const localPath = url => {
    const pathname = new URL(url, 'https://local.invalid').pathname;
    if (pathname === '/') return join(output, 'index.html');
    return join(output, pathname.slice(1) + (extname(pathname) ? '' : '.html'));
  };
  for (const { file } of manifest.pages) {
    const html = readFileSync(join(output, file), 'utf8');
    assert.ok(html.includes('data-url-mode="clean"'));
    assert.ok(!/localhost|127\.0\.0\.1|\.\.\/assets\/|design\/prototypes\//.test(html), 'Development reference in ' + file);
    assert.ok(!/\{\{[A-Z_]+\}\}/.test(html), 'Unresolved template in ' + file);
    for (const match of html.matchAll(/\b(?:href|src|action|data-full)="([^"]+)"/g)) {
      const value = match[1];
      if (/^(https?:|mailto:|tel:|data:)/.test(value)) continue;
      if (value.startsWith('#')) {
        assert.ok(html.includes(`id="${value.slice(1)}"`), 'Missing fragment ' + value + ' in ' + file);
        continue;
      }
      assert.ok(value.startsWith('/'), 'Relative production URL in ' + file + ': ' + value);
      assert.ok(existsSync(localPath(value)), 'Broken URL in ' + file + ': ' + value);
      const hash = value.split('#')[1];
      if (hash) assert.ok(readFileSync(localPath(value), 'utf8').includes(`id="${hash}"`), 'Missing destination fragment: ' + value);
    }
    for (const match of html.matchAll(/srcset="([^"]+)"/g)) for (const candidate of match[1].split(',')) assert.ok(existsSync(localPath(candidate.trim().split(/\s+/)[0])), 'Missing responsive candidate');
    if (manifest.origin && file !== '404.html') assert.ok(html.includes('rel="canonical"'));
    if (manifest.preview || ['404.html', 'confirmation.html', 'book.html'].includes(file)) assert.ok(html.includes('content="noindex, follow"'));
  }
  for (const asset of manifest.assets) {
    assert.match(asset.url, /\.[a-f0-9]{12}\.[a-z0-9]+$/);
    const file = localPath(asset.url);
    assert.equal(statSync(file).size, asset.bytes);
    if (extname(file) === '.css') for (const match of readFileSync(file, 'utf8').matchAll(/url\("([^\"]+)"\)/g)) if (!match[1].startsWith('data:')) assert.ok(existsSync(localPath(match[1])), 'Broken CSS resource');
  }
  const robots = readFileSync(join(output, 'robots.txt'), 'utf8');
  if (manifest.preview) assert.ok(robots.includes('Disallow: /\n'));
  if (manifest.origin && !manifest.preview) {
    const sitemap = readFileSync(join(output, 'sitemap.xml'), 'utf8');
    assert.ok(!/\/confirmation<|\/404<|\/components</.test(sitemap));
    assert.ok(robots.includes(manifest.origin + '/sitemap.xml'));
  }
  console.log(`Build verified: ${manifest.pages.length} routes, ${manifest.assets.length} assets, ${all.reduce((total, file) => total + statSync(file).size, 0)} bytes.`);
  return manifest;
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) verifyBuild();
