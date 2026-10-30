import assert from 'node:assert/strict';
import fs from 'node:fs';

const [mode, productionOrigin, previewOrigin] = process.argv.slice(2);
assert.ok(['production', 'preview', 'local'].includes(mode), 'mode: production | preview | local');
const production = mode === 'production';
const imageOrigin = production ? productionOrigin : mode === 'preview' ? previewOrigin : undefined;
const routes = [
 'en', 'en/how-it-works', 'en/focus-mode', 'en/life-mode', 'en/privacy', 'en/support', 'en/terms',
 'tr', 'tr/how-it-works', 'tr/focus-mode', 'tr/life-mode', 'tr/privacy', 'tr/support', 'tr/terms', 'tr/kvkk'
];
for (const route of routes) {
 const html = fs.readFileSync(`.next/server/app/${route}.html`, 'utf8');
 const locale = route.split('/')[0];
 assert.ok(html.includes(`lang="${locale}"`), route);
 assert.ok(html.includes(`content="${production ? 'index, follow' : 'noindex, nofollow'}"`), `${route}: robots`);
 assert.ok(!/<meta[^>]*(?:localhost|127\.0\.0\.1)/.test(html), `${route}: no local social URL`);
 assert.ok(!/KVKK_(?:APPLICATION|WEBSITE|SUPPORT|TRANSFER)|HOSTING_RETENTION_SCOPE|LEGAL_PUBLICATION_DATE/.test(html), `${route}: no technical tokens`);
 if (production) {
  assert.ok(html.includes(`rel="canonical" href="${productionOrigin}/${route}"`), `${route}: canonical`);
  assert.ok(html.includes(`hrefLang="tr" href="${productionOrigin}/tr${route.includes('/') ? '/' + route.split('/').slice(1).join('/') : ''}"`), `${route}: Turkish alternate`);
  if (route !== 'tr/kvkk') assert.ok(html.includes('hrefLang="en"'), `${route}: English alternate`);
  assert.ok(!html.includes('class="draft"'), `${route}: no preview banner`);
 } else assert.ok(!html.includes('rel="canonical"'), `${route}: no preview canonical`);
 if (imageOrigin) {
  assert.ok(html.includes(`property="og:image" content="${imageOrigin}/${locale}/og"`), `${route}: OG`);
  assert.ok(html.includes(`name="twitter:image" content="${imageOrigin}/${locale}/og"`), `${route}: Twitter`);
 } else assert.ok(!html.includes('property="og:image"'), `${route}: no invented public asset origin`);
 if (route.includes('privacy')) { assert.ok(html.includes('Netlify')); assert.ok(!html.includes('Vercel')); }
 if (route.startsWith('en')) assert.ok(!html.includes('href="/tr/kvkk"'), `${route}: KVKK only in Turkish`);
}
const robots = fs.readFileSync('.next/server/app/robots.txt.body', 'utf8');
const sitemap = fs.readFileSync('.next/server/app/sitemap.xml.body', 'utf8');
if (production) {
 assert.ok(robots.includes('Allow: /'));
 assert.ok(robots.includes(`Sitemap: ${productionOrigin}/sitemap.xml`));
 assert.equal((sitemap.match(/<url>/g) || []).length, 15);
 for (const route of routes) assert.ok(sitemap.includes(`<loc>${productionOrigin}/${route}</loc>`));
 assert.ok(!/localhost|127\.0\.0\.1/.test(sitemap));
} else {
 assert.ok(robots.includes('Disallow: /'));
 assert.ok(!sitemap.includes('<url>'));
}
console.log(`PASS actual ${mode} build: 15 EN/TR pages, robots, canonical/hreflang, sitemap, HTTPS OG/Twitter and Netlify disclosure`);
