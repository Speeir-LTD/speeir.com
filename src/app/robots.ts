// app/robots.ts
export default function robots() {
    return {
      rules: [
        {
          userAgent: '*',
          allow: '/',
          disallow: ['/admin', '/api'],
        }
      ],
      sitemap: 'https://www.speeir.com/sitemap.xml',
    };
  }