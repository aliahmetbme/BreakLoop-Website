import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';
import ts from 'typescript';
const temp=fs.mkdtempSync(path.join(os.tmpdir(),'breakloop-release-check-'));
try {
 for(const name of ['preview-copy','content','legal-copy','legal-documents','legal-review','release','seo']){
 const source=fs.readFileSync(`lib/${name}.ts`,'utf8');
 fs.writeFileSync(path.join(temp,`${name}.js`),ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText);
 }
 const require=createRequire(import.meta.url);
 const {releaseIssues,assertPublicationBuild,verifiedHttps,vercelOrigin,verifiedPublicationDate,formatPublicationDate,resolveLegalText,publicCopyIssues,publicationEnabled}=require(path.join(temp,'release.js'));
 const {legalDocuments}=require(path.join(temp,'legal-documents.js'));
 assert.ok(releaseIssues({}).length>0,'real missing prerequisites block publication');
 for(const url of ['http://verified.tld','https://localhost','https://site.example','https://127.0.0.1','https://user:pass@site.tld','https://site.tld/path','not a url'])assert.equal(verifiedHttps(url),undefined,url);
 assert.equal(verifiedHttps('https://verified.tld/'),'https://verified.tld');
 assert.equal(vercelOrigin('breakloop-preview.vercel.app'),'https://breakloop-preview.vercel.app');
 assert.equal(vercelOrigin('https://breakloop-preview.vercel.app/'),'https://breakloop-preview.vercel.app');
 assert.equal(vercelOrigin('localhost:3000'),undefined);
 for(const badDate of ['','2026-02-30','2025-02-29','2026-04-31','2026-13-01','2026-00-10','2026-10-00','30-10-2026','2026/10/30','2026-10-30T00:00:00Z','October 30, 2026','not-a-date']){
  assert.equal(verifiedPublicationDate(badDate),undefined,`invalid calendar date must be rejected: ${badDate}`);
  assert.equal(formatPublicationDate(badDate,'tr'),undefined);
  assert.equal(formatPublicationDate(badDate,'en'),undefined);
 }
 assert.equal(verifiedPublicationDate('2026-10-30'),'2026-10-30');
 assert.equal(verifiedPublicationDate('2024-02-29'),'2024-02-29');
 assert.equal(formatPublicationDate('2026-10-30','tr'),'30 Ekim 2026');
 assert.equal(formatPublicationDate('2026-10-30','en'),'October 30, 2026');
 for(const locale of ['tr','en']) {
  const text=resolveLegalText(legalDocuments[`${locale}/privacy`],locale,{LEGAL_PUBLICATION_DATE:'2026-10-30'});
  assert.ok(text.includes(locale==='tr'?'30 Ekim 2026':'October 30, 2026'));
  assert.ok(!resolveLegalText('[LEGAL_PUBLICATION_DATE]',locale,{}).includes('LEGAL_PUBLICATION_DATE'));
 }
 const env={NEXT_PUBLIC_SITE_URL:'https://verified.tld',LEGAL_PUBLICATION_DATE:'2026-10-30'};
 const {content,getContent}=require(path.join(temp,'content.js'));
 const {legalCopy}=require(path.join(temp,'legal-copy.js'));
 const {pageMetadata}=require(path.join(temp,'seo.js'));
 assert.deepEqual(publicCopyIssues(content),[]);
 assert.deepEqual(publicCopyIssues(legalCopy),[]);
 for(const locale of ['en','tr']){
  assert.notEqual(getContent(locale,false).privacyLink,getContent(locale,true).privacyLink);
  assert.notEqual(getContent(locale,false).rights,getContent(locale,true).rights);
 }
 const fixtureDocs=Object.fromEntries(['en/privacy','tr/privacy','en/terms','tr/terms','tr/kvkk'].map(key=>[key,'# Reviewed test fixture\nFinal test policy without unresolved fields.']));
 const fixture={documents:fixtureDocs,pendingLegalWork:[]};
 assert.ok(releaseIssues(env,{documents:fixtureDocs}).some(issue=>issue.includes('Pending legal work')),'clean visitor text cannot bypass outstanding actual legal work');
 assert.deepEqual(releaseIssues(env,fixture),[]);
 assert.equal(publicationEnabled(env,fixture),false);
 assert.equal(publicationEnabled({...env,SITE_RELEASE_APPROVED:'true'},fixture),false,'legacy flag does not authorize publication');
 assert.equal(publicationEnabled({...env,SITE_PUBLICATION_APPROVED:'true'},fixture),true);
 for(const preview of [{VERCEL_ENV:'preview'},{NETLIFY:'true',CONTEXT:'deploy-preview'}]) {
  const e={...env,...preview,SITE_PUBLICATION_APPROVED:'true'};
  assert.equal(publicationEnabled(e,fixture),false);
  assert.doesNotThrow(()=>assertPublicationBuild(e));
 }
 assert.throws(()=>assertPublicationBuild({...env,VERCEL_ENV:'production'}),/explicitly true/);
 assert.throws(()=>assertPublicationBuild({...env,SITE_PUBLICATION_APPROVED:'true'}),/Publication blocked/,'actual unresolved documents stay blocked');
 assert.doesNotThrow(()=>assertPublicationBuild({...env,VERCEL_ENV:'production',SITE_PUBLICATION_APPROVED:'true'},fixture));
 assert.ok(releaseIssues(env).some(issue=>issue.includes('KVKK_APPLICATION_CHANNEL')));
 assert.ok(releaseIssues(env).some(issue=>issue.includes('SUPPORT_RETENTION')));
 assert.ok(releaseIssues(env,{...fixture,marketing:{...content,nested:{label:'Local website preview'}}}).some(v=>v.includes('content.nested.label')));
 assert.ok(releaseIssues(env,{...fixture,legalLabels:{label:'Gizlilik taslağını incele'}}).some(v=>v.includes('legal-copy.label')));
 for(const locale of ['en','tr'])for(const route of ['','how-it-works','privacy','support','terms',...(locale==='tr'?['kvkk']:[])]){
  const meta=pageMetadata(locale,route,{url:'https://verified.tld',previewUrl:'https://breakloop-preview.vercel.app',indexable:true});
  assert.deepEqual(meta.robots,{index:true,follow:true});
  assert.equal(meta.alternates.canonical,`https://verified.tld/${locale}${route?'/'+route:''}`);
  if(route!=='kvkk')assert.equal(meta.alternates.languages.en,`/en${route?'/'+route:''}`);
  assert.equal(meta.alternates.languages.tr,`/tr${route?'/'+route:''}`);
  assert.equal(meta.openGraph.url,`https://verified.tld/${locale}${route?'/'+route:''}`);
  assert.equal(meta.openGraph.images[0].url,`https://verified.tld/${locale}/og`);
  assert.equal(meta.twitter.card,'summary_large_image');
  assert.equal(meta.twitter.images[0].url,`https://verified.tld/${locale}/og`);
  assert.deepEqual(publicCopyIssues(meta),[]);
  const vercelPreview=pageMetadata(locale,route,{url:'https://verified.tld',vercelUrl:'breakloop-preview.vercel.app',indexable:false});
  assert.equal(vercelPreview.alternates,undefined,'preview must never emit canonical URL');
  assert.equal(vercelPreview.openGraph.url,undefined,'preview must not emit canonical og:url');
  assert.deepEqual(vercelPreview.robots,{index:false,follow:false},'preview must remain noindex');
  assert.equal(vercelPreview.openGraph.images[0].url,`https://breakloop-preview.vercel.app/${locale}/og`,'preview OG image uses VERCEL_URL');
  assert.equal(vercelPreview.twitter.card,'summary_large_image');
  assert.equal(vercelPreview.twitter.images[0].url,`https://breakloop-preview.vercel.app/${locale}/og`,'preview Twitter image uses VERCEL_URL');
  const preview=pageMetadata(locale,route,{indexable:false});
  assert.equal(preview.alternates,undefined);
  assert.deepEqual(preview.robots,{index:false,follow:false});
  assert.equal(preview.openGraph.images,undefined);
  assert.equal(preview.twitter.images,undefined);
 }
 const kvkk=pageMetadata('tr','kvkk',{url:'https://verified.tld',indexable:true});
 assert.equal(kvkk.alternates.languages.en,undefined);
 console.log('PASS production-copy scan, negative contamination tests and isolated positive SEO/release fixtures');
 console.log('PASS publication blocks missing fields, unsafe URLs and unrevised drafts; unresolved actual legal fields remain blocked');
} finally {fs.rmSync(temp,{recursive:true,force:true});}
