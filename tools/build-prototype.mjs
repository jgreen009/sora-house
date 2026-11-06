import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const protoDir = join(root, 'design', 'prototypes');
const pagesDir = join(protoDir, 'pages');
const lightboxMarkup = readFileSync(join(pagesDir, 'lightbox.fragment.html'), 'utf8');
const imageMap = JSON.parse(readFileSync(join(root, 'assets/photography/image-map.json'), 'utf8'));
const imageVariants = JSON.parse(readFileSync(join(root, 'assets/photography/image-variants.json'), 'utf8'));
const photoAssets = html => {
  const images = html.replace(/<img\b[^>]*src="([^"]+)"[^>]*>/g, (tag, source) => {
    const key = imageMap[source];
    if (!key) return tag;
    const asset = imageVariants.find(item => item.key === key);
    if (!asset) throw new Error('Missing photographic asset: ' + key);
    const largest = asset.variants.at(-1);
    const prefix = '../../assets/photography/web/';
    const srcset = asset.variants.map(variant => `${prefix}${variant.file} ${variant.width}w`).join(', ');
    const sizes = tag.includes('data-image-size="thumbnail"') ? '(max-width: 600px) 80px, 120px' : key === 'house-exterior' ? '(max-aspect-ratio: 16/9) 178vh, 100vw' : tag.includes('landscape-wide') ? '100vw' : '(max-width: 900px) calc(100vw - 40px), (max-width: 1440px) 60vw, 820px';
    return tag.replace(' data-image-size="thumbnail"', '').replace(`src="${source}"`, `src="${prefix}${largest.file}" srcset="${srcset}" sizes="${sizes}" decoding="async"`).replace(/width="\d+"/, `width="${largest.width}"`).replace(/height="\d+"/, `height="${largest.height}"`);
  });
  return images.replace(/data-full="([^"]+)"/g, (attribute, source) => {
    const key = imageMap[source];
    if (!key) return attribute;
    return `data-full="../../assets/photography/web/${imageVariants.find(item => item.key === key).variants.at(-1).file}"`;
  });
};

const nav = [
  { label: 'Stay', href: 'rooms.html', key: 'rooms' },
  { label: 'Experiences', href: 'experiences.html', key: 'experiences' },
  { label: 'Our Story', href: 'about.html', key: 'about' },
  { label: 'Gallery', href: 'gallery.html', key: 'gallery' },
];

const layout = ({ title, description, body, current = '', page = '', header = 'solid' }) => `<!DOCTYPE html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<script>document.documentElement.classList.add('has-js')</script>
<title>${title}</title>
<meta name="description" content="${description}">
<meta name="theme-color" content="#304444">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:image" content="../../assets/branding/social-preview.svg">
<link rel="icon" href="../../assets/branding/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="../../assets/fonts/fonts.css">
<link rel="stylesheet" href="css/tokens.css">
<link rel="stylesheet" href="css/sora.css">
<link rel="stylesheet" href="css/components.css">
</head>
<body class="${page} ${header === 'transparent' ? 'header-transparent' : 'header-solid'}">
<a class="skip-link" href="#main">Skip to content</a>

<header class="site-header">
  <div class="site-header__inner container">
    <a class="site-header__brand" href="index.html" aria-label="Sora House — home">
      <img class="brand brand--light" src="../../assets/branding/wordmark-horizontal-ivory.svg" alt="Sora House" width="190" height="33">
      <img class="brand brand--dark" src="../../assets/branding/wordmark-horizontal-ink.svg" alt="" width="190" height="33">
      <span>Atlantic coast, Portugal</span>
    </a>
    <nav class="nav" aria-label="Primary">
      ${nav.map((n) => `<a href="${n.href}"${current === n.key ? ' aria-current="page"' : ''}>${n.label}</a>`).join('\n      ')}
    </nav>
    <a class="header-cta" href="book.html">Book your stay</a>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" aria-label="Open menu">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>

<div class="mobile-menu" id="mobile-menu" inert>
  <nav aria-label="Mobile">
    ${nav.map((n) => `<a href="${n.href}"${current === n.key ? ' aria-current="page"' : ''}>${n.label}</a>`).join('\n    ')}
    <a href="contact.html">Contact</a>
  </nav>
  <div class="mobile-menu__foot">
    <span>Twelve rooms · Atlantic coast, Portugal</span>
    <span>Atlantic coast, Portugal</span>
  </div>
  <a class="btn btn--block" href="book.html">Book your stay</a>
</div>

<main id="main" tabindex="-1">
<noscript><div class="container"><p class="notice no-script-notice">Enable JavaScript to use room planning and image controls. You can still browse the house and rooms.</p></div></noscript>
${photoAssets(body.replaceAll('{{LIGHTBOX}}', lightboxMarkup))}
</main>

<footer class="site-footer">
  <div class="container">
    <div class="site-footer__top">
      <div class="site-footer__brand">
        <img src="../../assets/branding/wordmark-horizontal-ivory.svg" alt="Sora House" width="200" height="35">
        <p>Twelve rooms on the Atlantic coast of Portugal, made for people who would rather take their time.</p>
        <div class="site-footer__mark">
          <svg viewBox="0 0 64 64" width="64" height="64" aria-hidden="true">
            <g fill="none" stroke="#F5F1E9" stroke-width="2.6" stroke-linecap="round">
              <circle cx="32" cy="32" r="19.5"/><path d="M0 38.5 H11.5"/><path d="M52.5 38.5 H64"/>
            </g>
          </svg>
        </div>
      </div>
      <div class="site-footer__cols">
        <div>
          <h3>Explore</h3>
          <ul>
            <li><a href="rooms.html">Rooms & suites</a></li>
            <li><a href="experiences.html">Experiences</a></li>
            <li><a href="gallery.html">Gallery</a></li>
            <li><a href="about.html">Our story</a></li>
          </ul>
        </div>
        <div>
          <h3>Plan</h3>
          <ul>
            <li><a href="book.html">Book your stay</a></li>
            <li><a href="contact.html">Contact</a></li>
            <li><a href="contact.html#faq">Questions</a></li>
          </ul>
        </div>
        <div>
          <h3>Legal</h3>
          <ul>
            <li><a href="privacy.html">Privacy</a></li>
            <li><a href="terms.html">Terms</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="site-footer__bottom">
      <span>© ${new Date().getFullYear()} Sora House. All rights reserved.</span>
      <span>Twelve rooms · Atlantic coast, Portugal</span>
    </div>
  </div>
</footer>

<script src="js/room-data.js"></script>
<script src="js/sora.js"></script>
</body>
</html>
`;

/* ------------------------------------------------- room page templating */
const rooms = JSON.parse(readFileSync(join(root, 'content', 'room-data', 'rooms.json'), 'utf8')).rooms;
const catalogue = JSON.parse(readFileSync(join(root, 'content', 'room-data', 'rooms.json'), 'utf8'));
writeFileSync(join(protoDir, 'js', 'room-data.js'), 'window.soraCatalogue = ' + JSON.stringify(catalogue).replaceAll('<', '\\u003c') + ';\n');
const roomOptions = rooms.map(room => `<button class="room-option" type="button" data-room="${room.slug}" aria-pressed="false" aria-describedby="room-choice-error">
  <span class="figure figure--4x3"><img data-image-size="thumbnail" src="${room.gallery[1].file}" alt="${room.name}" width="1400" height="1050" loading="lazy"></span>
  <span><span class="room-option__title">${room.name}</span><span class="room-option__meta">${room.areaSqm} m² · sleeps ${room.maxGuests} · ${room.view.toLowerCase()} view</span><span class="room-option__status" data-room-status>View room</span></span>
  <span class="room-option__price"><b>€${room.rate}</b><span>per night</span></span>
</button>`).join('\n');
const roomSpreads = ['atlantic', 'dune', 'courtyard', 'suite'].map((slug, index) => {
  const room = rooms.find(item => item.slug === slug);
  return `<article class="room-spread reveal"><a class="room-spread__image" href="room-${slug}.html"><span class="figure figure--4x3"><img src="${room.gallery[0].file}" alt="${room.gallery[0].alt}" width="1400" height="1750" loading="lazy"></span><span class="caption"><span>${room.view} outlook</span><span>0${index + 1} / 04</span></span></a><div class="room-spread__body"><span class="eyebrow">0${index + 1} · ${room.category}</span><h3 class="display-m">${room.name}</h3><p>${room.short}</p><div class="room-card__spec"><span>${room.areaSqm} m²</span><span>${room.maxGuests} guests</span><span class="room-card__rate"><b>€${room.rate}</b> / night</span></div><a class="link" href="room-${slug}.html">Explore the ${room.category.toLowerCase()} <span class="arrow">↗</span></a></div></article>`;
}).join('\n');
const roomTemplate = readFileSync(join(pagesDir, 'room.body.html'), 'utf8');

const featureList = (items, compact) =>
  items.map((i) => `<li>${i}</li>`).join('\n            ');

const relatedCard = (room) => `
      <article class="room-card room-card--half">
        <a href="room-${room.slug}.html">
          <span class="room-card__index">${room.category}</span>
          <div class="figure figure--3x2">
            <img src="${room.gallery[0].file}" alt="${room.gallery[0].alt}" width="1400" height="1050" loading="lazy">
          </div>
          <h3 class="display-s room-card__title" style="margin-top:22px">${room.name}</h3>
          <p class="room-card__desc">${room.short}</p>
          <div class="room-card__spec">
            <span><b>${room.areaSqm} m²</b></span><span><b>${room.maxGuests}</b> guests</span><span class="room-card__rate"><b>€${room.rate}</b> per night</span>
          </div>
          <span class="link room-card__action">View room <span class="arrow">→</span></span>
        </a>
      </article>`;

rooms.forEach((room) => {
  const main = room.gallery[0];
  const secondary = room.gallery.slice(1).map((g, i) => `
          <button type="button" aria-label="View ${room.name} photo ${i + 2}" class="room-gallery__item" data-lightbox="room" data-full="${g.file}" data-alt="${g.alt}" data-caption="${room.name} — view ${i + 2}" data-meta="${room.areaSqm} m² · sleeps ${room.maxGuests}">
            <span class="figure figure--4x3"><img src="${g.file}" alt="${g.alt}" width="1400" height="1050" loading="lazy"></span>
          </button>`).join('\n');

  const related = room.related.map((slug) => {
    const r = rooms.find((x) => x.slug === slug);
    return r ? relatedCard(r) : '';
  }).join('');

  const html = roomTemplate
    .replaceAll('{{NAME}}', room.name)
    .replaceAll('{{SLUG}}', room.slug)
    .replaceAll('{{CATEGORY}}', room.category)
    .replaceAll('{{VIEW}}', room.view)
    .replaceAll('{{SHORT}}', room.short)
    .replaceAll('{{DESCRIPTION}}', room.description)
    .replaceAll('{{STORY}}', room.story)
    .replaceAll('{{AREA}}', String(room.areaSqm))
    .replaceAll('{{GUESTS}}', String(room.maxGuests))
    .replaceAll('{{UNITS}}', String(room.units))
    .replaceAll('{{ROOMS_LABEL}}', room.units === 1 ? 'Room in house' : 'Rooms in house')
    .replaceAll('{{RATE}}', String(room.rate))
    .replaceAll('{{MAIN}}', main.file)
    .replaceAll('{{MAIN_FULL}}', main.file)
    .replaceAll('{{MAIN_ALT}}', main.alt)
    .replaceAll('{{SECONDARY}}', secondary)
    .replaceAll('{{FEATURES}}', featureList(room.features))
    .replaceAll('{{AMENITIES}}', featureList(room.amenities))
    .replaceAll('{{EXTRA_GUESTS}}', room.maxGuests > 2 ? '<option>3</option>' : '')
    .replaceAll('{{RELATED}}', related);

  writeFileSync(join(protoDir, 'room-' + room.slug + '.html'), layout({
    title: `${room.name} — Sora House`,
    description: `${room.short} ${room.areaSqm} m², sleeps ${room.maxGuests}, €${room.rate} per night.`,
    body: html,
    current: 'rooms',
    page: 'page-room',
    header: 'solid',
  }), 'utf8');
  console.log('built room-' + room.slug + '.html');
});

/* -------------------------------------------------------- static pages */
const pages = readdirSync(pagesDir).filter((f) => f.endsWith('.body.html') && f !== 'room.body.html');
const meta = JSON.parse(readFileSync(join(pagesDir, 'meta.json'), 'utf8'));
const overviewCards = ['atlantic', 'dune', 'courtyard', 'suite'].map((slug, index) => {
  const room = rooms.find(item => item.slug === slug);
  return relatedCard(room).replaceAll('<h3', '<h2').replaceAll('</h3>', '</h2>').replace('room-card--half', index === 0 ? 'room-card--feature' : index === 1 ? 'room-card--side' : 'room-card--half');
}).join('\n');
const compareRows = rooms.map(room => `<tr data-compare-room="${room.slug}"><th scope="row">${room.name}</th><td>${room.areaSqm} m²</td><td>${room.maxGuests}</td><td>${room.view}</td><td>${room.units}</td><td>€${room.rate}</td><td><a class="link" href="room-${room.slug}.html">View <span class="arrow">↗</span></a></td></tr>`).join('\n');
const compareCards = rooms.map(room => `<article class="compare-card" data-compare-room="${room.slug}"><div class="compare-card__heading"><h3>${room.name}</h3><p><b>€${room.rate}</b> / night</p></div><dl><div><dt>Floor area</dt><dd>${room.areaSqm} m²</dd></div><div><dt>Guests</dt><dd>${room.maxGuests}</dd></div><div><dt>Outlook</dt><dd>${room.view}</dd></div><div><dt>In the house</dt><dd>${room.units} ${room.units === 1 ? 'room' : 'rooms'}</dd></div></dl><a class="link" href="room-${room.slug}.html">Explore the ${room.category.toLowerCase()} <span class="arrow">↗</span></a></article>`).join('\n');

pages.forEach((file) => {
  const key = file.replace('.body.html', '');
  const body = readFileSync(join(pagesDir, file), 'utf8').replaceAll('{{ROOM_OPTIONS}}', roomOptions).replaceAll('{{ROOM_SPREADS}}', roomSpreads).replaceAll('{{ROOM_CARDS}}', overviewCards).replaceAll('{{COMPARE_ROWS}}', compareRows).replaceAll('{{COMPARE_CARDS}}', compareCards);
  const m = meta[key];
  if (!m) throw new Error('Missing meta for ' + key);
  writeFileSync(join(protoDir, key + '.html'), layout({ ...m, body }), 'utf8');
  console.log('built', key + '.html');
});
