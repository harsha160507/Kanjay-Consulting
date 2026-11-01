import assert from 'node:assert/strict';
import { readFileSync, readdirSync, writeFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { workingActivities } from '../src/data/working-activities.ts';
const dir='docs/references/revision-4-test';
const read=name=>JSON.parse(readFileSync(`${dir}/${name}.json`,'utf8'));
const cookie=read('cookie-rendered');
const expected=readFileSync('docs/references/revision-4/approved-cookie.txt','utf8').trim().replace(/\r\n/g,'\n');
assert.equal([cookie.heading,...cookie.sections.flatMap(s=>[s.title,...s.paragraphs])].join('\n\n'),expected);
const text=s=>s.replace(/<\/?a\b[^>]*>/g,'').replace(/<[^>]*>/g,'').replaceAll('&amp;','&').replaceAll('&quot;','"').replaceAll('&#39;',"'").replace(/\s+/g,' ').trim();
for(const prefix of ['','theme/light/','theme/dark/']){
 const html=readFileSync(`dist/${prefix}cookie-policy/index.html`,'utf8');
 const words=[text(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)[1]),...[...html.matchAll(/<section\b[^>]*class="policy-section"[^>]*>([\s\S]*?)<\/section>/g)].flatMap(([,s])=>[...s.matchAll(/<(?:h2|p)\b[^>]*>([\s\S]*?)<\/(?:h2|p)>/g)].map(m=>text(m[1])))];
 assert.equal(words.join('\n\n'),expected,prefix+' exact Cookie body');
 assert.ok(html.includes('Technical descriptions concern the current redesign; review notes identify unresolved business or legal wording.'));
}
const auditSentence='Technical descriptions concern the current redesign; review notes identify unresolved business or legal wording.';
const hasAuditWording=cookie.draftNotice.includes(auditSentence);
const home=read('home-silq'),client=read('clients-silq');
assert.ok(existsSync('public/images/clients/silq.webp'));assert.ok(home.loopSilqImages>0);assert.equal(home.staticCount,24);assert.equal(home.industryCaptions,0);assert.ok(home.staticSilq.includes('alt="SILQ"'));
assert.equal(client.gridCount,1);assert.equal(client.count,24);assert.equal(client.heading,'Clients');assert.equal(client.neutralSections,0);assert.equal(client.silqText,'SILQE-commerce / retail');assert.doesNotMatch(client.silq,/current|past|testimonial|engagement|services?/i);
const baseline=JSON.parse(readFileSync('docs/references/revision-4/before.json','utf8'));
let bannerRoutes=0,linkTargets=0;
for(const [file,old] of Object.entries(baseline)){
 const html=readFileSync('dist/'+file,'utf8');
 assert.equal(html.match(/<div class="review-banner">[\s\S]*?<\/div>/)?.[0],old.banner);
 assert.equal(html.match(/<footer[\s\S]*?<\/footer>/)?.[0],old.footer);bannerRoutes++;
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(ids.length,new Set(ids).size);
 for(const [,href] of html.matchAll(/href="([/#][^"]*)"/g)){
  const [path,fragment]=href.split('#');const target=path?'dist'+(path.endsWith('/')?path+'index.html':path):'dist/'+file;
  assert.ok(existsSync(target),file+' '+href);if(fragment)assert.ok(readFileSync(target,'utf8').includes(`id="${fragment}"`),href);linkTargets++;
 }
}
const layouts=read('all-route-layouts');assert.equal(layouts.length,68);
for(const row of layouts){assert.equal(row.width,row.viewport);assert.ok(row.scrollWidth<=row.viewport,row.requested);assert.equal(row.h1Count,1);assert.ok(row.h1);assert.notEqual(row.mainDisplay,'none');assert.equal(row.policyLabel,'Policy drafts');if(row.contact){assert.equal(row.contact.length,3);for(const p of row.contact){assert.ok(p.width>0);assert.ok(p.scroll<=p.width+1);assert.equal(p.shadow,'none');assert.ok(p.lightDisplays.every(d=>d==='none'));}}}
const staticAbout=read('about-script-blocked');assert.equal(staticAbout.cases.length,6);
for(const row of staticAbout.cases){assert.equal(row.width,row.viewport);assert.equal(row.overflow,false);assert.equal(row.enhanced,null);assert.equal(row.controls,'none');assert.equal(row.panes.length,workingActivities.length);for(let i=0;i<row.panes.length;i++){const p=row.panes[i],s=workingActivities[i];assert.equal(p.id,s.id);assert.equal(p.title,s.title);assert.equal(p.text,s.text);assert.equal(p.hidden,false);assert.equal(p.display,'block');assert.ok(p.height>0);}assert.ok(row.sections.every(s=>s.visibility==='visible'&&s.opacity==='1'&&s.display!=='none'));}
assert.equal(staticAbout.nativeLink.hash,'#gem-working-activities');assert.equal(staticAbout.nativeLink.targetDisplay,'block');
// Ensure the actual activities predate this revision, rather than only checking
// against the newly introduced data module.
const original=JSON.parse(readFileSync('docs/references/revision-1/content-baseline.json','utf8'));
assert.ok(original['about/index.html'].includes(workingActivities.map(a=>a.text).join(' ')));
const sourceHash=createHash('sha256').update(readFileSync('../sources/kanjay website.zip')).digest('hex');assert.equal(sourceHash,'c2601273dc9bfeca079c7f21e596d2fb7b7e06e9fbf8d0139b7e4135a1ae0606');
const htmlCount=readdirSync('dist',{recursive:true}).filter(f=>f.endsWith('.html')).length;assert.equal(htmlCount,34);
const result={testedCommit:'7507ca604996e8560d5c58d83182b6b2472841c7',overall:hasAuditWording?'FAIL — Cookie audit-style notice remains':'PASS for executed checks',criteria:{a:'PASS — approved industry caption retained; no relationship status or engagement description',b:'PASS — separate fresh verify-clients run',c:{result:hasAuditWording?'FAIL':'PASS',approvedBody:'PASS — exact words and paragraphs',remainingAuditSentence:hasAuditWording?auditSentence:null,location:'Cookie Policy draft notice, outside approved sections; required banner/draft labels themselves remain unchanged'},d:'PASS — exact pre-existing activities; six script-blocked cases and native link',e:'PASS — three static Spotlight panels in both themes at both widths, no glow/shadow',f:`PASS — exact review-banner/footer comparison on ${bannerRoutes} routes`,g:'PASS for measured layout — 68 entry-URL/width cases; not a full accessibility or production certification'},linksChecked:linkTargets,staticHtmlPages:htmlCount,sourceZipSha256:sourceHash,notTested:['Actual screen-reader speech','Physical touch','Runtime OS/browser reduced-motion switching','Browser-wide JavaScript-off setting (enforced script blocking used)','Contact-app launch/delivery','Fresh Lighthouse/performance','Production hosting']};
writeFileSync(`${dir}/acceptance-results.json`,JSON.stringify(result,null,2)+'\n');console.log(result);
