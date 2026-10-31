import {readFileSync,existsSync,readdirSync} from 'node:fs';
import assert from 'node:assert/strict';
const groups=JSON.parse(readFileSync('src/data/services.ts','utf8').split('export const serviceGroups = ')[1].split(' as const;')[0]);
const services=groups.flatMap(g=>g.services);
const source=readFileSync('docs/references/phase6/approved-services.md','utf8').replace(/\r\n/g,'\n');
// Use explicit section splitting so a source paragraph is compared independently of the page data.
const approvedMap=new Map(source.split(/^### /m).slice(1).map(part=>{const [name,...rest]=part.split('\n');return [name,rest.join('\n').trim().split('\n\n## ')[0].trim()];}));
assert.equal(approvedMap.size,14);assert.equal(services.length,14);assert.equal(groups[0].services.length,7);assert.equal(groups[1].services.length,7);
const decode=s=>s.replaceAll('&amp;','&').replaceAll('&#39;',"'").replaceAll('&quot;','"').replaceAll('&gt;','>').replaceAll('&lt;','<').replaceAll(/\s+/g,' ').trim();
for(const service of services)assert.equal(service.problem+' '+service.scope,approvedMap.get(service.name),service.name);
for(const prefix of ['','/theme/light','/theme/dark']){
 const path=`${prefix}/services/`,html=readFileSync(`dist${path}index.html`,'utf8'),main=html.split('<main')[1].split('</main>')[0],text=decode(main.replace(/<[^>]*>/g,' '));
 assert.equal([...main.matchAll(/<h1\b/g)].length,1);
 const levels=[...main.matchAll(/<h([1-6])\b/g)].map(m=>+m[1]);assert.ok(levels.every((n,i)=>!i||n<=levels[i-1]+1));
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(ids.length,new Set(ids).size);
 for(const service of services){assert.ok(ids.includes(service.id));assert.ok(text.includes(service.name));assert.ok(text.includes(service.scope));assert.ok(text.includes(service.problem));}
 assert.equal([...main.matchAll(/class="service-detail"/g)].length,14);assert.equal([...main.matchAll(/class="service-faq"/g)].length,14);
 // These details are OUT OF SCOPE for the public website, not newly approved facts.
 assert.doesNotMatch(main,/<dt>(?:Deliverables|Exclusions|Client responsibilities)<\/dt>|Awaiting approval|FAQ awaiting approval|class="services-review"/);
 for(const service of services){assert.ok(!('outputs' in service));assert.ok(!('exclusionsToConfirm' in service));assert.ok(!('responsibilitiesToConfirm' in service));assert.ok(!('toConfirm' in service.faq));}
 const historical=JSON.parse(readFileSync('docs/references/phase6-audit/service-results.json','utf8'));
 for(const record of historical)assert.ok(!text.includes(record.missingFAQ),'private-detail FAQ question must not appear publicly');
 assert.ok(text.includes('Consulting assistance does not guarantee registration, catalogue approval, compliance outcomes or tender awards.'));
 assert.ok(main.includes('mailto:hr@kanjayconsulting.com'));assert.ok(main.includes('mailto:info@kanjayconsulting.com?subject='));
 assert.doesNotMatch(main,/<astro-island\b|<form\b|<iframe\b/);
 for(const [,href]of html.matchAll(/href="([/#][^"]*)"/g)){const [url,hash]=href.split('#');const target=url?`dist${url.endsWith('/')?url+'index.html':url}`:`dist${path}index.html`;assert.ok(existsSync(target),href);if(hash)assert.ok(readFileSync(target,'utf8').includes(`id="${hash}"`),href);}
 assert.equal(readdirSync(`dist${prefix}/services`).filter(p=>p!=='index.html').length,0,'no individual service pages');
 console.log(`PASS ${path}: 14 approved public scopes, 14 general FAQs, private-detail fields absent, preserved links/routing and no extra service routes`);
}
