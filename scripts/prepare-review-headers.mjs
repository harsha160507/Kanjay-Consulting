import {readFileSync,writeFileSync,readdirSync} from 'node:fs';
import {createHash} from 'node:crypto';
const hashes=new Set();
function walk(path){for(const e of readdirSync(path,{withFileTypes:true})){const file=`${path}/${e.name}`;if(e.isDirectory())walk(file);else if(file.endsWith('.html'))for(const [,attrs,body]of readFileSync(file,'utf8').matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g))if(!/\bsrc=|application\/ld\+json/.test(attrs)&&body)hashes.add(`'sha256-${createHash('sha256').update(body).digest('base64')}'`);}}
walk('dist');
const csp=`default-src 'self'; script-src 'self' ${[...hashes].sort().join(' ')}; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'none'`;
const headers=`/*\n  X-Robots-Tag: noindex, nofollow\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  X-Frame-Options: DENY\n  Permissions-Policy: camera=(), microphone=(), geolocation=()\n  Content-Security-Policy: ${csp}\n`;
writeFileSync('dist/_headers',headers);
console.log(`Prepared review headers with ${hashes.size} inline-script hashes; production host verification remains required.`);
