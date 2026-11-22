# The Fish Tank Recordings: website

Built with Astro (fast static pages that Google can read easily) and Vue (the interactive parts: track player and inquiry form).

## Run it on your computer
1. Install Node.js 20 or newer from https://nodejs.org (use the LTS button).
2. Unzip this folder, open Terminal in it, and run:
   ```
   npm install
   npm run dev
   ```
3. Open http://localhost:4321 in your browser. Edits show up live.

## Where to edit things
- **All text facts** (credits, testimonials, gear, tracks, contact info, social links): `src/data/site.ts`
- **Pages**: `src/pages/` (one file per page)
- **Colors and fonts**: top of `src/styles/global.css`

## Before launch: to-do
- [ ] Replace testimonials marked `paraphrased: true` with the exact wording from the old site
- [ ] Confirm the items in `pendingCredits` with Lu (they are NOT shown on the site until moved into `credits`)
- [ ] Shoot photos and replace the "(to shoot)" placeholder boxes
- [ ] Send YouTube links for the scoring and commercial reels

## Going live (Netlify, free)
1. Create a free account at netlify.com, then choose "Add new site → Deploy manually".
2. Run `npm run build` and drag the `dist` folder onto the page.
3. **Form emails:** Netlify → Site → Forms → `project-inquiry` → Notifications → add email `lrubino@me.com`.
4. **Domain:** Netlify → Domain settings → add `thefishtankrecordings.com`, then update DNS where the domain is registered (currently Squarespace).
5. Old Squarespace links (e.g. /luciorubino) automatically 301-redirect to the new pages via `public/_redirects`.
6. Submit `https://thefishtankrecordings.com/sitemap-index.xml` in Google Search Console.

## Dev site on Sevalla (static site)
- Build command: `npm run build`
- Publish directory: `dist`
- Node version: 22
- Environment variable: `PUBLIC_NOINDEX=true` (hides the dev site from Google; remove it for the production site)
