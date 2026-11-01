import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import { clients } from './client-test-data.mjs';
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
 assert.doesNotMatch(html,/<form\b|<iframe\b/);
 assert.equal([...html.matchAll(/<astro-island\b/g)].length,2);
 for(const fact of ['2014','2018','Trust','Quality','Support','tel:+918939715152','mailto:enquiry@kanjayconsulting.com','mailto:hr@kanjayconsulting.com'])assert.ok(html.includes(fact),fact);
 for(const client of clients)assert.ok(html.includes(client.image));
 assert.equal(html.includes('/images/clients/silq.webp'),existsSync('public/images/clients/silq.webp'));
 assert.doesNotMatch(html,/client-industry/);
 assert.doesNotMatch(html,/images\/prototype-clients\/|home-woyc/);
 assert.match(html,/noindex, nofollow/);
 console.log(`PASS ${prefix||'/'}: Home facts, two isolated enhancements, no forms/embeds, full canonical client assets plus SILQ, all local targets and eight Services anchors`);
}
