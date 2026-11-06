import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const fontsDir = join(root, 'assets', 'fonts');
const outDir = join(root, 'assets', 'branding');
mkdirSync(outDir, { recursive: true });

const regular = readFileSync(join(fontsDir, 'jizBRFtNs2ka5fXjeivQ4LroWlx-6zUTjg.woff2')).toString('base64');

const INK = '#282824';
const COAST = '#304444';
const IVORY = '#F5F1E9';

const fontFace = `@font-face{font-family:'Instrument Serif';src:url(data:font/woff2;base64,${regular}) format('woff2');font-weight:400;font-style:normal;}`;

const write = (name, body) => {
  writeFileSync(join(outDir, name), body.trim() + '\n', 'utf8');
  console.log('wrote', name);
};

// --- Primary horizontal wordmark -------------------------------------------
const horizontal = (fill) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 132" width="760" height="132" role="img" aria-label="Sora House">
  <title>Sora House</title>
  <style>${fontFace}
    .wm{font-family:'Instrument Serif',Georgia,serif;font-weight:400;fill:${fill};}</style>
  <text class="wm" x="4" y="96" font-size="88" letter-spacing="0.145em">SORA HOUSE</text>
</svg>`;

write('wordmark-horizontal-ink.svg', horizontal(INK));
write('wordmark-horizontal-ivory.svg', horizontal(IVORY));

// --- Stacked lockup ---------------------------------------------------------
const stacked = (fill) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 216" width="660" height="216" role="img" aria-label="Sora House">
  <title>Sora House</title>
  <style>${fontFace}
    .wm{font-family:'Instrument Serif',Georgia,serif;font-weight:400;fill:${fill};}</style>
  <text class="wm" x="6" y="108" font-size="104" letter-spacing="0.12em">SORA</text>
  <text class="wm" x="12" y="176" font-size="42" letter-spacing="0.54em">HOUSE</text>
</svg>`;

write('wordmark-stacked-ink.svg', stacked(INK));
write('wordmark-stacked-ivory.svg', stacked(IVORY));

// --- Horizon mark (pure vector, no type) -----------------------------------
const mark = (stroke, bg) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" role="img" aria-label="Sora House mark">
  <title>Sora House mark</title>
  ${bg ? `<rect width="64" height="64" fill="${bg}"/>` : ''}
  <g fill="none" stroke="${stroke}" stroke-width="2.6" stroke-linecap="round">
    <circle cx="32" cy="32" r="19.5"/>
    <path d="M0 38.5 H11.5"/>
    <path d="M52.5 38.5 H64"/>
  </g>
</svg>`;

write('mark-horizon-ink.svg', mark(INK));
write('mark-horizon-ivory.svg', mark(IVORY));

// --- Favicon ---------------------------------------------------------------
write('favicon.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect width="64" height="64" fill="${COAST}"/>
  <g fill="none" stroke="${IVORY}" stroke-width="3" stroke-linecap="round">
    <circle cx="32" cy="32" r="17"/>
    <path d="M4 38 H13"/>
    <path d="M51 38 H60"/>
  </g>
</svg>`);

// --- Social preview --------------------------------------------------------
write('social-preview.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630" role="img" aria-label="Sora House — a slower way to stay">
  <title>Sora House</title>
  <style>${fontFace}
    .wm{font-family:'Instrument Serif',Georgia,serif;font-weight:400;fill:${INK};}
    .ui{font-family:'Helvetica Neue',Arial,sans-serif;font-weight:400;fill:#6B6459;}</style>
  <rect width="1200" height="630" fill="${IVORY}"/>
  <rect x="0" y="0" width="1200" height="8" fill="${COAST}"/>
  <g transform="translate(600 214)" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round">
    <circle cx="0" cy="0" r="30"/>
    <path d="M-58 12 H-30"/>
    <path d="M30 12 H58"/>
  </g>
  <text class="wm" x="600" y="352" text-anchor="middle" font-size="104" letter-spacing="0.14em">SORA HOUSE</text>
  <text class="ui" x="600" y="404" text-anchor="middle" font-size="26" letter-spacing="0.16em">A SLOWER WAY TO STAY</text>
  <line x1="500" y1="452" x2="700" y2="452" stroke="#C9BCA8" stroke-width="1"/>
  <text class="ui" x="600" y="500" text-anchor="middle" font-size="20">Twelve rooms · Atlantic coast, Portugal</text>
</svg>`);
