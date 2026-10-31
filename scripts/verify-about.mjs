import {readFileSync,existsSync} from 'node:fs';
import assert from 'node:assert/strict';
for(const prefix of ['','/theme/light','/theme/dark']){
 const path=`${prefix}/about/`,html=readFileSync(`dist${path}index.html`,'utf8');
 const main=html.split('<main')[1].split('</main>')[0];
 assert.equal([...main.matchAll(/<h1\b/g)].length,1);
 const levels=[...main.matchAll(/<h([1-6])\b/g)].map(m=>+m[1]);assert.ok(levels.every((n,i)=>!i||n<=levels[i-1]+1));
 assert.doesNotMatch(main,/<astro-island|<form\b|<iframe\b|<img\b|Page content pending/);
 for(const text of ['Kanjay','2014','2018','globally','across India','Trust','Quality','Support','mutually agreed','hr@kanjayconsulting.com'])assert.ok(main.includes(text),text);
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(ids.length,new Set(ids).size);
 for(const [,href] of html.matchAll(/href="([/#][^"]*)"/g)){
  const [url,hash]=href.split('#'),file=url?`dist${url.endsWith('/')?url+'index.html':url}`:`dist${path}index.html`;
  assert.ok(existsSync(file),href);if(hash)assert.ok(readFileSync(file,'utf8').includes(`id="${hash}"`),href);
 }
 assert.ok(html.includes(`href="${path}" aria-current="page"`));
 console.log(`PASS ${path}: facts, semantic headings, link/fragment targets, current-page state and complete static content`);
}
