import assert from 'node:assert/strict';
const origin=process.env.CHECK_ORIGIN||'http://127.0.0.1:3000';
const messages={
 en:{headline:'Focus when you choose.',focus:'01 / FOCUS MODE',life:'02 / LIFE MODE',soon:'Coming soon on iOS',fixed:'not a usage budget',budget:'Shared usage budget'},
 tr:{headline:'İstediğinde odaklan.',focus:'01 / ODAK MODU',life:'02 / YAŞAM MODU',soon:'Yakında iOS’ta',fixed:'sabit süreli bir oturumdur',budget:'Ortak kullanım süresi'},
};
for(const lang of ['en','tr'])for(const path of ['','/how-it-works','/focus-mode','/life-mode','/privacy','/support','/terms',...(lang==='tr'?['/kvkk']:[])]){
 const url=`/${lang}${path}`;const r=await fetch(origin+url);assert.equal(r.status,200,url);const html=await r.text();
 assert.ok(html.includes(`lang="${lang}"`),url+' language');
 assert.ok(html.includes('noindex, nofollow'),url+' noindex');
 assert.ok(!html.includes('rel="canonical"'),url+' no unverified canonical');
 assert.ok(html.includes('id="main"'),url+' main');
 assert.ok(html.includes('<title>BreakLoop — '),url+' brand-first title');
 assert.ok(html.includes('/icon.png'),url+' favicon');
 assert.ok(html.includes("<script>(function(){try{var t=localStorage.getItem('breakloop-theme')"),url+' pre-paint theme script');
 assert.ok(html.indexOf("<script>(function(){try{var t=localStorage.getItem('breakloop-theme')")<html.indexOf('</head>'),url+' theme script in head before body');
 assert.ok(html.includes('<meta name="twitter:card" content="summary_large_image"'),url+' twitter card');
 const shareTags=html.match(/<meta (?:property="og:[^"]+"|name="twitter:[^"]+")[^>]*>/g)||[];
 assert.ok(!shareTags.some(tag=>/localhost|127\.0\.0\.1/.test(tag)),url+' no local social URLs');
 if(lang==='en')assert.ok(!html.includes('href="/tr/kvkk"'),url+' no KVKK link in English');
 assert.ok(!/aliahmet44@icloud\.com/i.test(html),url+' never exposes personal iCloud address');
 if(['/privacy','/terms','/kvkk'].includes(path)){
  assert.ok(html.includes('legal-toc'),url+' legal contents');
  assert.ok(html.includes('class="draft"'),url+' actual draft warnings preserved');
  for(const match of html.matchAll(/<h2[^>]*>(.*?)<\/h2>/gs))assert.ok(match[1].replace(/<[^>]*>/g,'').length<200,url+' heading excludes body');
 }
 if(path==='/privacy'){
  assert.ok(html.includes(lang==='en'?'<h1>BreakLoop Privacy Policy</h1>':'<h1>BreakLoop Gizlilik Politikası</h1>'),url+' privacy title');
  assert.ok(html.includes('Ali Ahmet Erdoğdu'),url+' developer name');
  assert.ok(html.includes('mailto:breakloopSupport@icloud.com'),url+' support email link');
  assert.ok(html.includes('Netlify'),url+' Netlify hosting disclosure');
  assert.ok(html.includes('Apple iCloud Mail'),url+' Apple iCloud Mail support disclosure');
 }
 if(path==='/kvkk'){
  assert.ok(html.includes('<h1>BreakLoop Kişisel Verilerin İşlenmesine İlişkin Aydınlatma Metni</h1>'),url+' KVKK title');
  assert.ok(html.includes('Ali Ahmet Erdoğdu'),url+' KVKK controller name');
  assert.ok(html.includes('mailto:breakloopSupport@icloud.com'),url+' KVKK support email');
  assert.ok(html.includes('Web sitesi:'),url+' KVKK website access data');
  assert.ok(html.includes('Destek e-postaları:'),url+' KVKK support data');
 }
 if(path==='/terms'){
  assert.ok(html.includes(lang==='en'?'<h1>BreakLoop Terms &amp; License Information</h1>':'<h1>BreakLoop Kullanım ve Lisans Bilgileri</h1>'),url+' terms title');
  assert.ok(html.includes('https://www.apple.com/legal/internet-services/itunes/dev/stdeula/'),url+' Apple Standard EULA reference');
  assert.ok(html.includes('mailto:breakloopSupport@icloud.com'),url+' terms support email');
 }
 if(path==='/support'){
  assert.ok(html.includes(lang==='en'?'<h1>BreakLoop Support</h1>':'<h1>BreakLoop Destek</h1>'),url+' support title');
  assert.ok(html.includes('mailto:breakloopSupport@icloud.com'),url+' direct support mailto link');
  assert.ok(html.includes(lang==='en'?'Apps are not being restricted as expected':'Uygulamalar beklediğim gibi engellenmiyor'),url+' support section 1');
  assert.ok(html.includes(lang==='en'?'How does the shared usage budget work?':'Ortak kullanım süresi nasıl çalışır?'),url+' support section 2');
  assert.ok(html.includes(lang==='en'?'Can I share diagnostic information?':'Tanılama kayıtlarını paylaşabilir miyim?'),url+' support section 3');
  assert.ok(html.includes(`href="/${lang}/privacy"`),url+' privacy link on support page');
  assert.ok(html.includes(`href="/${lang}/terms"`),url+' terms link on support page');
  if(lang==='tr')assert.ok(html.includes('href="/tr/kvkk"'),url+' KVKK link on Turkish support page');
 }
 if(path==='/focus-mode'){
  const c=messages[lang];
  assert.ok(html.includes(c.focus),url+' focus eyebrow');
  assert.ok(html.includes(c.fixed),url+' fixed duration note');
  assert.ok(html.includes(`href="/${lang}/life-mode"`),url+' link to other mode');
  assert.ok(html.includes('breadcrumb'),url+' breadcrumb navigation');
  assert.ok(html.includes(`href="/${lang}"`),url+' breadcrumb home link');
 }
 if(path==='/life-mode'){
  const c=messages[lang];
  assert.ok(html.includes(c.life),url+' life eyebrow');
  assert.ok(html.includes(c.budget),url+' shared budget');
  assert.ok(html.includes('horizon-cooldown.png'),url+' cooldown preview image');
  assert.ok(html.includes(`href="/${lang}/focus-mode"`),url+' link to other mode');
  assert.ok(html.includes('breadcrumb'),url+' breadcrumb navigation');
  assert.ok(html.includes(`href="/${lang}"`),url+' breadcrumb home link');
 }
 if(path===''||path==='/how-it-works'){
  const c=messages[lang];
  assert.ok(html.includes(c.focus),`${url}: ${c.focus}`);
  assert.ok(html.includes(c.life),`${url}: ${c.life}`);
  assert.ok(html.includes(c.soon),`${url}: ${c.soon}`);
  for(const match of html.matchAll(/href="#([^"]+)"/g))assert.ok(html.includes(`id="${match[1]}"`),url+' valid anchor '+match[1]);
  assert.ok(!/href="https?:\/\/[^\"]*(?:apps\.apple\.com|testflight\.apple\.com)/.test(html),url+' no fake download');
  assert.ok(!/cure phone addiction|guaranteed productivity|100% unbreakable|world’s first shared/i.test(html),url+' no unsupported superlatives');
  if(path==='/how-it-works'){
   assert.ok(html.includes(`href="/${lang}/focus-mode"`),url+' link to focus mode');
   assert.ok(html.includes(`href="/${lang}/life-mode"`),url+' link to life mode');
   assert.ok(html.includes('breadcrumb'),url+' breadcrumb navigation');
   assert.ok(html.includes(`href="/${lang}"`),url+' breadcrumb home link');
  }
  if(path===''){
   assert.ok(html.includes(`<h1>${c.headline}<br/>`),url+' hero message');
   // Order assertion: scenarios first, mode-overview second
   assert.ok(html.indexOf('scenario-section')<html.indexOf('mode-overview'),url+' scenarios appear above mode overview');
   // Short FAQ assertion: exactly 3 questions
   assert.equal([...html.matchAll(/<details>/g)].length, 3, url+' exactly 3 FAQ items');
   for(const image of ['scenario-study-before-v2.webp','scenario-study-after-v2.webp','scenario-life-day-v2.webp','scenario-life-evening-v2.webp'])assert.ok(html.includes(`${image}&amp;w=3840&amp;q=90`),url+' scenario photo '+image+' q=90');
   assert.ok(html.includes(lang==='en'?'Illustrative scenes created with AI':'Yapay zekâyla oluşturulmuş temsilî sahnelerdir'),url+' honest scene provenance');
   assert.ok(html.includes('scenario-visual-pair'),url+' side-by-side time comparison');
   assert.ok(html.includes(lang==='en'?'You started studying. Then your phone pulled you away.':'Ders çalışmaya başladın. Sonra telefona daldın.'),url+' focus scenario headline');
   assert.ok(html.includes(lang==='en'?'You started studying':'Derse başladın'),url+' focus scenario first caption');
   assert.ok(html.includes(lang==='en'?'Then you got distracted':'Sonra telefona daldın'),url+' focus scenario second caption');
   assert.ok(html.includes(lang==='en'?'Hours later, you’re still scrolling.':'Saatler geçti, hâlâ oradasın.'),url+' time-passing caption');
   assert.ok(html.includes(`href="/${lang}/how-it-works"`),url+' hero primary informative CTA');
   assert.ok(html.includes('hero-status-badge'),url+' hero status badge');
   assert.ok(!html.includes('href="#coming-soon"'),url+' no misleading jump anchor on hero CTA');
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
