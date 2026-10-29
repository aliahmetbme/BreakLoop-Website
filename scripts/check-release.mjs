import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';
import ts from 'typescript';
const temp=fs.mkdtempSync(path.join(os.tmpdir(),'breakloop-release-check-'));
try {
 for(const name of ['legal-documents','release']){
 const source=fs.readFileSync(`lib/${name}.ts`,'utf8');
 fs.writeFileSync(path.join(temp,`${name}.js`),ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText);
 }
 const require=createRequire(import.meta.url);const {releaseIssues,verifiedHttps,supportEmail,resolveLegalText}=require(path.join(temp,'release.js'));
 assert.ok(releaseIssues({}).length>10,'missing prerequisites must block publication');
 for(const url of ['http://verified.tld','https://localhost','https://site.example','https://127.0.0.1','https://user:pass@site.tld','https://site.tld/path','not a url'])assert.equal(verifiedHttps(url),undefined,url);
 assert.equal(verifiedHttps('https://verified.tld/'),'https://verified.tld');
 assert.equal(supportEmail('a@b.tld\nBcc:test@x.tld'),undefined);
 assert.equal(resolveLegalText('[VERIFIED_SUPPORT_EMAIL]',{NEXT_PUBLIC_SUPPORT_EMAIL:'support@verified.tld'}),'support@verified.tld');
 const env=Object.fromEntries(['DOMAIN_OWNERSHIP_VERIFIED','SUPPORT_EMAIL_MONITORED','FINAL_PRIVACY_INVENTORY_APPROVED','LEGAL_COPY_APPROVED','KVKK_LEGAL_REVIEW_APPROVED','IOS_RELEASE_AUDIT_APPROVED'].map(k=>[k,'true']));
 Object.assign(env,{NEXT_PUBLIC_SITE_URL:'https://verified.tld',NEXT_PUBLIC_SUPPORT_EMAIL:'support@verified.tld'});
 for(const key of ['NEXT_PUBLIC_OPERATOR','LEGAL_EMAIL_PROVIDER','LEGAL_SUPPORT_RETENTION','LEGAL_HOSTING_PROVIDER','LEGAL_HOSTING_RETENTION','LEGAL_HOSTING_PROCESSING','LEGAL_EMAIL_PROCESSING','LEGAL_OPERATOR_ADDRESS','LEGAL_PUBLICATION_DATE','LEGAL_RIGHTS_PROCESS','LEGAL_RIGHTS_CHANNEL','LEGAL_KVKK_LOCAL_BASIS','LEGAL_KVKK_SUPPORT_BASIS','LEGAL_KVKK_HOSTING_BASIS'])env[key]='Test-only verified value';
 const issues=releaseIssues(env);assert.ok(issues.some(v=>v.includes('Draft/review language')),'approvals alone must not publish draft copy');
 assert.ok(!issues.some(v=>v.includes('Unresolved legal fields')),'known legal values must resolve all placeholders');
 console.log('PASS publication blocks missing fields, unsafe URLs and unrevised drafts; legal fields resolve');
} finally {fs.rmSync(temp,{recursive:true,force:true});}
