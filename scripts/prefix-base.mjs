// After a dev (GitHub Pages) build, prefix site-relative links with the
// repo path so /credits becomes /fishtank-recordings-site/credits, and
// hide every page from search engines.
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const BASE = '/fishtank-recordings-site';
const dir = process.argv[2] || 'dist';

function walk(d) {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (p.endsWith('.html')) fix(p);
  }
}
function fix(p) {
  let t = readFileSync(p, 'utf8');
  t = t.replace(/(href|src)="\/(?!\/)([^"]*)"/g, (m, attr, rest) =>
    rest.startsWith(BASE.slice(1)) ? m : `${attr}="${BASE}/${rest}"`.replace(/\/"$/, '/"'));
  if (!t.includes('name="robots"')) t = t.replace('<head>', '<head><meta name="robots" content="noindex, nofollow">');
  writeFileSync(p, t);
}
walk(dir);
writeFileSync(join(dir, 'robots.txt'), 'User-agent: *\nDisallow: /\n');
console.log('prefixed links with', BASE);
