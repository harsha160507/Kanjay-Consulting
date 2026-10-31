// Temporary owner preview only. Every asset request requires the same signed absolute expiry.
const encoder = new TextEncoder();
async function authorized(value, secret) {
  const [deadline, signature] = (value || '').split('.');
  const until = Number(deadline);
  if (!Number.isSafeInteger(until) || until <= Date.now() || !/^[a-f0-9]{64}$/.test(signature || '') || !secret) return false;
  const key = await crypto.subtle.importKey('raw', encoder.encode(secret), {name:'HMAC',hash:'SHA-256'}, false, ['verify']);
  return crypto.subtle.verify('HMAC',key,Uint8Array.from(signature.match(/../g),s=>parseInt(s,16)),encoder.encode(`kanjay-preview:${deadline}`));
}
function stopped(status = 410) {
  return new Response('<!doctype html><html lang="en"><meta charset="utf-8"><meta name="robots" content="noindex,nofollow"><meta name="viewport" content="width=device-width"><title>Preview unavailable</title><h1>This temporary preview is unavailable.</h1><p>Its access window has ended or the preview link is invalid.</p></html>',{status,headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'private, no-store','X-Robots-Tag':'noindex, nofollow','X-Content-Type-Options':'nosniff'}});
}
export default {
  async fetch(request, env) {
    if (!env.PREVIEW_SIGNING_KEY) return stopped(503);
    const url = new URL(request.url);
    const query = url.searchParams.has('preview_until');
    const cookie = (request.headers.get('Cookie') || '').split(';').map(s=>s.trim()).find(s=>s.startsWith('kanjay_preview='))?.slice('kanjay_preview='.length);
    const token = query ? `${url.searchParams.get('preview_until')}.${url.searchParams.get('preview_sig')}` : cookie;
    if (!await authorized(token, env.PREVIEW_SIGNING_KEY)) return stopped();
    const deadline = Number(token.split('.')[0]);
    const headers = new Headers({...siteHeaders,'Cache-Control':'private, no-store','CDN-Cache-Control':'no-store'});
    if (query) {
      url.searchParams.delete('preview_until');url.searchParams.delete('preview_sig');
      headers.set('Set-Cookie',`kanjay_preview=${token}; Path=/; Secure; HttpOnly; SameSite=Lax; Max-Age=${Math.max(0,Math.floor((deadline-Date.now())/1000))}`);
      headers.set('Location',url.pathname+url.search);
      return new Response(null,{status:303,headers});
    }
    if (!['GET','HEAD'].includes(request.method)) return new Response('Method not allowed',{status:405,headers});
    let path;
    try {path=decodeURIComponent(url.pathname);} catch {return new Response('Bad request',{status:400,headers});}
    if(path.split('/').some(s=>s==='..'||s.startsWith('.'))) return new Response('Forbidden',{status:403,headers});
    if(path.endsWith('/'))path+='index.html';
    if(!assets[path]&&assets[path+'/index.html'])path+='/index.html';
    const entry=assets[path]||assets['/404.html'];const status=assets[path]?200:404;
    let bytes=Uint8Array.from(atob(entry[1]),c=>c.charCodeAt(0));
    if(entry[0].startsWith('text/html')) {
      const note=`<aside style="padding:12px;background:#25364a;color:white;font:14px sans-serif">Temporary owner preview · expires ${new Date(deadline).toISOString()} · a temporary access cookie keeps this 30-minute window across pages.</aside>`;
      bytes=encoder.encode(new TextDecoder().decode(bytes).replace('<body>','<body>'+note));
    }
    headers.set('Content-Type',entry[0]);
    return new Response(request.method==='HEAD'?null:bytes,{status,headers});
  }
};
