import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createProductionServer } from './serve-production.mjs';
import { verifyBuild } from './verify-build.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const manifest = verifyBuild();
const server = createProductionServer();
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
try {
  for (const page of manifest.pages) {
    const response = await fetch(origin + page.route);
    assert.equal(response.status, 200, page.route);
    assert.ok((await response.text()).includes('<main'));
    assert.equal(response.headers.get('x-content-type-options'), 'nosniff');
  }
  for (const [source, destination] of [['/index.html', '/'], ['/index', '/'], ['/rooms.html', '/rooms'], ['/rooms/', '/rooms'], ['/design/prototypes/index.html', '/'], ['/design/prototypes/book.html?room=suite', '/book?room=suite']]) {
    const response = await fetch(origin + source, { redirect: 'manual' });
    assert.equal(response.status, 308, source);
    assert.equal(response.headers.get('location'), destination);
  }
  for (const path of ['/not-a-page', '/not/a/page', '/components', '/docs/project-state.md', '/tools/build-site.mjs', '/.env', '/AGENTS.md', '/assets/photography/qa/asset-sheet-1.jpg', '/assets/photography/originals/house-exterior.png', '/assets/photography/generation-journal.json']) {
    const response = await fetch(origin + path);
    assert.equal(response.status, 404, path);
    assert.ok((await response.text()).includes('This page has wandered off'));
  }
  for (const asset of manifest.assets) {
    const response = await fetch(origin + asset.url, { method: 'HEAD' });
    assert.equal(response.status, 200, asset.url);
    assert.match(response.headers.get('cache-control'), /31536000.*immutable/);
    assert.equal(Number(response.headers.get('content-length')), asset.bytes);
  }
  const confirmation = await fetch(origin + '/confirmation?room=suite');
  assert.equal(confirmation.headers.get('x-robots-tag'), 'noindex, follow');
  const config = JSON.parse(readFileSync(join(root, 'vercel.json'), 'utf8'));
  assert.equal(config.framework, null);
  assert.equal(config.buildCommand, 'npm run build');
  console.log('Deployment checks passed: public pages, redirects, 404/private-source isolation, immutable assets and stay-details indexing.');
} finally {
  server.closeAllConnections();
  await new Promise(resolve => server.close(resolve));
}
