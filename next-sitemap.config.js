/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://speeir.com',
  generateRobotsTxt: false,
  sitemapSize: 7000,
  changefreq: 'weekly',
  priority: 0.7,
  additionalPaths: async (config) => {
    const { services } = require('./src/data/services');
    return services.map((s) => ({ loc: `/services/${s.slug}`, changefreq: 'monthly', priority: 0.8 }));
  },
};
