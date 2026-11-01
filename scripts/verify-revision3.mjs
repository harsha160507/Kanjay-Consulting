import assert from 'node:assert/strict';
import { readFileSync, readdirSync, writeFileSync, existsSync } from 'node:fs';
const directory='docs/references/revision-3';
const baseline=JSON.parse(readFileSync(`${directory}/service-baseline.json`,'utf8').replaceAll('info@kanjayconsulting.com','enquiry@kanjayconsulting.com'));
const groups=JSON.parse(readFileSync('src/data/services.ts','utf8').split('export const serviceGroups = ')[1].split(' as const;')[0]);
assert.deepEqual(groups,baseline,'all service words/order unchanged except owner-approved email replacement');
assert.deepEqual(groups.map(g=>[g.id,g.services.length]),[['hr-support',7],['gem-seller-support',7]]);
let organizationsChecked=0;
const mailBaseline=JSON.parse(readFileSync(`${directory}/email-baseline.json`,'utf8'));
for(const [route,emails] of Object.entries(mailBaseline)){
  const html=readFileSync('dist/'+route,'utf8');
  assert.doesNotMatch(html,/info(?:@|%40|&#64;)kanjayconsulting\.com/i,route);
  const expected=emails.map(e=>{const split=e.indexOf('?');const address=split<0?e:e.slice(0,split);const query=split<0?'':e.slice(split);return address.replaceAll('info@kanjayconsulting.com','enquiry@kanjayconsulting.com')+query;});
  // Phase 4's complete approved Cookie body replaces its generic contact block
  // with the approved Contact-page link; footer/candidate actions are unchanged.
  if(route.includes('cookie-policy/'))expected.splice(expected.indexOf('mailto:enquiry@kanjayconsulting.com'),1);
  assert.deepEqual([...html.matchAll(/href="(mailto:[^"]+)"/g)].map(m=>m[1]),expected,`${route}: subjects/bodies/candidate targets preserved; approved Cookie contact-block replacement allowed`);
  for(const [,data]of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)){assert.equal(JSON.parse(data).email,'enquiry@kanjayconsulting.com');organizationsChecked++;}
}
assert.equal(organizationsChecked,3,'Organization metadata on all Home variants');
for(const theme of ['','theme/light/','theme/dark/']){
  const html=readFileSync(`dist/${theme}services/index.html`,'utf8');
  assert.equal([...html.matchAll(/<svg class="service-title-icon"/g)].length,14);
  assert.equal([...html.matchAll(/class="service-card-title"/g)].length,14);
  assert.equal([...html.matchAll(/class="services-list" id="[^"]+-static-list"/g)].length,2);
  assert.doesNotMatch(html,/data-pager-active="true"|\binert(?:[ >])/,'static fallback initially visible and operable');
  assert.ok(html.includes('Employer enquiry by email'));assert.ok(html.includes('Candidate enquiry by email'));
}
for(const file of readdirSync('dist',{recursive:true}).filter(f=>f.endsWith('.js'))){assert.doesNotMatch(readFileSync('dist/'+file,'utf8'),/info@kanjayconsulting\.com/i,file);}
const runtimePath=`${directory}/runtime-content.json`;
if(existsSync(runtimePath)){
  for(const row of JSON.parse(readFileSync(runtimePath,'utf8'))){
    const service=groups.flatMap(g=>g.services).find(s=>s.id===row.id);assert.ok(service);
    assert.equal(row.name,service.name);assert.deepEqual(row.facts,[service.who,service.problem,service.scope]);
    assert.equal(row.iconHidden,'true');assert.equal(row.iconStroke,'1.5');
    assert.equal(row.question,service.faq.question);assert.equal(row.answer,service.faq.answer);
    assert.ok(row.mailtos.includes(`mailto:enquiry@kanjayconsulting.com?subject=${encodeURIComponent(service.name+' enquiry')}`));
    if(service.id==='recruitment-talent-acquisition'){assert.ok(row.mailtos.includes('mailto:hr@kanjayconsulting.com'));assert.ok(row.labels.includes('Employer enquiry by email ↗'));}
  }
}
const result={status:'PASS',groups:groups.map(g=>({id:g.id,count:g.services.length})),preservation:'Exact data comparison against pre-change snapshot, allowing only business-email replacement',emailRoutes:Object.keys(mailBaseline).length,mailtoQueries:'Exact before/after comparison: subjects, bodies and hr@ mailbox unchanged',fallback:'14 server-rendered cards/FAQs/icons, two unhidden fallback lists and pager islands',runtimeContent:existsSync(runtimePath)?'All recorded runtime fields match source verbatim':'NOT TESTED yet',oldMailbox:'Absent from generated HTML/JS and Organization metadata updated'};
writeFileSync('docs/references/revision-4/services-regression.json',JSON.stringify({...result,cookieException:'Phase 4 approved body replaces generic contact block with Contact page link'},null,2)+'\n');console.log(result);
