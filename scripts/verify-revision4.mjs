import assert from 'node:assert/strict';
import { readFileSync, readdirSync, writeFileSync, existsSync } from 'node:fs';
import { clientIndustries } from '../src/data/client-industries.ts';
import { workingActivities } from '../src/data/working-activities.ts';
import { policies } from '../src/data/policies.ts';
import { currentClients, neutralClients, clients } from './client-test-data.mjs';
import { transpileModule, ModuleKind } from 'typescript';
const dir='docs/references/revision-4';
const publicModule=readFileSync('src/lib/public-clients.ts','utf8').replace(/^import .*;\r?$/gm,'');
const logoModule=readFileSync('src/lib/client-logos.ts','utf8');
const neutralSource=JSON.parse(readFileSync('src/data/clients.ts','utf8').split('export const neutralClients = ')[1].split(' as const;')[0]);
for(const available of [false,true]){
 const code=transpileModule(`const currentClients=${JSON.stringify(currentClients)};const neutralClients=${JSON.stringify(neutralSource)};const existsSync=()=>${available};${logoModule}\n${publicModule}`,{compilerOptions:{module:ModuleKind.ESNext}}).outputText;
 const fixture=await import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`);
 assert.equal(fixture.listedNeutralClients.length,available?neutralSource.length:0);
 assert.equal(fixture.publicClients.some(c=>c.id==='silq'),available,'missing asset fails closed without changing real files');
}
const before=JSON.parse(readFileSync(`${dir}/before.json`,'utf8'));
const decode=s=>s.replace(/<(style|script)\b[\s\S]*?<\/\1>/g,'').replace(/<[^>]+>/g,' ').replaceAll('&amp;','&').replaceAll('&quot;','"').replaceAll('&#39;',"'").replaceAll('&#x27;',"'").replace(/\s+/g,' ').trim();
const expectedCookie=readFileSync(`${dir}/approved-cookie.txt`,'utf8').trim().replace(/\r\n/g,'\n');
const cookie=policies['Cookie Policy'];
assert.equal([cookie.heading,...cookie.sections.flatMap(s=>[s.title,...s.paragraphs])].join('\n\n'),expectedCookie);
assert.equal(workingActivities.map(a=>a.text).join(' '),'For HR work, that can include reviewing records and processes, coordinating recruitment, and working with payroll inputs and documentation. For GeM sellers, our work includes document coordination, reviewing bid requirements, portal submissions and follow-ups.');
const industrySource=readFileSync(`${dir}/questionnaire-industries.md`,'utf8').trim().split(/\r?\n/).map(l=>l.trim().split(/\s+-\s+/));
assert.equal(industrySource.length,currentClients.length);
const aliases={'Safe Tech Fire Solutions':'Safe Tech Fire Solution','Shopup':'ShopUp','Kaavian services':'Kaaviyan services'};
const allowedShortening={
  'Kaaviyan services':'Global IT solutions and services',
  'Limpar':'Chemicals, commercial cleaning, sanitation and hygiene solutions',
};
for(const c of currentClients){const row=industrySource.find(([name])=>name===(aliases[c.name]??c.name));assert.ok(row,c.name);const description=row[1].split(' (tagline:')[0];assert.equal(clientIndustries[c.id].toLowerCase(),(allowedShortening[row[0]]??description).toLowerCase());}
assert.equal(clientIndustries.silq,undefined);
let routes=0;
for(const [route,old] of Object.entries(before)){
 const html=readFileSync('dist/'+route,'utf8');
 assert.equal(html.match(/<div class="review-banner">[\s\S]*?<\/div>/)?.[0],old.banner,route+' banner unchanged');
 assert.equal(html.match(/<footer[\s\S]*?<\/footer>/)?.[0],old.footer,route+' footer unchanged');
 assert.match(html,/noindex, nofollow/);
 if(route.endsWith('contact/index.html')){assert.equal(html.match(/<div\b[^>]*data-spotlight-disabled/g)?.length,3);assert.equal(decode(html.match(/<main[\s\S]*?<\/main>/)[0]),decode(old.contactText));assert.doesNotMatch(html,/<astro-island\b/);}
 routes++;
}
for(const prefix of ['','theme/light/','theme/dark/']){
 const about=readFileSync(`dist/${prefix}about/index.html`,'utf8');
 assert.ok(about.includes('data-working-stepper'));assert.doesNotMatch(about,/<astro-island\b|BlurText|ShinyText/);
 for(const a of workingActivities){assert.ok(about.includes(`id="${a.id}"`));assert.ok(decode(about).includes(a.text));}
 assert.ok(about.includes('data-stepper-controls hidden'));assert.doesNotMatch(about,/class="stepper__pane"[^>]*\shidden/);
 const html=readFileSync(`dist/${prefix}cookie-policy/index.html`,'utf8');
 const body=[decode(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)[1]),...[...html.matchAll(/<section\b[^>]*class="policy-section"[^>]*>([\s\S]*?)<\/section>/g)].flatMap(([,section])=>[...section.matchAll(/<(?:h2|p)\b[^>]*>([\s\S]*?)<\/(?:h2|p)>/g)].map(m=>decode(m[1].replace(/<\/?a\b[^>]*>/g,''))))];
 assert.equal(body.join('\n\n'),expectedCookie,'verbatim rendered Cookie body '+prefix);assert.ok(html.includes(`href="/${prefix}contact/"`));
 const home=readFileSync(`dist/${prefix}index.html`,'utf8');assert.doesNotMatch(home,/client-industry/);for(const c of clients)assert.ok(home.includes(c.image));
 const mainClients=readFileSync(`dist/${prefix}clients/index.html`,'utf8');assert.equal(mainClients.includes('/images/clients/silq.webp'),existsSync('public/images/clients/silq.webp'));
}
for(const file of readdirSync('dist',{recursive:true}).filter(f=>/\.(html|js)$/.test(f)))assert.doesNotMatch(readFileSync('dist/'+file,'utf8'),/info@kanjayconsulting\.com/i);
if(existsSync(`${dir}/responsive-browser.json`)){
 const browser=JSON.parse(readFileSync(`${dir}/responsive-browser.json`,'utf8'));assert.equal(browser.length,24);
 for(const r of browser){assert.equal(r.width,r.viewport);assert.ok(r.scrollWidth<=r.viewport);if(r.clients){assert.equal(r.clients.current.length,currentClients.length);assert.deepEqual(r.clients.current.map(c=>c.name),currentClients.map(c=>c.name));for(const c of r.clients.current)assert.equal(c.industry,clientIndustries[c.id]);assert.ok(r.clients.neutral.every(c=>c.industry===null));}if(r.contact)assert.equal(r.contact.spotlights,3);}
 const staticBrowser=JSON.parse(readFileSync(`${dir}/script-blocked-browser.json`,'utf8'));assert.equal(staticBrowser.length,24);
 for(const r of staticBrowser){assert.equal(r.width,r.viewport);assert.ok(r.scrollWidth<=r.viewport);if(r.panes){assert.equal(r.panes.length,workingActivities.length);assert.ok(r.panes.every(p=>!p.hidden&&p.display==='block'));assert.equal(r.controls,'none');}}
 const keys=JSON.parse(readFileSync(`${dir}/stepper-keyboard.json`,'utf8'));assert.ok(keys[0].focused==='gem-working-activities'&&keys[1].focused==='hr-working-activities');assert.ok(keys.slice(0,3).every(k=>k.outlineStyle==='solid'));assert.equal(keys[3].visible[0],'hr-working-activities');
 for(const row of JSON.parse(readFileSync(`${dir}/contact-focus.json`,'utf8')))assert.equal(row.outlineStyle,'solid');
}
const result={status:'PASS',routesWithUnchangedBannersAndFooters:routes,currentClientCount:currentClients.length,neutralClientCount:neutralClients.length,homeLogoCount:clients.length,industries:'All mappings checked against questionnaire; only declared spelling aliases/caption shortening; no SILQ caption',cookie:'Exact approved heading/section/paragraph text in all three built variants',stepper:'Two unchanged existing activity sentences; both SSR panes visible and controls hidden until enhancement',contact:'Three nonhydrated disabled Spotlight surfaces; exact visible contact copy preserved',oldMailbox:'Absent from built HTML/JS',sources:'Read-only; SHA recorded in report',manual:'Browser interaction is recorded separately; runtime reduced motion, screen-reader speech, touch and delivery not claimed'};
writeFileSync(`${dir}/implementation-checks.json`,JSON.stringify(result,null,2)+'\n');console.log(result);
