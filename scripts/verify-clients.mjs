import {readFileSync,readdirSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import { clients, currentClients, neutralClients } from './client-test-data.mjs';
import { clientIndustries } from '../src/data/client-industries.ts';
const approved=readFileSync('docs/references/phase7/client-approvals.md','utf8').split(/\r?\n/).map(l=>l.split('|').map(x=>x.trim())).filter(p=>/^\d+\.$/.test(p[0]));
assert.equal(currentClients.length,approved.length);assert.deepEqual(currentClients.map(c=>c.name),approved.map(p=>p[2]));assert.ok(approved.every(p=>p[3]==='Current'&&p[4]==='Yes'));assert.ok(currentClients.every(c=>c.status==='current'));assert.ok(!currentClients.some(c=>c.id==='silq'));assert.ok(neutralClients.every(c=>!('status' in c)));assert.deepEqual(Object.keys(clientIndustries).filter(id=>id!=='silq').sort(),currentClients.map(c=>c.id).sort());assert.equal(clientIndustries.silq,'E-commerce / retail');
const provenance=JSON.parse(readFileSync('docs/references/phase7/asset-provenance.json','utf8'));
for(const c of clients){const p=c.id==='silq'?JSON.parse(readFileSync('docs/references/revision-2/silq-provenance.json','utf8')):provenance.publicAssets.find(p=>p.name===c.name);assert.equal(createHash('sha256').update(readFileSync('public'+c.image)).digest('hex'),c.id==='silq'?p.webpSHA256:p.sha256);assert.ok(c.width>0&&c.height>0);}
const decode=s=>s.replaceAll('&amp;','&').replaceAll('&#39;',"'").replaceAll('&quot;','"').replaceAll(/\s+/g,' ').trim();
for(const prefix of ['','/theme/light','/theme/dark']){
 const url=`${prefix}/clients/`,html=readFileSync(`dist${url}index.html`,'utf8'),main=html.split('<main')[1].split('</main>')[0];
 assert.equal([...main.matchAll(/<h1\b/g)].length,1);assert.equal([...main.matchAll(/<figcaption>/g)].length,clients.length);assert.equal([...main.matchAll(/data-client=/g)].length,clients.length);
 for(const c of clients){assert.ok(decode(main).includes(c.name),c.name);assert.ok(main.includes(c.image));}
 const grid=main.split('aria-label="Client names and logos"')[1].split('</ul>')[0];assert.equal([...grid.matchAll(/data-client=/g)].length,clients.length);
 for(const c of clients){const tile=grid.split(`data-client="${c.id}"`)[1].split('</li>')[0];assert.ok(decode(tile).includes(clientIndustries[c.id]),c.name+' approved industry');}
 assert.match(main,/<h2 id="current-clients-title">Clients<\/h2>/);assert.doesNotMatch(main,/neutral-clients-title|clients-neutral|Current clients|Golden Works|UNIDENTIFIED|testimonial|case study|past client|<blockquote|<astro-island|<form\b|<iframe\b/i);
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(ids.length,new Set(ids).size);
 for(const [,href]of html.matchAll(/href="([/#][^"]*)"/g)){const [path,hash]=href.split('#'),file=path?`dist${path.endsWith('/')?path+'index.html':path}`:`dist${url}index.html`;assert.ok(existsSync(file),href);if(hash)assert.ok(readFileSync(file,'utf8').includes(`id="${hash}"`),href);}
 const levels=[...main.matchAll(/<h([1-6])\b/g)].map(m=>+m[1]);assert.ok(levels.every((n,i)=>!i||n<=levels[i-1]+1));
 console.log(`PASS ${url}: one grid with ${clients.length} names/logos and approved industry captions, unchanged original clients, no implied SILQ status or invented engagement material`);
}
assert.deepEqual(readdirSync('public/images/clients').filter(x=>x!=='.gitkeep').sort(),clients.map(c=>c.image.split('/').at(-1)).sort());
