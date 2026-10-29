import { readFileSync, existsSync, readdirSync } from 'node:fs';
import assert from 'node:assert/strict';

const routes = ['index.html', '404.html', ...['about', 'services', 'clients', 'contact', 'terms-of-use', 'privacy-policy', 'cookie-policy', 'disclaimer'].map(p => `${p}/index.html`)];
for (const route of routes) {
  const html = readFileSync(`dist/${route}`, 'utf8');
  assert.match(html, /noindex, nofollow/, `${route}: indexing protection`);
  assert.match(html, /<h1[ >]/, `${route}: static readable heading`);
  assert.match(html, /href="#main"/, `${route}: skip link`);
  assert.doesNotMatch(html, /<form\b|<iframe\b|<astro-island\b|href="(?:tel:|mailto:)/i, `${route}: no unapproved contact or integrations`);
  assert.doesNotMatch(html, /<script\b/i, `${route}: static foundation must ship no scripts`);
}
assert.equal(existsSync('dist/robots.txt'), true);
assert.equal(existsSync('dist/_headers'), true);
assert.equal(existsSync('next.config.js'), false);
assert.equal(readdirSync('public/images/clients').filter(p => p !== '.gitkeep').length, 0);
console.log(`Foundation verified: ${routes.length} static routes, indexing controls, visible content and no scripts/forms/unapproved client assets.`);
