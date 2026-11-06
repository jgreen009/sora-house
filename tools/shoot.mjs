import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const proto = join(root, 'design', 'prototypes');
const shots = join(proto, 'screenshots');
mkdirSync(shots, { recursive: true });

const EXEC = 'C:/Users/OWNER/AppData/Local/ms-playwright/chromium-1243/chrome-win64/chrome.exe';

const targets = [
  ['index', 'index.html'],
  ['rooms', 'rooms.html'],
  ['room-atlantic', 'room-atlantic.html'],
  ['book', 'book.html'],
  ['experiences', 'experiences.html'],
  ['gallery', 'gallery.html'],
  ['about', 'about.html'],
  ['contact', 'contact.html'],
  ['confirmation', 'confirmation.html'],
  ['components', 'components.html'],
  ['404', '404.html'],
];

const viewports = [
  { tag: 'desktop', width: 1440, height: 900, dsf: 1 },
  { tag: 'mobile', width: 390, height: 844, dsf: 2 },
];

const only = process.argv[2];

const browser = await chromium.launch({ executablePath: EXEC });
for (const vp of viewports) {
  if (only && only !== vp.tag) continue;
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: vp.dsf,
    reducedMotion: 'no-preference',
  });
  const page = await context.newPage();
  for (const [name, file] of targets) {
    await page.goto(pathToFileURL(join(proto, file)).href, { waitUntil: 'load', timeout: 60000 });
    await page.evaluate(async () => {
      await document.fonts.ready;
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-in'));
      const step = window.innerHeight * 0.8;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 120));
      }
      window.scrollTo(0, document.body.scrollHeight);
      await new Promise((r) => setTimeout(r, 400));
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 700));
    });
    await page.screenshot({ path: join(shots, `${name}-${vp.tag}.png`), fullPage: true });
    console.log('shot', `${name}-${vp.tag}.png`);
  }
  await context.close();
}
await browser.close();
