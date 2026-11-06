import { spawnSync } from 'node:child_process';
import { readFileSync, existsSync, writeFileSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const build = join(root, 'tools/build-site.mjs');
const base = { ...process.env };
for (const key of ['SITE_URL', 'VERCEL_URL', 'VERCEL_PROJECT_PRODUCTION_URL', 'VERCEL_ENV']) delete base[key];
const run = environment => spawnSync(process.execPath, [build], { cwd: root, env: { ...base, ...environment }, encoding: 'utf8' });
const report = [];
try {
  let result = run({ SITE_URL: 'https://deployment.invalid', VERCEL_ENV: 'production' });
  assert.equal(result.status, 0, result.stderr);
  const production = readFileSync(join(root, 'dist/index.html'), 'utf8');
  assert.ok(production.includes('rel="canonical" href="https://deployment.invalid/"'));
  assert.ok(/property="og:image" content="https:\/\/deployment\.invalid\/assets\/branding\/social-preview\.[a-f0-9]{12}\.png"/.test(production));
  const sitemap = readFileSync(join(root, 'dist/sitemap.xml'), 'utf8');
  assert.equal((sitemap.match(/<loc>/g) || []).length, 12);
  assert.ok(!readFileSync(join(root, 'dist/robots.txt'), 'utf8').includes('Disallow: /confirmation'));
  report.push('Explicit production origin produces absolute canonical/share URLs and twelve sitemap entries; crawlers can read noindex directives');
  result = run({ VERCEL_PROJECT_PRODUCTION_URL: 'deployment.invalid', VERCEL_URL: 'branch.deployment.invalid', VERCEL_ENV: 'preview' });
  assert.equal(result.status, 0, result.stderr);
  const manifest = JSON.parse(readFileSync(join(root, 'tools/.build/manifest.json'), 'utf8'));
  for (const page of manifest.pages) assert.ok(readFileSync(join(root, 'dist', page.file), 'utf8').includes('name="robots" content="noindex, follow"'));
  assert.ok(readFileSync(join(root, 'dist/index.html'), 'utf8').includes('href="https://deployment.invalid/"'));
  assert.ok(!existsSync(join(root, 'dist/sitemap.xml')));
  assert.ok(readFileSync(join(root, 'dist/robots.txt'), 'utf8').includes('Disallow: /\n'));
  report.push('Preview environment suppresses indexing/sitemap and uses the stable production domain for canonical metadata');
  result = run({ SITE_URL: 'http://deployment.invalid/path' });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /SITE_URL must be an HTTPS origin/);
  report.push('Invalid non-HTTPS or path-based site origins fail the build');
} finally {
  const restored = spawnSync(process.execPath, [build], { cwd: root, env: process.env, encoding: 'utf8' });
  if (restored.status !== 0) throw new Error('Could not restore the normal build: ' + restored.stderr);
}
writeFileSync(join(root, 'tools/.build/metadata-checks.json'), JSON.stringify({ checks: report, restored: true }, null, 2) + '\n');
console.log(report.join('\n'));
console.log('Normal deployment build restored.');
