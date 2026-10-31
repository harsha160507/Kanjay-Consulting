import {readFileSync,readdirSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
const clients=JSON.parse(readFileSync('src/data/clients.ts','utf8').split('export const currentClients = ')[1].split(' as const;')[0]);
const approved=readFileSync('docs/references/phase7/client-approvals.md','utf8').split(/\r?\n/).map(l=>l.split('|').map(x=>x.trim())).filter(p=>/^\d+\.$/.test(p[0]));
assert.equal(clients.length,23);assert.equal(approved.length,23);assert.deepEqual(clients.map(c=>c.name),approved.map(p=>p[2]));assert.ok(approved.every(p=>p[3]==='Current'&&p[4]==='Yes'));assert.ok(clients.every(c=>c.status==='current'));
const provenance=JSON.parse(readFileSync('docs/references/phase7/asset-provenance.json','utf8'));
for(const c of clients){const p=provenance.publicAssets.find(p=>p.name===c.name);assert.equal(createHash('sha256').update(readFileSync('public'+c.image)).digest('hex'),p.sha256);assert.ok(c.width>0&&c.height>0);}
const decode=s=>s.replaceAll('&amp;','&').replaceAll('&#39;',"'").replaceAll('&quot;','"').replaceAll(/\s+/g,' ').trim();
for(const prefix of ['','/theme/light','/theme/dark']){
 const url=`${prefix}/clients/`,html=readFileSync(`dist${url}index.html`,'utf8'),main=html.split('<main')[1].split('</main>')[0];
 assert.equal([...main.matchAll(/<h1\b/g)].length,1);assert.equal([...main.matchAll(/<figcaption>/g)].length,23);assert.equal([...main.matchAll(/data-client=/g)].length,23);
 for(const c of clients){assert.ok(decode(main).includes(c.name),c.name);assert.ok(main.includes(c.image));}
 assert.match(main,/Current clients/);assert.doesNotMatch(main,/SILQ|Golden Works|UNIDENTIFIED|testimonial|case study|past client|<blockquote|<astro-island|<form\b|<iframe\b/i);
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(ids.length,new Set(ids).size);
 for(const [,href]of html.matchAll(/href="([/#][^"]*)"/g)){const [path,hash]=href.split('#'),file=path?`dist${path.endsWith('/')?path+'index.html':path}`:`dist${url}index.html`;assert.ok(existsSync(file),href);if(hash)assert.ok(readFileSync(file,'utf8').includes(`id="${hash}"`),href);}
 const levels=[...main.matchAll(/<h([1-6])\b/g)].map(m=>+m[1]);assert.ok(levels.every((n,i)=>!i||n<=levels[i-1]+1));
 console.log(`PASS ${url}: 23 approved current names/assets, exact provenance, captions, safe links/headings and no invented engagement material`);
}
assert.deepEqual(readdirSync('public/images/clients').filter(x=>x!=='.gitkeep').sort(),clients.map(c=>c.image.split('/').at(-1)).sort());
