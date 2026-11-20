import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://ashcreativestudio.com',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/admin/'),
      serialize(item) {
        const url = item.url;
        if (url === 'https://ashcreativestudio.com/') {
          item.changefreq = 'weekly';
          item.priority = 1.0;
        } else if (
          url.endsWith('/services/') ||
          url.endsWith('/portfolio/') ||
          url.endsWith('/contact/')
        ) {
          item.changefreq = 'weekly';
          item.priority = 0.9;
        } else if (
          url.includes('/performance-marketing/') ||
          url.includes('/google-ads/') ||
          url.includes('/meta-ads/') ||
          url.includes('/social-media-marketing/') ||
          url.includes('/seo-services/') ||
          url.includes('/creative-design/') ||
          url.includes('/3d-animation/')
        ) {
          item.changefreq = 'monthly';
          item.priority = 0.85;
        } else if (url.includes('/portfolio/')) {
          item.changefreq = 'monthly';
          item.priority = 0.8;
        } else if (url.includes('/blog/')) {
          item.changefreq = 'weekly';
          item.priority = 0.8;
        } else if (url.includes('/about/')) {
          item.changefreq = 'monthly';
          item.priority = 0.75;
        } else if (url.includes('/privacy-policy/')) {
          item.changefreq = 'yearly';
          item.priority = 0.3;
        } else {
          item.changefreq = 'monthly';
          item.priority = 0.7;
        }
        item.lastmod = new Date();
        return item;
      },
    }),
  ],
});
