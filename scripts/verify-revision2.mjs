import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { transpileModule, ModuleKind } from 'typescript';
import { clients as publicClients } from './client-test-data.mjs';

const directory='docs/references/revision-2';
const current=JSON.parse(readFileSync('src/data/clients.ts','utf8').split('export const currentClients = ')[1].split(' as const;')[0]);
const helperSource=readFileSync('src/lib/client-logos.ts','utf8');
const clientSource=readFileSync('src/data/home-clients.ts','utf8').replace(/^import .*;\r?$/gm,'');
const bundled=transpileModule(`const publicClients=${JSON.stringify(publicClients)};\n${helperSource}\n${clientSource}`,{compilerOptions:{module:ModuleKind.ESNext}}).outputText;
const {homeClients,dedupeClients,logoDimensions}=await import(`data:text/javascript;base64,${Buffer.from(bundled).toString('base64')}`);
const expected=dedupeClients(publicClients);
assert.deepEqual(homeClients,expected,'complete live approved set plus SILQ, deduped');
const example=homeClients[0];
assert.equal(dedupeClients([example,{...example,id:'alias'},{...example,id:'other',image:'/other.webp',name:example.name.toUpperCase()}]).length,1);
assert.equal(existsSync('public/images/prototype-clients'),false,'legacy asset copies removed');
const dimensions=homeClients.map(client=>{
  assert.ok(existsSync('public'+client.image),client.image);
  const size=logoDimensions(client);assert.ok(size.width<=150&&size.height<=72);
  assert.ok(Math.abs(size.width/size.height-client.width/client.height)<.08,'proportions maintained');
  return {id:client.id,...size};
});
const provenance=JSON.parse(readFileSync(`${directory}/silq-provenance.json`,'utf8'));
assert.equal(createHash('sha256').update(readFileSync('public/images/clients/silq.webp')).digest('hex'),provenance.webpSHA256);
assert.equal(provenance.alphaDifferences,0);assert.equal(provenance.visibleColourDifferences,0);
for(const prefix of ['','/theme/light','/theme/dark']){
  const html=readFileSync(`dist${prefix}/index.html`,'utf8');
  const main=html.split('<main')[1].split('</main>')[0];
  const grid=main.match(/<ul class="home-client-grid"[^>]*>([\s\S]*?)<\/ul>/)?.[1];assert.ok(grid);
  assert.deepEqual([...grid.matchAll(/data-client="([^"]+)"/g)].map(m=>m[1]),homeClients.map(c=>c.id));
  for(const c of homeClients)assert.ok(grid.includes(`src="${c.image}"`),c.name);
  assert.equal([...main.matchAll(/class="gradient-text home-gradient"/g)].length,1,'one phrase only');
  assert.match(main,/<span class="gradient-text__content">GeM seller guidance\.<\/span>/);
  assert.equal([...main.matchAll(/class="home-service-icon"/g)].length,2);
  assert.equal([...main.matchAll(/stroke-width="1.5"/g)].length,2);
  for(const svg of main.matchAll(/<svg class="home-service-icon"([^>]+)>/g)){
    assert.match(svg[1],/aria-hidden="true"/);assert.match(svg[1],/focusable="false"/);
  }
  assert.equal([...main.matchAll(/data-spotlight-disabled/g)].length,3,'three static Spotlight surfaces');
  assert.equal([...main.matchAll(/<astro-island\b/g)].length,2,'only Call and Loop hydrate');
  assert.match(main,new RegExp(`href="${prefix}/clients/"`));
  assert.doesNotMatch(main,/images\/prototype-clients\/|home-woyc|client:only|visibility:\s*hidden/);
  assert.match(main,/href="tel:\+918939715152"/);
}
const source=readFileSync('src/pages/index.astro','utf8');
assert.doesNotMatch(source,/BlurText|ShinyText|client:only|client:.*GradientText/);
assert.match(source,/<section data-fade-content class="home-hero"/);
const loop=readFileSync('src/components/home/HomeClientLoop.tsx','utf8');
for(const setting of ['speed={playing ? 18 : 0}','pauseOnHover','hoverSpeed={0}','intro={false}','scaleOnHover={false}','draggable={false}','scrollBoost={0}'])assert.ok(loop.includes(setting),setting);
assert.match(loop,/if \(!ready \|\| reduced\) return null/);
const result={status:'PASS',sourceClients:current.length,uniqueSourceClients:dedupeClients(current).length,homeLogos:homeClients.length,ids:homeClients.map(c=>c.id),normalisedDimensions:dimensions,silq:'Owner attachment converted losslessly; exact visible colours and alpha verified',variants:3,checks:['complete deduped static list','all local images exist','duplicate assets absent','one static Gradient Text phrase','two decorative inline icons','three nonhydrated Spotlight surfaces','only Call/Loop islands','real Clients link','unchanged approved contact targets','safe loop configuration'],limitations:'Source/HTML/unit checks are separate from browser operation, actual OS preferences, physical touch and screen-reader speech.'};
writeFileSync('docs/references/revision-4/home-regression.json',JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result,null,2));
