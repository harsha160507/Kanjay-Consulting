import assert from 'node:assert/strict';
import { readFileSync, writeFileSync } from 'node:fs';
import { transpileModule, ModuleKind, ScriptTarget } from 'typescript';

const directory = 'docs/references/revision-4';
const baseline = JSON.parse(readFileSync('docs/references/revision-1/content-baseline.json', 'utf8'));
const clean = html => html.split('<main')[1].split('</main>')[0]
  .replace(/^[^>]*>/, '')
  .replace(/<(p|span) class="section-label"[^>]*>[\s\S]*?<\/\1>/g, '')
  .replace(/<a class="home-text-link" href="[^"]*\/clients\/">[\s\S]*?<\/a>/g, '')
  .replace(/<figcaption>SILQ<\/figcaption>/g, '')
  .replace(/<span class="client-industry">[\s\S]*?<\/span>/g, '')
  .replace(/<h2 id="neutral-clients-title">Clients<\/h2>/g, '')
  .replace(/<nav class="stepper__header"[\s\S]*?<\/nav>/g, '')
  .replace(/<div class="stepper__footer"[\s\S]*?<\/div>/g, '')
  .replace(/<h3 id="(?:hr|gem)-working-activities-title">[\s\S]*?<\/h3>/g, '')
  .replace(/<(script|style)\b[\s\S]*?<\/\1>/g, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
for (const [route, text] of Object.entries(baseline)) {
  const html = readFileSync(`dist/${route}`, 'utf8');
  if(!route.includes('cookie-policy/'))assert.equal(clean(html), text.replaceAll('info@kanjayconsulting.com','enquiry@kanjayconsulting.com').replace(/astro-island,astro-slot,astro-static-slot\{display:contents\}/g, '').replace(/\s+/g, ' ').trim(), `${route}: preserve all non-eyebrow main text except explicit Phase 4 labels/captions`);
  assert.doesNotMatch(html, /class="eyebrow"|\d{2} \/|Kanjay Consulting \/ (?:Our services|Clients|Contact us|Website policies)/);
  assert.doesNotMatch(html.split('<main')[1].split('</main>')[0], /visibility:\s*hidden|opacity:\s*0(?:;|")/);
  for (const [,href] of html.matchAll(/href="([^"]+)"/g)) {
    if (!href.startsWith('/') && !href.startsWith('#')) continue;
    const [path,hash] = href.split('#');
    if (!hash) continue;
    const destination = path ? `dist${path.endsWith('/') ? path+'index.html' : path}` : `dist/${route}`;
    assert.ok(readFileSync(destination, 'utf8').includes(`id="${hash}"`), `${route}: anchor ${href}`);
  }
}

// Controlled unit execution of the actual shipped enhancement, separate from browser/OS checks.
const js = transpileModule(readFileSync('src/lib/fade-content.ts', 'utf8'), {
  compilerOptions: { module: ModuleKind.ESNext, target: ScriptTarget.ES2022 }
}).outputText;
const { enhanceFadeContent } = await import(`data:text/javascript;base64,${Buffer.from(js).toString('base64')}`);
function fixture({ reduced=false, missing=false, fail=false, focused=false }={}) {
  const state = { animations:[], cancelled:0, observed:new Set(), listeners:{} };
  class Node {}
  class Element extends Node {
    contains(node) { return node === this; }
    animate(frames, options) {
      if (fail) throw Error('unavailable animation');
      state.animations.push({frames,options});
      return { finished:new Promise(()=>{}),cancel(){state.cancelled++;} };
    }
  }
  const section=new Element();
  const preference={matches:reduced,addEventListener(_type,cb){state.motion=cb;}};
  class Observer {
    constructor(cb,options){state.callback=cb;state.observerOptions=options;}
    observe(node){state.observed.add(node);}
    unobserve(node){state.observed.delete(node);}
    disconnect(){state.observed.clear();}
  }
  const doc={activeElement:focused?section:null,querySelectorAll(){return[section];},addEventListener(type,cb){state.listeners[type]=cb;}};
  const view={Node,Element,IntersectionObserver:missing?undefined:Observer,matchMedia(){return preference;},addEventListener(){}};
  state.enter=()=>{if(state.observed.has(section))state.callback([{target:section,isIntersecting:true}]);};
  enhanceFadeContent(doc,view);
  return {state,section,preference};
}
const normal=fixture();normal.state.enter();normal.state.enter();
assert.equal(normal.state.animations.length,1,'one animation per section');
assert.deepEqual(normal.state.animations[0].options,{duration:320,easing:'ease-out',fill:'none'});
assert.deepEqual(normal.state.animations[0].frames,[{opacity:.5,transform:'translateY(8px)'},{opacity:1,transform:'none'}]);
assert.equal(normal.state.observerOptions.threshold,0,'long sections enter without needing 10% visibility');
normal.state.listeners.focusin({target:normal.section});assert.equal(normal.state.cancelled,1,'focused content cancels movement');
const motion=fixture();motion.state.enter();motion.preference.matches=true;motion.state.motion();
assert.equal(motion.state.cancelled,1,'motion preference change cancels in-flight effect');assert.equal(motion.state.observed.size,0);
for(const options of [{reduced:true},{missing:true},{fail:true},{focused:true}]){
  const test=fixture(options);test.state.enter();assert.equal(test.state.animations.length,0,JSON.stringify(options));
}
const results={status:'PASS',routesCompared:Object.keys(baseline).filter(r=>!r.includes('cookie-policy/')).length,cookieVariants:'Three intentionally replaced bodies checked verbatim by verify-revision4.mjs',content:'Exact normalized main text match excluding approved contextual/framework changes, new client captions/neutral heading and Stepper browsing labels; baseline aac26c9 with approved email replacement',anchors:'All generated fragment destinations exist',fadeUnitChecks:['once','320ms/8px/whole section','no persistent fill','long-section entry','focus cancellation','initial focus skipped','reduced-motion initial skip','reduced-motion change cancellation/disconnect','missing API','animation failure'],limitations:'Controlled unit fixtures do not emulate OS settings or replace actual browser, screen-reader or physical-touch testing.'};
writeFileSync(`${directory}/foundation-regression.json`,JSON.stringify(results,null,2)+'\n');
console.log(JSON.stringify(results,null,2));
