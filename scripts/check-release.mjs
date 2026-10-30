import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';
import ts from 'typescript';
const temp=fs.mkdtempSync(path.join(os.tmpdir(),'breakloop-release-check-'));
try {
 for(const name of ['preview-copy','content','legal-copy','legal-documents','release','seo']){
 const source=fs.readFileSync(`lib/${name}.ts`,'utf8');
 fs.writeFileSync(path.join(temp,`${name}.js`),ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText);
 }
 const require=createRequire(import.meta.url);const {releaseIssues,websiteReleaseIssues,appStoreReleaseIssues,verifiedHttps,vercelOrigin,supportEmail,verifiedSupportEmail,verifiedPublicationDate,formatPublicationDate,resolveLegalText,publicCopyIssues,publicationEnabled}=require(path.join(temp,'release.js'));
 const {legalDocuments}=require(path.join(temp,'legal-documents.js'));
 assert.ok(releaseIssues({}).length>10,'missing prerequisites must block publication');
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
 assert.ok(resolveLegalText(legalDocuments['tr/privacy'],{LEGAL_PUBLICATION_DATE:'2026-10-30'}).includes('**Son güncelleme:** 30 Ekim 2026'),'tr/privacy formatted date');
 assert.ok(resolveLegalText(legalDocuments['tr/kvkk'],{LEGAL_PUBLICATION_DATE:'2026-10-30'}).includes('**Son güncelleme:** 30 Ekim 2026'),'tr/kvkk formatted date');
 assert.ok(resolveLegalText(legalDocuments['en/privacy'],{LEGAL_PUBLICATION_DATE:'2026-10-30'}).includes('**Last updated:** October 30, 2026'),'en/privacy formatted date');
 assert.ok(resolveLegalText(legalDocuments['tr/privacy'],{}).includes('[DOĞRULANMIŞ_YAYIN_TARİHİ]'),'preview without date preserves placeholder');
 assert.ok(resolveLegalText(legalDocuments['en/privacy'],{LEGAL_PUBLICATION_DATE:'2026-02-30'}).includes('[VERIFIED_PUBLICATION_DATE]'),'invalid date preserves placeholder');
 assert.equal(supportEmail('a@b.tld\nBcc:test@x.tld'),undefined);
 assert.equal(supportEmail('aliahmet44@icloud.com'),undefined,'personal iCloud address must never be accepted as public support email');
 assert.equal(supportEmail('ALIAHMET44@ICLOUD.COM'),undefined,'case-insensitive personal email block');
 assert.equal(supportEmail('breakloopSupport@icloud.com'),'breakloopSupport@icloud.com');
 assert.equal(verifiedSupportEmail({NEXT_PUBLIC_SUPPORT_EMAIL:'breakloopSupport@icloud.com',SUPPORT_EMAIL_MONITORED:'false'}),undefined,'unmonitored alias must not become active');
 assert.equal(verifiedSupportEmail({NEXT_PUBLIC_SUPPORT_EMAIL:'breakloopSupport@icloud.com'}),undefined,'missing monitored flag must not become active');
 assert.equal(verifiedSupportEmail({NEXT_PUBLIC_SUPPORT_EMAIL:'breakloopSupport@icloud.com',SUPPORT_EMAIL_MONITORED:'true'}),'breakloopSupport@icloud.com');
 assert.equal(verifiedSupportEmail({NEXT_PUBLIC_SUPPORT_EMAIL:'aliahmet44@icloud.com',SUPPORT_EMAIL_MONITORED:'true'}),undefined,'personal email blocked even if monitored flag is true');
 assert.equal(resolveLegalText('[VERIFIED_SUPPORT_EMAIL]',{NEXT_PUBLIC_SUPPORT_EMAIL:'breakloopSupport@icloud.com'}),'[VERIFIED_SUPPORT_EMAIL]','support email in legal text must stay unresolved unless SUPPORT_EMAIL_MONITORED===true');
 assert.equal(resolveLegalText('[VERIFIED_SUPPORT_EMAIL]',{NEXT_PUBLIC_SUPPORT_EMAIL:'breakloopSupport@icloud.com',SUPPORT_EMAIL_MONITORED:'false'}),'[VERIFIED_SUPPORT_EMAIL]');
 assert.equal(resolveLegalText('[VERIFIED_SUPPORT_EMAIL]',{NEXT_PUBLIC_SUPPORT_EMAIL:'breakloopSupport@icloud.com',SUPPORT_EMAIL_MONITORED:'true'}),'breakloopSupport@icloud.com');
 assert.equal(resolveLegalText('[DOĞRULANMIŞ_AKTARIM_DAYANAĞI] / [HOSTING_PROCESSING]',{LEGAL_KVKK_TRANSFER_BASIS:'KVKK m.9 basis',LEGAL_HOSTING_PROCESSING:'Global Edge'}),'KVKK m.9 basis / Global Edge','KVKK transfer basis and hosting region must be mapped independently');
 const env=Object.fromEntries(['DOMAIN_OWNERSHIP_VERIFIED','SUPPORT_EMAIL_MONITORED','LEGAL_COPY_APPROVED','KVKK_LEGAL_REVIEW_APPROVED','MARKETING_COPY_APPROVED'].map(k=>[k,'true']));
 Object.assign(env,{NEXT_PUBLIC_SITE_URL:'https://verified.tld',NEXT_PUBLIC_SUPPORT_EMAIL:'breakloopSupport@icloud.com',NEXT_PUBLIC_OPERATOR:'Ali Ahmet Erdoğdu',LEGAL_PUBLICATION_DATE:'2026-10-30',IOS_RELEASE_AUDIT_APPROVED:'false',FINAL_PRIVACY_INVENTORY_APPROVED:'false'});
 for(const key of ['LEGAL_OPERATOR_ADDRESS','LEGAL_SUPPORT_RETENTION','LEGAL_KVKK_HOSTING_BASIS','LEGAL_KVKK_SUPPORT_BASIS','LEGAL_KVKK_TRANSFER_BASIS'])env[key]='Test-only verified value';
 const issues=releaseIssues(env);assert.ok(issues.some(v=>v.includes('Draft/review language')),'approvals alone must not publish draft copy');
 assert.ok(!issues.some(v=>v.includes('Unresolved legal fields')),'known legal values must resolve all placeholders');
 assert.ok(websiteReleaseIssues({...env,LEGAL_PUBLICATION_DATE:''}).includes('LEGAL_PUBLICATION_DATE'),'missing publication date must block release');
 assert.ok(websiteReleaseIssues({...env,LEGAL_PUBLICATION_DATE:'2026-02-30'}).includes('LEGAL_PUBLICATION_DATE'),'impossible calendar date must block release');
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
 assert.deepEqual(websiteReleaseIssues(env,{documents:fixtureDocs}),[],'website publication readiness passes without iOS App Store release gates');
 assert.equal(publicationEnabled({...env,SITE_RELEASE_APPROVED:'true'},{documents:fixtureDocs}),true,'promotional website can publish before App Store release once website gates pass');
 assert.equal(publicationEnabled({...env,SITE_RELEASE_APPROVED:'true',VERCEL_ENV:'preview'},{documents:fixtureDocs}),false);
 assert.equal(publicationEnabled(env,{documents:fixtureDocs}),false);
 assert.equal(publicationEnabled({...env,SITE_RELEASE_APPROVED:'true'}),false);
 assert.deepEqual(releaseIssues(env,{documents:fixtureDocs}),[],'isolated completed fixture may pass; actual documents are never replaced');
 assert.ok(appStoreReleaseIssues(env,{documents:fixtureDocs}).includes('IOS_RELEASE_AUDIT_APPROVED'),'App Store readiness remains separately gated');
 const appStoreEnv={...env,IOS_RELEASE_AUDIT_APPROVED:'true',FINAL_PRIVACY_INVENTORY_APPROVED:'true',FAMILY_CONTROLS_ENTITLEMENT_VERIFIED:'true',APP_STORE_PRIVACY_ANSWERS_VERIFIED:'true',IOS_DEVICE_QA_APPROVED:'true',NATIVE_LEGAL_LINKS_VERIFIED:'true'};
 assert.deepEqual(appStoreReleaseIssues(appStoreEnv,{documents:fixtureDocs}),[],'App Store readiness passes only when all iOS release gates are verified');
 assert.ok(releaseIssues(env).length>0,'real legal publication remains blocked');
 assert.ok(releaseIssues(env,{documents:fixtureDocs,marketing:{...content,nested:{label:'Local website preview'}}}).some(v=>v.includes('content.nested.label')));
 assert.ok(releaseIssues(env,{documents:fixtureDocs,legalLabels:{label:'Gizlilik taslağını incele'}}).some(v=>v.includes('legal-copy.label')));
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
  assert.equal(preview.openGraph.images[0].url,`/${locale}/og`);
  assert.equal(preview.twitter.images[0].url,`/${locale}/og`);
 }
 const kvkk=pageMetadata('tr','kvkk',{url:'https://verified.tld',indexable:true});
 assert.equal(kvkk.alternates.languages.en,undefined);
 console.log('PASS production-copy scan, negative contamination tests and isolated positive SEO/release fixtures');
 console.log('PASS publication blocks missing fields, unsafe URLs and unrevised drafts; legal fields resolve');
} finally {fs.rmSync(temp,{recursive:true,force:true});}
