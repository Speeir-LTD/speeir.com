import fs from 'fs/promises';
import path from 'path';

const SRC = path.resolve(process.cwd(), 'src/data/services.ts');
const OUT = path.resolve(process.cwd(), 'public/sitemap.xml');
const SITE_URL = 'https://speeir.com';

async function readSlugs() {
  const txt = await fs.readFile(SRC, 'utf8');
  const regex = /slug:\s*"([^"]+)"/g;
  const slugs = new Set();
  let m;
  while ((m = regex.exec(txt))) {
    slugs.add(m[1]);
  }
  return Array.from(slugs);
}

function buildUrl(loc, lastmod) {
  return `  <url>\n    <loc>${SITE_URL}${loc}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}\n  </url>`;
}

async function generate() {
  const pages = ['/', '/about', '/services', '/work', '/contact'];
  const slugs = await readSlugs();
  const lastmod = new Date().toISOString();
  const urls = [...pages, ...slugs.map((s) => `/services/${s}`)];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => buildUrl(u, lastmod)).join('\n')}\n</urlset>`;

  await fs.mkdir(path.dirname(OUT), { recursive: true });
  await fs.writeFile(OUT, xml, 'utf8');
  console.log('Wrote', OUT);
}

generate().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
