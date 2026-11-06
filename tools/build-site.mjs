import './build-prototype.mjs';
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync, lstatSync, rmSync } from 'node:fs';
import { resolve, dirname, basename, extname, relative, sep, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { verifyBuild } from './verify-build.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const proto = join(root, 'design/prototypes');
const output = resolve(root, 'dist');
if (dirname(output) !== root || basename(output) !== 'dist' || (existsSync(output) && lstatSync(output).isSymbolicLink())) throw new Error('Unsafe output directory');
rmSync(output, { recursive: true, force: true });
mkdirSync(output, { recursive: true });
const records = new Map();
const allowed = ['design/prototypes/css', 'design/prototypes/js', 'assets/branding', 'assets/fonts', 'assets/photography/web'].map(path => resolve(root, path) + sep);
const catalogue = JSON.parse(readFileSync(join(root, 'content/room-data/rooms.json'), 'utf8'));
const escapeAttribute = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
const rawOrigin = process.env.SITE_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
let origin = null;
if (rawOrigin) {
  const url = new URL(rawOrigin.includes('://') ? rawOrigin : 'https://' + rawOrigin);
  if (url.protocol !== 'https:' || url.username || url.password || url.pathname !== '/' || url.search || url.hash) throw new Error('SITE_URL must be an HTTPS origin without a path, query, credentials or fragment');
  origin = url.origin;
}
const preview = Boolean(process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production');
const pageFiles = readdirSync(proto).filter(file => file.endsWith('.html') && file !== 'components.html').sort();
const routeFor = file => file === 'index.html' ? '/' : '/' + file.slice(0, -5);
const publicRoutes = new Set(pageFiles.map(routeFor));

function bundleAsset(input) {
  const source = resolve(input);
  if (records.has(source)) return records.get(source).url;
  if (!allowed.some(prefix => source.startsWith(prefix)) || !existsSync(source) || lstatSync(source).isSymbolicLink()) throw new Error('Invalid runtime asset: ' + relative(root, source));
  let bytes = readFileSync(source);
  const extension = extname(source);
  if (extension === '.css') {
    const css = bytes.toString('utf8').replace(/url\(\s*(['"]?)(.*?)\1\s*\)/g, (match, quote, reference) => {
      if (/^(data:|https?:|#)/.test(reference)) return match;
      return `url("${bundleAsset(resolve(dirname(source), reference))}")`;
    });
    bytes = Buffer.from(css);
  }
  if (source === join(proto, 'js/room-data.js')) {
    const { currency, timezone, minStayNights, maxStayNights } = catalogue.property;
    const data = { property: { currency, timezone, minStayNights, maxStayNights }, rooms: catalogue.rooms.map(({ slug, name, rate, maxGuests }) => ({ slug, name, rate, maxGuests })) };
    bytes = Buffer.from('window.soraCatalogue = ' + JSON.stringify(data).replaceAll('<', '\\u003c') + ';\n');
  }
  const hash = createHash('sha256').update(bytes).digest('hex').slice(0, 12);
  const folder = source.startsWith(proto + sep) ? relative(proto, dirname(source)) : relative(join(root, 'assets'), dirname(source));
  const publicPath = ['assets', ...folder.split(sep), basename(source, extension) + '.' + hash + extension].join('/');
  const target = join(output, publicPath);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, bytes);
  const record = { url: '/' + publicPath, source: relative(root, source).split(sep).join('/'), bytes: bytes.length };
  records.set(source, record);
  return record.url;
}

const socialImage = bundleAsset(join(root, 'assets/branding/social-preview.png'));
for (const file of pageFiles) {
  const route = routeFor(file);
  const noIndex = preview || ['404.html', 'confirmation.html', 'book.html'].includes(file);
  let html = readFileSync(join(proto, file), 'utf8');
  html = html.replace('<body ', '<body data-url-mode="clean" ');
  html = html.replace(/\b(href|src|action|data-full)="([^"]+)"/g, (match, attribute, value) => {
    if (/^(#|https?:|mailto:|tel:|data:)/.test(value)) return match;
    const [path] = value.split(/[?#]/);
    const suffix = value.slice(path.length);
    if (path.endsWith('.html')) {
      const destination = routeFor(basename(path));
      if (!publicRoutes.has(destination)) throw new Error('Unpublished route in ' + file + ': ' + value);
      return `${attribute}="${destination}${suffix}"`;
    }
    return `${attribute}="${bundleAsset(resolve(proto, path))}${suffix}"`;
  });
  html = html.replace(/srcset="([^"]+)"/g, (match, value) => 'srcset="' + value.split(',').map(candidate => {
    const [path, size] = candidate.trim().split(/\s+/);
    return bundleAsset(resolve(proto, path)) + (size ? ' ' + size : '');
  }).join(', ') + '"');
  const imageUrl = origin ? origin + socialImage : socialImage;
  html = html.replace(/<meta property="og:image"[^>]*>/, `<meta property="og:image" content="${escapeAttribute(imageUrl)}">`);
  const metadata = [
    '<meta property="og:type" content="website">',
    '<meta property="og:site_name" content="Sora House">',
    '<meta property="og:locale" content="en_GB">',
    '<meta property="og:image:width" content="1200">',
    '<meta property="og:image:height" content="630">',
    '<meta name="twitter:card" content="summary_large_image">',
    `<meta name="twitter:image" content="${escapeAttribute(imageUrl)}">`,
    ...(noIndex ? ['<meta name="robots" content="noindex, follow">'] : []),
    ...(origin && file !== '404.html' ? [`<link rel="canonical" href="${escapeAttribute(origin + route)}">`, `<meta property="og:url" content="${escapeAttribute(origin + route)}">`] : [])
  ].join('\n');
  html = html.replace('</head>', metadata + '\n</head>');
  writeFileSync(join(output, file), html);
}

const indexable = pageFiles.filter(file => !['404.html', 'confirmation.html', 'book.html'].includes(file));
const robots = preview ? 'User-agent: *\nDisallow: /\n' : 'User-agent: *\nAllow: /\n' + (origin ? `Sitemap: ${origin}/sitemap.xml\n` : '');
writeFileSync(join(output, 'robots.txt'), robots);
if (origin && !preview) {
  const escapeXml = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;');
  writeFileSync(join(output, 'sitemap.xml'), '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + indexable.map(file => `<url><loc>${escapeXml(origin + routeFor(file))}</loc></url>`).join('\n') + '\n</urlset>\n');
}
mkdirSync(join(root, 'tools/.build'), { recursive: true });
const manifest = { origin, preview, pages: pageFiles.map(file => ({ file, route: routeFor(file) })), assets: [...records.values()].sort((a, b) => a.url.localeCompare(b.url)) };
writeFileSync(join(root, 'tools/.build/manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
verifyBuild();
console.log(`Production build: ${pageFiles.length} pages, ${records.size} fingerprinted assets.`);
console.log(origin ? `Site origin: ${origin}` : 'Vercel will supply the site origin during deployment. Set SITE_URL to override it.');
