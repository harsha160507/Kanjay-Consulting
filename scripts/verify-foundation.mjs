import { readFileSync, existsSync, readdirSync } from 'node:fs';
import assert from 'node:assert/strict';

const baseRoutes = ['index.html', '404.html', ...['about', 'services', 'clients', 'contact', 'terms-of-use', 'privacy-policy', 'cookie-policy', 'disclaimer'].map(p => `${p}/index.html`)];
const routes = [...baseRoutes, ...['light','dark'].flatMap(t => baseRoutes.filter(r => r !== '404.html').map(r => `theme/${t}/${r}`))];
for (const route of routes) {
  const html = readFileSync(`dist/${route}`, 'utf8');
  if (!route.endsWith('404.html')) { const expected = '/' + route.replace(/index\.html$/, ''); assert.ok(html.includes(`href="${expected}" aria-current="page"`), `${route}: matching footer link current`); }
  else assert.doesNotMatch(html, /aria-current="page"/, '404 must not mark Home current');
  const themeMatch = route.match(/^theme\/(light|dark)\//);
  if (themeMatch) {
    assert.ok(html.includes(`data-theme="${themeMatch[1]}"`), `${route}: static theme set before JS`);
    for (const [, href] of html.matchAll(/href="(\/[^"]*\/)"/g)) {
      assert.ok(href.startsWith(`/theme/${themeMatch[1]}/`) || href.startsWith('/theme/light/') || href.startsWith('/theme/dark/'), `${route}: theme-aware ${href}`);
    }
  }
  assert.match(html, /noindex, nofollow/, `${route}: indexing protection`);
  assert.match(html, /<h1[ >]/, `${route}: static readable heading`);
  assert.match(html, /href="#main"/, `${route}: skip link`);
  assert.doesNotMatch(html, /<form\b|<iframe\b|<astro-island\b/i, `${route}: no forms, embeds or hydrated islands`);
  assert.match(html, /href="tel:\+918939715152"/, `${route}: approved phone link`);
  assert.match(html, /href="mailto:info@kanjayconsulting.com"/, `${route}: approved business email`);
  assert.match(html, /href="mailto:hr@kanjayconsulting.com"/, `${route}: candidate email`);
  assert.match(html, /<details class="mobile-nav"/, `${route}: native no-JS navigation`);
  assert.match(html, /aria-label="Policy drafts"/, `${route}: policy draft labels`);
  for (const [, href] of html.matchAll(/href="(\/[^"]*)"/g)) {
    const target = href.split('#')[0];
    assert.ok(existsSync(`dist${target === '/' ? '/index.html' : target.endsWith('/') ? target + 'index.html' : target}`), `${route}: local link ${href} exists`);
  }
}
assert.equal(existsSync('dist/robots.txt'), true);
assert.equal(existsSync('dist/_headers'), true);
assert.equal(existsSync('next.config.js'), false);
assert.equal(readdirSync('public/images/clients').filter(p => p !== '.gitkeep').length, 0);
console.log(`Layout verified: ${routes.length} static routes, real navigation/contact links, native mobile disclosure, indexing controls and no forms/embeds/unapproved client assets.`);
