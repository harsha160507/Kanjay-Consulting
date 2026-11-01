import { readFileSync, readdirSync, existsSync } from 'node:fs';
import assert from 'node:assert/strict';
const policySlugs = ['terms-of-use', 'privacy-policy', 'cookie-policy', 'disclaimer'];
const files = [];
function walk(path) { for (const entry of readdirSync(path, { withFileTypes: true })) { const file = `${path}/${entry.name}`; if (entry.isDirectory()) walk(file); else if (file.endsWith('.html')) files.push(file); } }
walk('dist');
assert.equal(files.length, 34);
for (const file of files) {
  const html = readFileSync(file, 'utf8'), footer = html.split('<footer')[1];
  const prefix = file.match(/dist(\/theme\/(?:light|dark))\//)?.[1] || '';
  for (const slug of policySlugs) assert.ok(footer.includes(`href="${prefix}/${slug}/"`), `${file}: footer ${slug}`);
}
for (const prefix of ['', '/theme/light', '/theme/dark']) for (const slug of policySlugs) {
  const html = readFileSync(`dist${prefix}/${slug}/index.html`, 'utf8');
  const main = html.split('<main')[1].split('</main>')[0];
  assert.match(main, /owner and legal review required/);
  assert.match(main, /Not yet effective or approved for publication/);
  assert.match(main, /datetime="2026-10-31"/);
  if(slug==='cookie-policy'){assert.doesNotMatch(main,/class="policy-review"/);assert.match(main,/Cookie &amp; Browser Storage Policy/);}
  else assert.match(main, /Owner \/ legal review/);
  assert.doesNotMatch(main, /<form\b|<iframe\b|<astro-island\b/i);
  const levels = [...main.matchAll(/<h([1-6])\b/g)].map(m => +m[1]);
  assert.equal(levels.filter(n => n === 1).length, 1);
  assert.ok(levels.every((n, i) => !i || n <= levels[i - 1] + 1));
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
  assert.equal(ids.length, new Set(ids).size);
  for (const [, href] of html.matchAll(/href="([/#][^"]*)"/g)) {
    const [path, hash] = href.split('#');
    const target = path ? `dist${path.endsWith('/') ? path + 'index.html' : path}` : `dist${prefix}/${slug}/index.html`;
    assert.ok(existsSync(target), href);
    if (hash) assert.ok(readFileSync(target, 'utf8').includes(`id="${hash}"`), href);
  }
}
const missing = readFileSync('dist/404.html', 'utf8');
assert.doesNotMatch(missing, /location\.replace/, '404 must not redirect missing URLs using saved theme');
for (const href of ['/', '/services/', '/contact/', 'tel:+918939715152', 'mailto:enquiry@kanjayconsulting.com']) assert.ok(missing.includes(`href="${href}"`));
assert.equal(existsSync('dist/_phase9-inspect.html'), false, 'temporary inspection harness must not ship');
console.log('PASS: 34 footers, 12 policy variants, draft/review status, headings/targets and 404 redirect regression guard.');
