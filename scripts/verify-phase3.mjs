import { readFileSync, existsSync } from 'node:fs';
import assert from 'node:assert/strict';
const variants=['/prototype/','/prototype/static/',...['light','dark'].flatMap(t=>[`/theme/${t}/prototype/`,`/theme/${t}/prototype/static/`])];
for(const url of variants){
  const html=readFileSync(`dist${url}index.html`,'utf8');
  const main=html.split('<main')[1].split('</main>')[0];
  for(const text of ['HR support.','GeM seller guidance.','Recruitment &amp; Talent Acquisition','Talk to our team','Know more about us','Eaton','Aaviza Technologies','Deforay','Zuppa','Woyc::OD'])assert.ok(main.includes(text),`${url}: static text ${text}`);
  assert.doesNotMatch(main,/visibility:\s*hidden|opacity:\s*0(?:;|\")/,`${url}: no hidden essential server content`);
  assert.match(html,/noindex, nofollow/);
  assert.doesNotMatch(html,/<form\b|<iframe\b/);
  assert.ok(!html.includes('client:only'));
  if(url.includes('/static/'))assert.ok(!html.includes('<astro-island'),`${url}: static baseline has no hydrated islands`);
  else assert.equal([...html.matchAll(/<astro-island\b/g)].length,4,`${url}: four isolated experiments`);
  for(const [,href]of html.matchAll(/href="(\/[^"]*)"/g)){
    const path=href.split('#')[0];
    assert.ok(existsSync(`dist${path.endsWith('/')?path+'index.html':path}`),`${url}: target ${href}`);
  }
}
console.log(`PASS: ${variants.length} prototype variants retain text, approved asset alternatives and valid links in static HTML.`);
