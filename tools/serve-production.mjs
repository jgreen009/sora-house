import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { resolve, dirname, join, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = join(root, 'dist');
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.woff2': 'font/woff2', '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml; charset=utf-8' };

export function createProductionServer() {
  if (!existsSync(join(output, 'index.html'))) throw new Error('Run npm run build before previewing production');
  const config = JSON.parse(readFileSync(join(root, 'vercel.json'), 'utf8'));
  return createServer((request, response) => {
    if (!['GET', 'HEAD'].includes(request.method)) {
      response.writeHead(405, { Allow: 'GET, HEAD' });
      response.end();
      return;
    }
    try {
      const url = new URL(request.url, 'http://localhost');
      const path = decodeURIComponent(url.pathname);
      let redirect = null;
      if (['/index', '/index.html', '/design/prototypes/index.html'].includes(path)) redirect = '/';
      else if (/^\/design\/prototypes\/[^/]+\.html$/.test(path)) redirect = '/' + path.split('/').at(-1).slice(0, -5);
      else if (path !== '/' && path.endsWith('/')) redirect = path.slice(0, -1);
      else if (path.endsWith('.html')) redirect = path.slice(0, -5);
      if (redirect !== null) {
        response.writeHead(308, { Location: redirect + url.search });
        response.end();
        return;
      }
      const candidate = resolve(output, '.' + (path === '/' ? '/index.html' : path + (extname(path) ? '' : '.html')));
      const valid = candidate.startsWith(output + sep) && existsSync(candidate) && statSync(candidate).isFile();
      const file = valid ? candidate : join(output, '404.html');
      const headers = { 'Content-Type': types[extname(file)] || 'application/octet-stream', 'Cache-Control': 'public, max-age=0, must-revalidate' };
      for (const rule of config.headers) {
        if (rule.source === '/(.*)' || rule.source === path || (rule.source === '/assets/(.*)' && path.startsWith('/assets/'))) for (const header of rule.headers) headers[header.key] = header.value;
      }
      const body = readFileSync(file);
      headers['Content-Length'] = body.length;
      response.writeHead(valid ? 200 : 404, headers);
      response.end(request.method === 'HEAD' ? undefined : body);
    } catch {
      response.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
      response.end('Bad request');
    }
  });
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT || 4174);
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('PORT must be a valid TCP port');
  createProductionServer().listen(port, '127.0.0.1', () => console.log(`Sora House production preview: http://127.0.0.1:${port}`));
}
