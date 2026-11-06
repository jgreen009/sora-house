import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const A = (p) => join(root, 'assets', p);
mkdirSync(A('architecture'), { recursive: true });
mkdirSync(A('rooms'), { recursive: true });
mkdirSync(A('experiences'), { recursive: true });
mkdirSync(A('gallery'), { recursive: true });

const P = {
  ivory: '#F5F1E9',
  ivoryLight: '#FBF8F2',
  sand: '#DDD0BD',
  sandDeep: '#C8B79E',
  taupe: '#B69979',
  taupeDeep: '#96795C',
  coastal: '#304444',
  coastalLight: '#3F5B5A',
  ink: '#282824',
  sea: '#5C7B7C',
  seaLight: '#8FA6A4',
  skyLight: '#E8E3D6',
  sky: '#D9D3C4',
  linen: '#EDE7DA',
  linenShade: '#D9D1C0',
  oak: '#A98461',
  oakDeep: '#7E6045',
};

const rnd = (seed) => {
  let s = seed >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
};

const grain = (id, amount = 0.16) => `<filter id="${id}" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" seed="7" result="n"/>
    <feColorMatrix in="n" type="saturate" values="0" result="d"/>
    <feComponentTransfer in="d" result="t"><feFuncA type="linear" slope="${amount}" intercept="0"/></feComponentTransfer>
    <feBlend in="SourceGraphic" in2="t" mode="multiply"/>
  </filter>`;

const seaSky = (id, w, h, horizonY, opts = {}) => {
  const { deep = P.sea, light = P.seaLight, sky = P.skyLight, sun = true, sunX = 0.72 } = opts;
  const lines = [];
  const r = rnd(opts.seed || 5);
  for (let i = 0; i < 26; i += 1) {
    const y = horizonY + 6 + i * ((h - horizonY) / 26);
    const len = 60 + r() * (w * 0.55);
    const x = r() * (w - len);
    const o = 0.06 + r() * 0.2;
    lines.push(`<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${len.toFixed(1)}" height="${(1.4 + r() * 1.8).toFixed(1)}" fill="${P.ivoryLight}" opacity="${o.toFixed(2)}"/>`);
  }
  return `
  <linearGradient id="${id}sky" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="${sky}"/><stop offset="0.72" stop-color="${P.ivory}"/><stop offset="1" stop-color="${P.ivoryLight}"/>
  </linearGradient>
  <linearGradient id="${id}sea" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="${light}"/><stop offset="0.35" stop-color="${deep}"/><stop offset="1" stop-color="${P.coastal}"/>
  </linearGradient>
  <rect width="${w}" height="${h}" fill="url(#${id}sky)"/>
  ${sun ? `<circle cx="${(w * sunX).toFixed(0)}" cy="${(horizonY - h * 0.14).toFixed(0)}" r="${(h * 0.055).toFixed(0)}" fill="${P.ivoryLight}" opacity="0.85"/>` : ''}
  <rect x="0" y="${horizonY}" width="${w}" height="${h - horizonY}" fill="url(#${id}sea)"/>
  ${lines.join('\n  ')}`;
};

const duneCurve = (w, h, baseY, amp, fill, opacity = 1, phase = 0) => {
  const pts = [];
  for (let i = 0; i <= 10; i += 1) {
    const x = (w / 10) * i;
    const y = baseY + Math.sin(i * 0.8 + phase) * amp;
    pts.push(`${x.toFixed(0)},${y.toFixed(0)}`);
  }
  return `<polygon points="0,${h} ${pts.join(' ')} ${w},${h}" fill="${fill}" opacity="${opacity}"/>`;
};

const arch = (x, y, w, h, fill, r = null) => {
  const rr = r ?? w / 2;
  return `<path d="M${x} ${y + h} L${x} ${y + rr} A${rr} ${rr} 0 0 1 ${x + w} ${y + rr} L${x + w} ${y + h} Z" fill="${fill}"/>`;
};

const leafPlant = (x, y, s, fill = P.taupeDeep, opacity = 0.85) => `
  <g transform="translate(${x} ${y}) scale(${s})" fill="${fill}" opacity="${opacity}">
    <path d="M0 0 C-4 -26 -18 -38 -30 -44 C-20 -26 -10 -12 0 0 Z"/>
    <path d="M0 0 C4 -28 20 -42 34 -48 C22 -28 10 -12 0 0 Z"/>
    <path d="M0 0 C-2 -18 -2 -34 0 -50 C4 -32 6 -16 0 0 Z" opacity="0.8"/>
  </g>`;

/* ---------------------------------------------------------------- exterior */
function exterior(w, h, seed, opts = {}) {
  const { building = true, close = false, archCount = 5 } = opts;
  const r = rnd(seed);
  const horizonY = h * (close ? 0.42 : 0.46);
  let s = seaSky('e' + seed, w, h, horizonY, { seed });
  const bx = w * 0.12;
  const bw = w * 0.62;
  const by = h * 0.3;
  const bh = h * 0.34;
  s += `\n  ${duneCurve(w, h, h * 0.66, h * 0.03, P.sand, 0.85, 1.2)}`;
  if (building) {
    const aw = bw / (archCount * 2);
    let arches = '';
    for (let i = 0; i < archCount; i += 1) {
      const ax = bx + aw * 0.6 + i * aw * 2;
      arches += arch(ax, by + bh * 0.22, aw, bh * 0.78, P.coastal, aw / 2);
      arches += arch(ax + aw * 0.08, by + bh * 0.3, aw * 0.84, bh * 0.7, P.sandDeep, aw / 2);
      arches += arch(ax + aw * 0.08, by + bh * 0.3, aw * 0.84, bh * 0.7, `url(#glow)`, aw / 2);
    }
    s += `
  <rect x="${bx}" y="${by}" width="${bw}" height="${bh}" fill="${P.ivoryLight}"/>
  <rect x="${bx}" y="${by}" width="${bw}" height="${bh * 0.06}" fill="${P.sand}"/>
  ${arches}
  <rect x="${bx}" y="${by + bh * 0.94}" width="${bw}" height="${bh * 0.06}" fill="${P.sandDeep}" opacity="0.6"/>
  <polygon points="${bx + bw},${by + bh} ${bx + bw + w * 0.18},${by + bh + h * 0.16} ${bx + bw - w * 0.04},${by + bh + h * 0.16}" fill="${P.sandDeep}" opacity="0.35"/>`;
  }
  s += `\n  ${duneCurve(w, h, h * 0.78, h * 0.035, P.sandDeep, 0.9, 2.4)}`;
  s += `\n  ${duneCurve(w, h, h * 0.88, h * 0.025, P.taupe, 0.85, 0.6)}`;
  const grass = [];
  for (let i = 0; i < 26; i += 1) {
    const x = r() * w;
    const y = h * (0.8 + r() * 0.18);
    const hh = h * (0.02 + r() * 0.05);
    grass.push(`<path d="M${x.toFixed(0)} ${y.toFixed(0)} q${(r() * 6 - 3).toFixed(1)} ${(-hh * 0.6).toFixed(1)} ${(r() * 10 - 5).toFixed(1)} ${(-hh).toFixed(1)}" stroke="${P.taupeDeep}" stroke-width="1.6" fill="none" opacity="0.5"/>`);
  }
  s += `\n  ${grass.join('\n  ')}`;
  s += `\n  <rect width="${w}" height="${h}" fill="url(#warm)"/>`;
  return wrap(w, h, s, `exterior-${seed}`);
}

/* ---------------------------------------------------------------- interior */
function interior(w, h, seed, variant = 'room') {
  const r = rnd(seed);
  const wallBottom = h * 0.68;
  let s = `<rect width="${w}" height="${h}" fill="${P.ivoryLight}"/>
  <rect width="${w}" height="${wallBottom}" fill="url(#wall)"/>
  <rect y="${wallBottom}" width="${w}" height="${h - wallBottom}" fill="${P.oak}"/>
  <rect y="${wallBottom}" width="${w}" height="${h - wallBottom}" fill="url(#floor)"/>`;

  // aperture
  const ax = w * 0.52;
  const aw = w * 0.4;
  const ay = h * 0.1;
  const ah = wallBottom - ay - h * 0.04;
  const useArch = variant === 'arch';
  const horizonY = ay + ah * 0.46;
  const inner = seaSky('i' + seed, aw, ah, ah * 0.46, { seed: seed + 3 });
  if (useArch) {
    s += `<defs><clipPath id="clip${seed}"><path d="M${ax} ${ay + ah} L${ax} ${ay + aw / 2} A${aw / 2} ${aw / 2} 0 0 1 ${ax + aw} ${ay + aw / 2} L${ax + aw} ${ay + ah} Z"/></clipPath></defs>
    <g clip-path="url(#clip${seed})" transform="translate(${ax} ${ay})">${inner}</g>
    <path d="M${ax} ${ay + ah} L${ax} ${ay + aw / 2} A${aw / 2} ${aw / 2} 0 0 1 ${ax + aw} ${ay + aw / 2} L${ax + aw} ${ay + ah} Z" fill="none" stroke="${P.sandDeep}" stroke-width="3"/>`;
  } else {
    s += `<defs><clipPath id="clip${seed}"><rect x="${ax}" y="${ay}" width="${aw}" height="${ah}"/></clipPath></defs>
    <g clip-path="url(#clip${seed})" transform="translate(${ax} ${ay})">${inner}</g>
    <rect x="${ax}" y="${ay}" width="${aw}" height="${ah}" fill="none" stroke="${P.sandDeep}" stroke-width="3"/>
    <line x1="${ax + aw / 2}" y1="${ay}" x2="${ax + aw / 2}" y2="${ay + ah}" stroke="${P.sandDeep}" stroke-width="2.5"/>`;
  }

  // light spill on floor
  s += `<polygon points="${ax},${wallBottom} ${ax + aw},${wallBottom} ${ax + aw * 1.25},${h} ${ax - aw * 0.1},${h}" fill="${P.ivoryLight}" opacity="0.28"/>`;

  // bed
  const bx = w * 0.1;
  const bw = w * 0.34;
  const by = h * 0.5;
  const bh = h * 0.16;
  s += `
  <rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="4" fill="${P.linen}"/>
  <rect x="${bx}" y="${by + bh * 0.55}" width="${bw}" height="${bh * 0.45}" fill="${P.linenShade}"/>
  <rect x="${bx - w * 0.01}" y="${by - h * 0.06}" width="${bw * 0.96}" height="${h * 0.07}" rx="3" fill="${P.taupe}"/>
  <rect x="${bx + bw * 0.08}" y="${by - h * 0.03}" width="${bw * 0.3}" height="${h * 0.035}" rx="6" fill="${P.ivoryLight}"/>
  <rect x="${bx + bw * 0.52}" y="${by - h * 0.03}" width="${bw * 0.3}" height="${h * 0.035}" rx="6" fill="${P.ivoryLight}"/>
  <rect x="${bx - w * 0.02}" y="${by + bh}" width="${bw + w * 0.04}" height="${h * 0.03}" fill="${P.oakDeep}" opacity="0.5"/>`;

  // side table + lamp
  const tx = bx + bw + w * 0.04;
  s += `
  <rect x="${tx}" y="${h * 0.58}" width="${w * 0.07}" height="${h * 0.02}" fill="${P.oakDeep}"/>
  <rect x="${tx + w * 0.032}" y="${h * 0.6}" width="${w * 0.006}" height="${h * 0.08}" fill="${P.oakDeep}"/>
  <path d="M${tx + w * 0.012} ${h * 0.47} L${tx + w * 0.058} ${h * 0.47} L${tx + w * 0.05} ${h * 0.42} L${tx + w * 0.02} ${h * 0.42} Z" fill="${P.sand}"/>`;

  // rug
  s += `<ellipse cx="${w * 0.45}" cy="${h * 0.88}" rx="${w * 0.36}" ry="${h * 0.055}" fill="${P.linenShade}" opacity="0.9"/>`;

  // plant
  s += leafPlant(w * 0.05, h * 0.72, (w / 1000) * 1.1);
  s += `<rect x="${w * 0.035}" y="${h * 0.71}" width="${w * 0.035}" height="${h * 0.09}" fill="${P.taupe}"/>`;

  // wall light
  s += `<circle cx="${w * 0.46}" cy="${h * 0.3}" r="${w * 0.012}" fill="${P.ivoryLight}" opacity="0.9"/>
  <circle cx="${w * 0.46}" cy="${h * 0.3}" r="${w * 0.03}" fill="${P.ivoryLight}" opacity="0.18"/>`;

  s += `<rect width="${w}" height="${h}" fill="url(#warm)"/>`;
  return wrap(w, h, s, `interior-${seed}`);
}

/* ---------------------------------------------------------------- dining */
function dining(w, h, seed) {
  const r = rnd(seed);
  let s = `<rect width="${w}" height="${h}" fill="${P.ivory}"/>
  <rect width="${w}" height="${h * 0.55}" fill="url(#wall)"/>
  <rect y="${h * 0.55}" width="${w}" height="${h * 0.45}" fill="${P.oak}"/>
  <rect y="${h * 0.55}" width="${w}" height="${h * 0.45}" fill="url(#floor)"/>
  <rect x="${w * 0.08}" y="${h * 0.12}" width="${w * 0.26}" height="${h * 0.32}" fill="${P.sand}" opacity="0.55"/>`;
  const cx = w * 0.56;
  const cy = h * 0.62;
  s += `
  <ellipse cx="${cx}" cy="${cy + h * 0.06}" rx="${w * 0.3}" ry="${h * 0.06}" fill="${P.oakDeep}" opacity="0.35"/>
  <rect x="${cx - w * 0.26}" y="${cy - h * 0.02}" width="${w * 0.52}" height="${h * 0.035}" rx="6" fill="${P.linen}"/>
  <rect x="${cx - w * 0.24}" y="${cy + h * 0.015}" width="${w * 0.48}" height="${h * 0.012}" fill="${P.linenShade}"/>
  <ellipse cx="${cx - w * 0.1}" cy="${cy - h * 0.025}" rx="${w * 0.07}" ry="${h * 0.016}" fill="${P.ivoryLight}" stroke="${P.sandDeep}" stroke-width="1.5"/>
  <ellipse cx="${cx + w * 0.08}" cy="${cy - h * 0.025}" rx="${w * 0.06}" ry="${h * 0.014}" fill="${P.ivoryLight}" stroke="${P.sandDeep}" stroke-width="1.5"/>
  <circle cx="${cx + w * 0.02}" cy="${cy - h * 0.06}" r="${h * 0.022}" fill="${P.taupe}"/>
  <circle cx="${cx + w * 0.02}" cy="${cy - h * 0.075}" r="${h * 0.008}" fill="${P.taupeDeep}"/>`;
  for (const cxp of [cx - w * 0.34, cx + w * 0.3]) {
    s += `
  <rect x="${cxp}" y="${cy - h * 0.16}" width="${w * 0.035}" height="${h * 0.14}" rx="4" fill="${P.taupe}"/>
  <rect x="${cxp - w * 0.015}" y="${cy - h * 0.18}" width="${w * 0.065}" height="${h * 0.035}" rx="4" fill="${P.sandDeep}"/>`;
  }
  const pendant = [];
  for (let i = 0; i < 3; i += 1) {
    const x = w * (0.32 + i * 0.16);
    pendant.push(`<line x1="${x}" y1="0" x2="${x}" y2="${h * 0.14}" stroke="${P.ink}" stroke-width="1" opacity="0.5"/>
    <path d="M${x - w * 0.035} ${h * 0.2} L${x + w * 0.035} ${h * 0.2} L${x + w * 0.018} ${h * 0.14} L${x - w * 0.018} ${h * 0.14} Z" fill="${P.sand}"/>`);
  }
  s += `\n  ${pendant.join('\n  ')}`;
  s += `<rect width="${w}" height="${h}" fill="url(#warm)"/>`;
  return wrap(w, h, s, `dining-${seed}`);
}

/* ---------------------------------------------------------------- coast */
function coast(w, h, seed, variant = 'path') {
  const r = rnd(seed);
  const horizonY = h * 0.34;
  let s = seaSky('c' + seed, w, h, horizonY, { seed });
  if (variant === 'path') {
    s += `<path d="M0 ${h} L${w * 0.22} ${h * 0.52} L${w * 0.4} ${h * 0.62} L${w * 0.58} ${h * 0.44} L${w * 0.78} ${h * 0.58} L${w} ${h * 0.48} L${w} ${h} Z" fill="${P.sand}"/>`;
    s += `<path d="M0 ${h} L${w * 0.22} ${h * 0.56} L${w * 0.42} ${h * 0.68} L${w * 0.6} ${h * 0.5} L${w * 0.8} ${h * 0.64} L${w} ${h * 0.54} L${w} ${h} Z" fill="${P.sandDeep}" opacity="0.75"/>`;
    s += `<path d="M0 ${h} L${w * 0.3} ${h * 0.78} L${w * 0.55} ${h * 0.86} L${w * 0.78} ${h * 0.74} L${w} ${h * 0.86} L${w} ${h} Z" fill="${P.taupe}" opacity="0.9"/>`;
  } else {
    s += `${duneCurve(w, h, h * 0.6, h * 0.05, P.sand, 1, 0.4)}`;
    s += `${duneCurve(w, h, h * 0.76, h * 0.04, P.taupe, 0.95, 2.1)}`;
  }
  const grass = [];
  for (let i = 0; i < 40; i += 1) {
    const x = r() * w;
    const y = h * (0.62 + r() * 0.36);
    const hh = h * (0.02 + r() * 0.06);
    grass.push(`<path d="M${x.toFixed(0)} ${y.toFixed(0)} q${(r() * 8 - 4).toFixed(1)} ${(-hh * 0.6).toFixed(1)} ${(r() * 12 - 6).toFixed(1)} ${(-hh).toFixed(1)}" stroke="${P.taupeDeep}" stroke-width="1.4" fill="none" opacity="0.45"/>`);
  }
  s += `\n  ${grass.join('\n  ')}`;
  s += `<rect width="${w}" height="${h}" fill="url(#warm)"/>`;
  return wrap(w, h, s, `coast-${seed}`);
}

/* ---------------------------------------------------------------- wellness */
function wellness(w, h, seed) {
  let s = `<rect width="${w}" height="${h}" fill="${P.linen}"/>
  <rect width="${w}" height="${h * 0.7}" fill="url(#wall)"/>
  <circle cx="${w * 0.68}" cy="${h * 0.3}" r="${w * 0.2}" fill="${P.ivoryLight}" opacity="0.55"/>
  <rect y="${h * 0.7}" width="${w}" height="${h * 0.3}" fill="${P.oak}"/>
  <rect y="${h * 0.7}" width="${w}" height="${h * 0.3}" fill="url(#floor)"/>
  <path d="M${w * 0.08} ${h * 0.72} q${w * 0.2} ${-h * 0.12} ${w * 0.42} 0 q${w * 0.22} ${h * 0.12} ${w * 0.42} 0 l0 ${h * 0.1} l${-w * 0.84} 0 Z" fill="${P.ivoryLight}"/>
  <path d="M${w * 0.08} ${h * 0.72} q${w * 0.2} ${-h * 0.12} ${w * 0.42} 0" stroke="${P.taupe}" stroke-width="2" fill="none"/>
  <ellipse cx="${w * 0.3}" cy="${h * 0.62}" rx="${w * 0.07}" ry="${h * 0.035}" fill="${P.taupe}"/>
  <ellipse cx="${w * 0.72}" cy="${h * 0.63}" rx="${w * 0.06}" ry="${h * 0.03}" fill="${P.taupeDeep}" opacity="0.7"/>
  <line x1="${w * 0.86}" y1="${h * 0.18}" x2="${w * 0.86}" y2="${h * 0.52}" stroke="${P.oakDeep}" stroke-width="3"/>
  <path d="M${w * 0.78} ${h * 0.18} q${w * 0.08} ${h * 0.12} 0 ${h * 0.24} q${-w * 0.08} ${-h * 0.12} 0 ${-h * 0.24} Z" fill="${P.sand}"/>
  <rect width="${w}" height="${h}" fill="url(#warm)"/>`;
  return wrap(w, h, s, `wellness-${seed}`);
}

/* ---------------------------------------------------------------- detail */
function detail(w, h, seed, kind = 'plaster') {
  let s = '';
  if (kind === 'plaster') {
    s = `<rect width="${w}" height="${h}" fill="${P.ivory}"/>
    <rect width="${w}" height="${h}" fill="url(#wall)"/>
    <path d="M${w * 0.2} ${h} L${w * 0.34} 0 L${w * 0.46} 0 L${w * 0.32} ${h} Z" fill="${P.ivoryLight}" opacity="0.9"/>
    <path d="M${w * 0.58} ${h} L${w * 0.72} 0 L${w * 0.8} 0 L${w * 0.66} ${h} Z" fill="${P.sand}" opacity="0.35"/>
    <circle cx="${w * 0.5}" cy="${h * 0.42}" r="${w * 0.3}" fill="${P.ivoryLight}" opacity="0.35"/>`;
  } else if (kind === 'oak') {
    s = `<rect width="${w}" height="${h}" fill="${P.oak}"/>
    ${Array.from({ length: 16 }, (_, i) => `<rect x="0" y="${(i * h) / 16}" width="${w}" height="${h / 32}" fill="${P.oakDeep}" opacity="0.28"/>`).join('')}
    <rect width="${w}" height="${h}" fill="url(#wall)" opacity="0.35"/>`;
  } else if (kind === 'linen') {
    s = `<rect width="${w}" height="${h}" fill="${P.linen}"/>
    ${Array.from({ length: 30 }, (_, i) => `<rect x="0" y="${(i * h) / 30}" width="${w}" height="${h / 60}" fill="${P.linenShade}" opacity="0.5"/>`).join('')}
    ${Array.from({ length: 30 }, (_, i) => `<rect x="${(i * w) / 30}" y="0" width="${w / 60}" height="${h}" fill="${P.linenShade}" opacity="0.3"/>`).join('')}
    <polygon points="0,${h} ${w * 0.5},${h * 0.3} ${w},${h}" fill="${P.ivoryLight}" opacity="0.45"/>`;
  } else {
    s = `<rect width="${w}" height="${h}" fill="${P.sand}"/>
    <rect width="${w}" height="${h}" fill="url(#wall)"/>
    <circle cx="${w * 0.5}" cy="${h * 0.5}" r="${Math.min(w, h) * 0.26}" fill="none" stroke="${P.sandDeep}" stroke-width="3"/>
    <circle cx="${w * 0.5}" cy="${h * 0.5}" r="${Math.min(w, h) * 0.1}" fill="${P.taupe}" opacity="0.6"/>`;
  }
  return wrap(w, h, s, `detail-${seed}`);
}

/* ---------------------------------------------------------------- wrapper */
function wrap(w, h, inner, key) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img">
  <defs>
    ${grain('grain-' + key)}
    <linearGradient id="wall" x1="0" y1="0" x2="0.6" y2="1">
      <stop offset="0" stop-color="${P.ivoryLight}"/><stop offset="0.55" stop-color="${P.ivory}"/><stop offset="1" stop-color="${P.sand}"/>
    </linearGradient>
    <linearGradient id="floor" x1="0" y1="0" x2="0.2" y2="1">
      <stop offset="0" stop-color="${P.oakDeep}" stop-opacity="0.55"/><stop offset="0.3" stop-color="${P.oak}" stop-opacity="0.1"/><stop offset="1" stop-color="${P.oak}" stop-opacity="0"/>
    </linearGradient>
    <radialGradient id="warm" cx="0.28" cy="0.18" r="0.95">
      <stop offset="0" stop-color="#FFF6E4" stop-opacity="0.55"/><stop offset="0.55" stop-color="#FFF6E4" stop-opacity="0.12"/><stop offset="1" stop-color="#3A3A32" stop-opacity="0.22"/>
    </radialGradient>
    <radialGradient id="glow" cx="0.5" cy="0.8" r="0.7">
      <stop offset="0" stop-color="${P.ivoryLight}" stop-opacity="0.95"/><stop offset="1" stop-color="${P.ivoryLight}" stop-opacity="0.35"/>
    </radialGradient>
    <filter id="g${key}"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" result="n"/><feColorMatrix in="n" type="saturate" values="0" result="d"/><feComponentTransfer in="d" result="t"><feFuncA type="linear" slope="0.14" intercept="0"/></feComponentTransfer><feBlend in="SourceGraphic" in2="t" mode="multiply"/></filter>
  </defs>
  <g filter="url(#g${key})">
  ${inner}
  </g>
</svg>`;
}

const write = (path, body) => {
  writeFileSync(join(root, 'assets', path), body, 'utf8');
  console.log('asset:', path);
};

/* ---------------------------------------------------------------- manifest */
write('architecture/hero-exterior.svg', exterior(1920, 1080, 11, { archCount: 6 }));
write('architecture/arrival.svg', exterior(1600, 1200, 23, { archCount: 4, close: true }));
write('architecture/exterior-detail.svg', exterior(1200, 1500, 37, { archCount: 2, close: true }));
write('architecture/landscape-wide.svg', exterior(1920, 900, 41, { building: false }));
write('architecture/landscape-coast.svg', coast(1600, 1000, 53, 'dune'));

write('rooms/dune-room-main.svg', interior(1400, 1750, 61, 'arch'));
write('rooms/dune-room-02.svg', interior(1400, 1050, 67, 'rect'));
write('rooms/dune-room-03.svg', detail(1400, 1050, 71, 'linen'));
write('rooms/courtyard-room-main.svg', interior(1400, 1750, 73, 'arch'));
write('rooms/courtyard-room-02.svg', interior(1400, 1050, 79, 'rect'));
write('rooms/courtyard-room-03.svg', detail(1400, 1050, 83, 'plaster'));
write('rooms/atlantic-room-main.svg', interior(1400, 1750, 89, 'rect'));
write('rooms/atlantic-room-02.svg', interior(1400, 1050, 97, 'rect'));
write('rooms/atlantic-room-03.svg', coast(1400, 1050, 101, 'dune'));
write('rooms/sora-suite-main.svg', interior(1400, 1750, 103, 'arch'));
write('rooms/sora-suite-02.svg', interior(1400, 1050, 107, 'arch'));
write('rooms/sora-suite-03.svg', detail(1400, 1050, 109, 'oak'));

write('experiences/sora-table.svg', dining(1600, 1200, 113));
write('experiences/coastal-paths.svg', coast(1600, 1200, 127, 'path'));
write('experiences/slow-rituals.svg', wellness(1600, 1200, 131));
write('experiences/sora-table-detail.svg', detail(1400, 1050, 137, 'oak'));
write('experiences/coastal-detail.svg', coast(1400, 1050, 139, 'dune'));

write('story/architecture.svg', exterior(1400, 1750, 149, { archCount: 3, close: true }));
write('story/materials.svg', detail(1400, 1050, 151, 'plaster'));
write('story/lights.svg', detail(1400, 1050, 157, 'ring'));
write('story/morning.svg', interior(1400, 1050, 163, 'arch'));
write('story/oak-detail.svg', detail(1400, 1050, 167, 'oak'));

write('gallery/g01.svg', exterior(1200, 1500, 173, { archCount: 3 }));
write('gallery/g02.svg', detail(1400, 900, 179, 'plaster'));
write('gallery/g03.svg', coast(1400, 900, 181, 'path'));
write('gallery/g04.svg', interior(1400, 900, 191, 'rect'));
write('gallery/g05.svg', dining(1400, 900, 193));
write('gallery/g06.svg', wellness(1400, 900, 197));
write('gallery/g07.svg', exterior(1400, 900, 199, { building: false }));
write('gallery/g08.svg', detail(1400, 900, 211, 'linen'));
write('gallery/g09.svg', exterior(1200, 1500, 223, { archCount: 5, close: true }));
write('gallery/g10.svg', interior(1400, 900, 227, 'arch'));
write('gallery/g11.svg', coast(1400, 900, 229, 'dune'));
write('gallery/g12.svg', dining(1400, 900, 233));

write('booking/booking-visual.svg', exterior(1600, 1100, 239, { archCount: 4, close: true }));

console.log('done');
