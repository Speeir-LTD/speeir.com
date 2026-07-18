// app/robots.ts
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin', '/api'],
      },
      {
        userAgent: '*',
        allow: '/',
        // Note: blog posts are served at /blog-details?id=... — a blanket
        // '/*?*' disallow here would block every non-Google crawler
        // (including social link-preview bots) from ever seeing them,
        // while sitemap.ts submits those exact URLs for indexing.
        disallow: ['/admin', '/api'],
        crawlDelay: 10,
      },
    ],
    sitemap: 'https://speeir.com/sitemap.xml',
    host: 'https://speeir.com',
  };
}
