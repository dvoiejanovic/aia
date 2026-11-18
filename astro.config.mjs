import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Served from https://dvoiejanovic.github.io/aia/ for now.
// With a custom domain: set `site` to it, delete `base`, and add public/CNAME.
export default defineConfig({
  site: 'https://dvoiejanovic.github.io',
  base: '/aia',
  integrations: [sitemap({ filter: (page) => !/\/aia\/$/.test(new URL(page).pathname) })],
  trailingSlash: 'always',
  devToolbar: { enabled: false },
});
