import { chromium } from 'playwright-core';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const EXEC = 'C:/Users/OWNER/AppData/Local/ms-playwright/chromium-1243/chrome-win64/chrome.exe';
const browser = await chromium.launch({ executablePath: EXEC });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
page.on('console', (m) => console.log('console:', m.type(), m.text()));
page.on('requestfailed', (r) => console.log('failed:', r.url(), r.failure()?.errorText));
await page.goto(pathToFileURL(join(root, 'design/prototypes/index.html')).href, { waitUntil: 'networkidle' });
const data = await page.evaluate(() => {
  const out = [];
  document.querySelectorAll('.gallery-item').forEach((item) => {
    const fig = item.querySelector('.figure');
    const img = item.querySelector('img');
    const r = fig ? fig.getBoundingClientRect() : null;
    out.push({
      item: item.className,
      fig: r ? [Math.round(r.width), Math.round(r.height)] : null,
      img: img ? [img.naturalWidth, img.naturalHeight, img.currentSrc?.split('/').pop(), img.complete] : null,
      opacity: getComputedStyle(item).opacity,
    });
  });
  const hero = document.querySelector('.hero__title');
  return { out, heroOpacity: hero ? getComputedStyle(hero).opacity : null, heroClass: hero?.className };
});
console.log(JSON.stringify(data, null, 2));
await browser.close();
