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
 const require=createRequire(import.meta.url);const {releaseIssues,websiteReleaseIssues,appStoreReleaseIssues,verifiedHttps,supportEmail,verifiedSupportEmail,resolveLegalText,publicCopyIssues,publicationEnabled}=require(path.join(temp,'release.js'));
 assert.ok(releaseIssues({}).length>10,'missing prerequisites must block publication');
 for(const url of ['http://verified.tld','https://localhost','https://site.example','https://127.0.0.1','https://user:pass@site.tld','https://site.tld/path','not a url'])assert.equal(verifiedHttps(url),undefined,url);
 assert.equal(verifiedHttps('https://verified.tld/'),'https://verified.tld');
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
 assert.equal(resolveLegalText('[GERÇEK_ALICILAR] / [HOSTING_PROVIDER]',{LEGAL_KVKK_RECIPIENTS:'Vercel Inc., Apple iCloud Mail',LEGAL_HOSTING_PROVIDER:'Vercel Inc.'}),'Vercel Inc., Apple iCloud Mail / Vercel Inc.','recipient groups and hosting provider must be mapped independently');
 const env=Object.fromEntries(['DOMAIN_OWNERSHIP_VERIFIED','SUPPORT_EMAIL_MONITORED','WEBSITE_PRIVACY_APPROVED','LEGAL_COPY_APPROVED','KVKK_LEGAL_REVIEW_APPROVED','MARKETING_COPY_APPROVED'].map(k=>[k,'true']));
 Object.assign(env,{NEXT_PUBLIC_SITE_URL:'https://verified.tld',NEXT_PUBLIC_SUPPORT_EMAIL:'breakloopSupport@icloud.com',IOS_RELEASE_AUDIT_APPROVED:'false',FINAL_PRIVACY_INVENTORY_APPROVED:'false'});
 for(const key of ['NEXT_PUBLIC_OPERATOR','LEGAL_EMAIL_PROVIDER','LEGAL_SUPPORT_RETENTION','LEGAL_HOSTING_PROVIDER','LEGAL_HOSTING_RETENTION','LEGAL_HOSTING_PROCESSING','LEGAL_EMAIL_PROCESSING','LEGAL_OPERATOR_ADDRESS','LEGAL_PUBLICATION_DATE','LEGAL_RIGHTS_PROCESS','LEGAL_RIGHTS_CHANNEL','LEGAL_KVKK_SUPPORT_BASIS','LEGAL_KVKK_HOSTING_BASIS','LEGAL_KVKK_RECIPIENTS','LEGAL_KVKK_TRANSFER_BASIS'])env[key]='Test-only verified value';
 const issues=releaseIssues(env);assert.ok(issues.some(v=>v.includes('Draft/review language')),'approvals alone must not publish draft copy');
 assert.ok(!issues.some(v=>v.includes('Unresolved legal fields')),'known legal values must resolve all placeholders');
 assert.ok(websiteReleaseIssues({...env,WEBSITE_PRIVACY_APPROVED:'false',FINAL_PRIVACY_INVENTORY_APPROVED:'true'},{documents:{'en/privacy':'# Clean'}}).includes('WEBSITE_PRIVACY_APPROVED'),'website privacy approval must be independent from iOS App Store privacy approval');
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
 for(const locale of ['en','tr'])for(const route of ['','how-it-works']){
  const meta=pageMetadata(locale,route,{url:'https://verified.tld',indexable:true});
  assert.deepEqual(meta.robots,{index:true,follow:true});
  assert.equal(meta.alternates.canonical,`https://verified.tld/${locale}${route?'/'+route:''}`);
  assert.equal(meta.alternates.languages.en,`/en${route?'/'+route:''}`);
  assert.equal(meta.alternates.languages.tr,`/tr${route?'/'+route:''}`);
  assert.equal(meta.openGraph.images[0].url,`https://verified.tld/${locale}/og`);
  assert.deepEqual(publicCopyIssues(meta),[]);
  const preview=pageMetadata(locale,route,{indexable:false});
  assert.equal(preview.alternates,undefined);
  assert.deepEqual(preview.robots,{index:false,follow:false});
 }
 const kvkk=pageMetadata('tr','kvkk',{url:'https://verified.tld',indexable:true});
 assert.equal(kvkk.alternates.languages.en,undefined);
 console.log('PASS production-copy scan, negative contamination tests and isolated positive SEO/release fixtures');
 console.log('PASS publication blocks missing fields, unsafe URLs and unrevised drafts; legal fields resolve');
} finally {fs.rmSync(temp,{recursive:true,force:true});}
