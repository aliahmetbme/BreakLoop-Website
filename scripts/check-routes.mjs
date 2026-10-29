import assert from 'node:assert/strict';
const origin=process.env.CHECK_ORIGIN||'http://127.0.0.1:3000';
for(const lang of ['en','tr']) for(const path of ['','/how-it-works','/privacy','/support','/terms',...(lang==='tr'?['/kvkk']:[])]) {
 const url=`/${lang}${path}`;const r=await fetch(origin+url);assert.equal(r.status,200,url);const html=await r.text();assert.ok(html.includes(`lang="${lang}"`),url+' language');assert.ok(html.includes('noindex, nofollow'),url+' noindex');assert.ok(!html.includes('rel="canonical"'),url+' no unverified canonical');assert.ok(html.includes('id="main"'),url+' main');assert.ok(html.includes('<title>BreakLoop — '),url+' brand-first title');assert.ok(html.includes('/icon.png'),url+' favicon');if(path==='/privacy'||path==='/terms'||path==='/kvkk'){assert.ok(html.includes('legal-toc'),url+' legal contents');for(const match of html.matchAll(/<h2[^>]*>(.*?)<\/h2>/gs))assert.ok(match[1].replace(/<[^>]*>/g,'').length<200,url+' heading must not include body paragraphs');}console.log('PASS',url);
}
const robots=await(await fetch(origin+'/robots.txt')).text();assert.ok(robots.includes('Disallow: /'));console.log('PASS robots disallow');
const sitemap=await(await fetch(origin+'/sitemap.xml')).text();assert.ok(!sitemap.includes('<url>'));console.log('PASS preview sitemap empty');
assert.equal((await fetch(origin+'/en/unknown')).status,404);assert.equal((await fetch(origin+'/fr')).status,404);console.log('PASS invalid routes 404');

for(const path of ['/icon.png','/apple-icon.png']){const r=await fetch(origin+path);assert.equal(r.status,200);assert.ok(r.headers.get('content-type')?.includes('image/png'));console.log('PASS',path);}

assert.equal((await fetch(origin+'/en/kvkk')).status,404);console.log('PASS Turkish-only KVKK: /en/kvkk returns 404');
