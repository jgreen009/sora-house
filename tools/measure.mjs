import { chromium } from 'playwright-core';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const proto = join(root, 'design', 'prototypes');
const EXEC = 'C:/Users/OWNER/AppData/Local/ms-playwright/chromium-1243/chrome-win64/chrome.exe';

const file = process.argv[2];
const sel = process.argv[3];

const browser = await chromium.launch({ executablePath: EXEC });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(pathToFileURL(join(proto, file)).href, { waitUntil: 'load' });
await page.evaluate(() => {
  document.querySelectorAll('img').forEach((i) => { i.loading = 'eager'; });
  document.querySelectorAll('.reveal').forEach((e) => e.classList.add('is-in'));
});

const out = await page.evaluate((sel) => {
  const nodes = [...document.querySelectorAll(sel)];
  return nodes.map((n) => {
    const r = n.getBoundingClientRect();
    const cs = getComputedStyle(n);
    return {
      tag: n.tagName.toLowerCase(),
      cls: n.className && typeof n.className === 'string' ? n.className : '',
      text: (n.textContent || '').trim().slice(0, 42),
      top: Math.round(r.top + window.scrollY),
      bottom: Math.round(r.bottom + window.scrollY),
      left: Math.round(r.left),
      right: Math.round(r.right),
      w: Math.round(r.width),
      h: Math.round(r.height),
      padTop: cs.paddingTop,
      padBottom: cs.paddingBottom,
      pos: cs.position,
    };
  });
}, sel);

console.log(JSON.stringify(out, null, 1));
await browser.close();
