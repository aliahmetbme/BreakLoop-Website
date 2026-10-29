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
 const require=createRequire(import.meta.url);const {releaseIssues,verifiedHttps,supportEmail,resolveLegalText,publicCopyIssues,publicationEnabled}=require(path.join(temp,'release.js'));
 assert.ok(releaseIssues({}).length>10,'missing prerequisites must block publication');
 for(const url of ['http://verified.tld','https://localhost','https://site.example','https://127.0.0.1','https://user:pass@site.tld','https://site.tld/path','not a url'])assert.equal(verifiedHttps(url),undefined,url);
 assert.equal(verifiedHttps('https://verified.tld/'),'https://verified.tld');
 assert.equal(supportEmail('a@b.tld\nBcc:test@x.tld'),undefined);
 assert.equal(resolveLegalText('[VERIFIED_SUPPORT_EMAIL]',{NEXT_PUBLIC_SUPPORT_EMAIL:'support@verified.tld'}),'support@verified.tld');
 const env=Object.fromEntries(['DOMAIN_OWNERSHIP_VERIFIED','SUPPORT_EMAIL_MONITORED','FINAL_PRIVACY_INVENTORY_APPROVED','LEGAL_COPY_APPROVED','KVKK_LEGAL_REVIEW_APPROVED','IOS_RELEASE_AUDIT_APPROVED','MARKETING_COPY_APPROVED'].map(k=>[k,'true']));
 Object.assign(env,{NEXT_PUBLIC_SITE_URL:'https://verified.tld',NEXT_PUBLIC_SUPPORT_EMAIL:'support@verified.tld'});
 for(const key of ['NEXT_PUBLIC_OPERATOR','LEGAL_EMAIL_PROVIDER','LEGAL_SUPPORT_RETENTION','LEGAL_HOSTING_PROVIDER','LEGAL_HOSTING_RETENTION','LEGAL_HOSTING_PROCESSING','LEGAL_EMAIL_PROCESSING','LEGAL_OPERATOR_ADDRESS','LEGAL_PUBLICATION_DATE','LEGAL_RIGHTS_PROCESS','LEGAL_RIGHTS_CHANNEL','LEGAL_KVKK_LOCAL_BASIS','LEGAL_KVKK_SUPPORT_BASIS','LEGAL_KVKK_HOSTING_BASIS'])env[key]='Test-only verified value';
 const issues=releaseIssues(env);assert.ok(issues.some(v=>v.includes('Draft/review language')),'approvals alone must not publish draft copy');
 assert.ok(!issues.some(v=>v.includes('Unresolved legal fields')),'known legal values must resolve all placeholders');
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
 assert.equal(publicationEnabled({...env,SITE_RELEASE_APPROVED:'true'},{documents:fixtureDocs}),true);
 assert.equal(publicationEnabled({...env,SITE_RELEASE_APPROVED:'true',VERCEL_ENV:'preview'},{documents:fixtureDocs}),false);
 assert.equal(publicationEnabled(env,{documents:fixtureDocs}),false);
 assert.equal(publicationEnabled({...env,SITE_RELEASE_APPROVED:'true'}),false);
 assert.deepEqual(releaseIssues(env,{documents:fixtureDocs}),[],'isolated completed fixture may pass; actual documents are never replaced');
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
