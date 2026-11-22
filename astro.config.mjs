import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import sitemap from '@astrojs/sitemap';

// DEPLOY_TARGET=gh-pages builds the shareable dev site on GitHub Pages
// (served from /fishtank-recordings-site/ and hidden from Google).
const isDev = process.env.DEPLOY_TARGET === 'gh-pages';

// Old Squarespace URLs -> new URLs. Keeps existing Google rankings and backlinks.
// (Also mirrored in public/_redirects as true 301s for Netlify.)
const redirects = {
  '/thestudio': '/studio/',
  '/luciorubino': '/lucio-rubino/',
  '/songproduction': '/song-production/',
  '/scoring': '/film-tv-scoring/',
  '/advertising': '/commercial-music/',
  '/ourservices': '/services/',
  '/gearlist': '/gear/',
};

export default defineConfig({
  site: 'https://thefishtankrecordings.com',
  base: isDev ? '/fishtank-recordings-site' : undefined,
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [vue(), ...(isDev ? [] : [sitemap()])],
  redirects: isDev ? {} : redirects,
});
