import assert from 'node:assert/strict';
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
const dir='docs/references/revision-3-test';
const read=name=>JSON.parse(readFileSync(`${dir}/${name}.json`,'utf8'));
const groups=JSON.parse(readFileSync('src/data/services.ts','utf8').split('export const serviceGroups = ')[1].split(' as const;')[0]);
const services=groups.flatMap(g=>g.services);
function content(row){
  const s=services.find(s=>s.id===row.id);assert.ok(s,row.id);
  assert.equal(row.name,s.name);assert.deepEqual(row.facts,[s.who,s.problem,s.scope]);
  assert.equal(row.question,s.faq.question);assert.equal(row.answer,s.faq.answer);
  const expected=[`mailto:enquiry@kanjayconsulting.com?subject=${encodeURIComponent(s.name+' enquiry')}`];
  if(s.id==='recruitment-talent-acquisition')expected.push('mailto:hr@kanjayconsulting.com');
  assert.deepEqual(row.emails,expected);
}
for(const name of ['selector-content','selector-content-dark']){
  const rows=read(name);assert.deepEqual(rows.map(r=>r.id),services.map(s=>s.id));
  for(const row of rows){content(row);assert.equal(row.cardBorder,'0px');assert.equal(row.factsDisplay,'block');
    for(const f of row.fields){assert.equal(f.border,'0px');if(f.tag!=='DD'){assert.equal(f.decoration,'underline');assert.equal(f.weight,'700');}}
  }
}
const cycles=read('keyboard-cycles');assert.equal(cycles.cycles.length,28);
for(const g of groups)for(const direction of ['next','previous']){
  const rows=cycles.cycles.filter(r=>r.group===g.id&&r.direction===direction);
  assert.deepEqual(rows.map(r=>r.id),Array.from({length:7},(_,i)=>g.services[direction==='next'?(i+1)%7:(13-i)%7].id));
  for(const row of rows){assert.equal(row.focus,'ARTICLE');assert.ok(parseFloat(row.outline)>0);assert.equal(row.outlineStyle,'solid');}
}
for(const row of cycles.keyboard){assert.ok(parseFloat(row.outline)>0);assert.equal(row.style,'solid');if(row.kind==='FAQ Enter')assert.equal(row.open,true);else assert.equal(row.focus,'SELECT');}
const links=read('deep-links');assert.equal(links.cold.length,14);assert.equal(links.index.length,14);
for(const row of links.cold){const g=groups.find(g=>g.services.some(s=>s.id===row.id));assert.ok(row.active.some(p=>p.group===g.id&&p.id===row.id));assert.equal(row.hash,'#'+row.id);}
for(const row of links.index){assert.equal(row.hash,'#'+row.id);assert.equal(row.active,groups.find(g=>g.services.some(s=>s.id===row.id)).id);}
const extraLinks=read('additional-deep-links');assert.equal(extraLinks.length,28);
for(const row of extraLinks){assert.equal(row.hash,'#'+row.id);const g=groups.find(g=>g.services.some(s=>s.id===row.id));assert.ok(row.active.some(p=>p.group===g.id&&p.id===row.id));}
for(const row of read('all-faq-keyboard')){assert.equal(row.opened.open,true);assert.ok(parseFloat(row.opened.outline)>0);assert.equal(row.opened.outlineStyle,'solid');assert.equal(row.closedWithSpace,true);}
for(const name of ['static-outlines','pager-outlines'])for(const row of read(name)){assert.equal(row.focusWithin,false);assert.equal(row.style,'none');}
const responsive=read('responsive');assert.equal(responsive.length,6);
for(const row of responsive){assert.equal(row.width,row.viewport);assert.ok(row.scrollWidth<=row.viewport);for(const p of row.pagers){assert.equal(p.visibleCards,1);assert.equal(p.border,'0px');assert.equal(p.dtBorder,'0px');assert.equal(p.dtDecoration,'underline');assert.equal(p.dtWeight,'700');assert.equal(p.dtUnderlineColour,p.iconColour);assert.ok(p.iconTitleGap>0);if(row.width===375)assert.ok(p.buttonsTop.every(t=>t>=p.selectorBottom));}}
for(const row of read('static-fallback')){
  assert.equal(row.width,row.viewport);assert.ok(row.scrollWidth<=row.viewport);assert.equal(row.pagers,0);assert.deepEqual(row.cards.map(c=>c.id),services.map(s=>s.id));
  for(const l of row.lists){assert.equal(l.active,null);assert.equal(l.clip,'none');}
  for(const c of row.cards){content(c);assert.equal(c.border,'0px');assert.equal(c.display,'block');assert.equal(c.factsDisplay,'block');assert.equal(c.visible,'visible');assert.equal(c.opacity,'1');assert.ok(c.height>0);for(const f of c.fields){assert.equal(f.border,'0px');if(f.tag==='DT'){assert.equal(f.decoration,'underline');assert.equal(f.weight,'700');}}}
}
for(const row of read('static-list-state')){assert.equal(row.width,row.viewport);for(const l of row.lists){assert.equal(l.inertAttribute,null);assert.equal(l.ariaHidden,null);assert.equal(l.active,null);assert.equal(l.clip,'none');}}
for(const row of read('static-links-faq')){assert.equal(row.hash,'#'+row.id);assert.equal(row.open,true);assert.equal(row.focused,'SUMMARY');assert.ok(parseFloat(row.outline)>0);}
const files=readdirSync('dist',{recursive:true}).filter(p=>/\.(html|js|css|xml|txt|json|svg|webmanifest|map)$/i.test(p));
const mail=[];let candidateLinks=0,generalLinks=0;
for(const file of files){const text=readFileSync('dist/'+file,'utf8');assert.doesNotMatch(text,/info(?:@|%40|&#64;|&#x40;)kanjayconsulting\.com/i,file);
  if(!file.endsWith('.html'))continue;
  const addresses=[...text.matchAll(/href="mailto:([^"?]+)(?:\?([^"]*))?"/g)].map(m=>({address:m[1],query:m[2]??''}));
  for(const a of addresses){assert.ok(['enquiry@kanjayconsulting.com','hr@kanjayconsulting.com'].includes(a.address),file);if(a.address.startsWith('hr@'))candidateLinks++;else generalLinks++;}
  mail.push({file,links:addresses});
}
assert.equal(mail.length,34);assert.ok(candidateLinks>0);assert.ok(generalLinks>0);
writeFileSync(`${dir}/email-inventory.json`,JSON.stringify({status:'PASS',filesScanned:files.length,htmlRoutes:mail.length,generalLinks,candidateLinks,oldMailboxMatches:0,routes:mail},null,2)+'\n');
const result={testedCommit:'610daf1027e8b73aa1488982cea64c74e8fa8e26',status:'PASS for asserted checks',selectorCards:28,keyboardTransitions:28,coldLinks:42,indexLinks:14,pagerFAQsKeyboard:14,staticCases:6,staticCards:84,staticFAQLinks:14,email:{filesScanned:files.length,htmlRoutes:34,generalLinks,candidateLinks,oldMailboxMatches:0},reducedMotionRuntime:'NOT TESTED',browserWideJavaScriptOff:'NOT TESTED; scripts blocked by enforced CSP instead'};
writeFileSync(`${dir}/assertions.json`,JSON.stringify(result,null,2)+'\n');console.log(result);
