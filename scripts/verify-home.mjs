import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
for(const prefix of ['','/theme/light','/theme/dark']){
 const html=readFileSync(`dist${prefix}/index.html`,'utf8');
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(ids.length,new Set(ids).size,'unique IDs');
 let count=0;
 for(const [,href]of html.matchAll(/href="([^"]+)"/g)){
  if(!href.startsWith('/')&&!href.startsWith('#'))continue;
  const [url,hash]=href.split('#');const target=url?`dist${url.endsWith('/')?url+'index.html':url}`:`dist${prefix}/index.html`;
  assert.ok(existsSync(target),href);if(hash){const dest=readFileSync(target,'utf8');assert.ok(dest.includes(`id="${hash}"`),href);if(href.includes('/services/#'))count++;}
 }
 assert.equal(count,8,'six service sections and two path sections');
 assert.doesNotMatch(html,/<astro-island\b|<form\b|<iframe\b/);
 for(const fact of ['2014','2018','Trust','Quality','Support','tel:+918939715152','mailto:info@kanjayconsulting.com','mailto:hr@kanjayconsulting.com'])assert.ok(html.includes(fact),fact);
 for(const file of ['EATON','AAVIZA','DEFORAY','ZUPPA','WOYC'])assert.ok(html.includes(`/images/prototype-clients/${file}.webp`));
 assert.match(html,/noindex, nofollow/);
 console.log(`PASS ${prefix||'/'}: Home facts, no islands/forms/embeds, five approved images, all local targets and eight Services anchors`);
}
