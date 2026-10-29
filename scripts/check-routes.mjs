import assert from 'node:assert/strict';
const origin=process.env.CHECK_ORIGIN||'http://127.0.0.1:3000';
const messages={
 en:{headline:'Focus when you choose.',focus:'01 / FOCUS MODE',life:'02 / LIFE MODE',soon:'Coming soon on iOS',fixed:'not a usage budget',budget:'Shared usage budget'},
 tr:{headline:'İstediğinde odaklan.',focus:'01 / ODAK MODU',life:'02 / YAŞAM MODU',soon:'Yakında iOS’ta',fixed:'sabit süreli bir oturumdur',budget:'Ortak kullanım süresi'},
};
for(const lang of ['en','tr'])for(const path of ['','/how-it-works','/privacy','/support','/terms',...(lang==='tr'?['/kvkk']:[])]){
 const url=`/${lang}${path}`;const r=await fetch(origin+url);assert.equal(r.status,200,url);const html=await r.text();
 assert.ok(html.includes(`lang="${lang}"`),url+' language');
 assert.ok(html.includes('noindex, nofollow'),url+' noindex');
 assert.ok(!html.includes('rel="canonical"'),url+' no unverified canonical');
 assert.ok(html.includes('id="main"'),url+' main');
 assert.ok(html.includes('<title>BreakLoop — '),url+' brand-first title');
 assert.ok(html.includes('/icon.png'),url+' favicon');
 assert.ok(html.includes(`<meta property="og:image" content="${origin}/${lang}/og"`),url+' localized OG tag');
 if(['/privacy','/terms','/kvkk'].includes(path)){
  assert.ok(html.includes('legal-toc'),url+' legal contents');
  assert.ok(html.includes('class="draft"'),url+' actual draft warnings preserved');
  for(const match of html.matchAll(/<h2[^>]*>(.*?)<\/h2>/gs))assert.ok(match[1].replace(/<[^>]*>/g,'').length<200,url+' heading excludes body');
 }
 if(path===''||path==='/how-it-works'){
  const c=messages[lang];
  for(const text of [c.focus,c.life,c.fixed,c.budget,c.soon])assert.ok(html.includes(text),`${url}: ${text}`);
  for(const anchor of ['focus-mode','life-mode','coming-soon']){
   assert.equal([...html.matchAll(new RegExp(`id="${anchor}"`,'g'))].length,1,`${url}: unique ${anchor}`);
  }
  for(const match of html.matchAll(/href="#([^"]+)"/g))assert.ok(html.includes(`id="${match[1]}"`),url+' valid anchor '+match[1]);
  assert.ok(!/href="https?:\/\/[^\"]*(?:apps\.apple\.com|testflight\.apple\.com)/.test(html),url+' no fake download');
  assert.ok(!/cure phone addiction|guaranteed productivity|100% unbreakable|world’s first shared/i.test(html),url+' no unsupported superlatives');
  if(path==='/how-it-works')for(const image of ['preview-3.png','preview-1.png'])assert.ok(html.includes(image),url+' product preview '+image);
  if(path===''){
   assert.ok(html.includes(`<h1>${c.headline}<br/>`),url+' hero message');
   for(const image of ['scenario-study-before-v2.webp','scenario-study-after-v2.webp','scenario-life-day-v2.webp','scenario-life-evening-v2.webp'])assert.ok(html.includes(image),url+' scenario photo '+image);
   assert.ok(html.includes(lang==='en'?'Illustrative scenes created with AI':'Yapay zekâyla oluşturulmuş temsilî sahnelerdir'),url+' honest scene provenance');
   assert.ok(html.includes('scenario-visual-pair'),url+' side-by-side time comparison');
   assert.ok(html.includes(lang==='en'?'Forty minutes later, you’re still there.':'Kırk dakika geçti, hâlâ oradasın.'),url+' time-passing caption');
   assert.ok(new RegExp(`href="#coming-soon">${c.soon}`).test(html),url+' honest Coming Soon primary CTA');
   assert.ok(html.includes(`href="/${lang}/how-it-works"`),url+' localized secondary navigation');
   assert.ok(html.includes(lang==='en'?'Explore the privacy draft':'Gizlilik taslağını incele'),url+' preview privacy label preserved');
  }
 }
 console.log('PASS',url);
}
const robots=await(await fetch(origin+'/robots.txt')).text();assert.ok(robots.includes('Disallow: /'));console.log('PASS robots disallow');
const sitemap=await(await fetch(origin+'/sitemap.xml')).text();assert.ok(!sitemap.includes('<url>'));console.log('PASS preview sitemap empty');
for(const path of ['/en/unknown','/fr','/en/kvkk','/fr/og'])assert.equal((await fetch(origin+path)).status,404,path);
console.log('PASS invalid routes and English KVKK return 404');
for(const path of ['/icon.png','/apple-icon.png']){const r=await fetch(origin+path);assert.equal(r.status,200);assert.ok(r.headers.get('content-type')?.includes('image/png'));console.log('PASS',path);}
const images=[];
for(const lang of ['en','tr']){
 const r=await fetch(`${origin}/${lang}/og`);assert.equal(r.status,200);assert.ok(r.headers.get('content-type')?.includes('image/png'));
 const bytes=Buffer.from(await r.arrayBuffer());assert.equal(bytes.readUInt32BE(16),1200);assert.equal(bytes.readUInt32BE(20),630);images.push(bytes);
 console.log('PASS',`/${lang}/og`, '1200×630 PNG');
}
assert.ok(!images[0].equals(images[1]),'OG assets must differ by language');

for(const name of ['study-before','study-after','life-day','life-evening']){const r=await fetch(`${origin}/images/scenario-${name}-v2.webp`);assert.equal(r.status,200);assert.ok(r.headers.get('content-type')?.includes('image/webp'));console.log('PASS scenario image',name);}
