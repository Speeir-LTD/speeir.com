import { services } from '@/data/services';

const SITE_URL = 'https://speeir.com';

function buildUrl(loc: string, lastmod?: string) {
  return `  <url>\n    <loc>${SITE_URL}${loc}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}\n  </url>`;
}

function generateSiteMapXml() {
  const pages = ['/', '/about', '/services', '/work', '/contact'];
  const lastmod = new Date().toISOString();

  const serviceUrls = services.map((s) => `/services/${s.slug}`);
  const urls = [...pages, ...serviceUrls];

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((u) => buildUrl(u, lastmod))
    .join('\n')}\n</urlset>`;
}

export async function GET() {
  const xml = generateSiteMapXml();
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
