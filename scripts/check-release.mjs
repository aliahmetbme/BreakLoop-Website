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
 const require=createRequire(import.meta.url);
 const {releaseIssues,assertPublicationBuild,verifiedHttps,vercelOrigin,verifiedPublicationDate,formatPublicationDate,resolveLegalText,publicCopyIssues,publicationEnabled,deploymentPreviewOrigin,isProductionEnvironment}=require(path.join(temp,'release.js'));
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
 const env={NETLIFY:'true',CONTEXT:'production',NEXT_PUBLIC_SITE_URL:'https://verified.tld',LEGAL_PUBLICATION_DATE:'2026-10-30'};
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
 const fixture={documents:fixtureDocs};
 assert.deepEqual(releaseIssues(env),[],'actual Coming Soon documents pass technical checks without legal task-list approval');
 assert.equal(publicationEnabled({...env,SITE_PUBLICATION_APPROVED:'true'}),true);
 assert.deepEqual(releaseIssues(env,fixture),[]);
 assert.equal(publicationEnabled(env,fixture),false);
 assert.equal(publicationEnabled({...env,SITE_RELEASE_APPROVED:'true'},fixture),false,'legacy flag does not authorize publication');
 assert.equal(publicationEnabled({...env,SITE_PUBLICATION_APPROVED:'true'},fixture),true);
 for(const preview of [{NETLIFY:undefined,CONTEXT:undefined,VERCEL_ENV:'preview'},...['deploy-preview','branch-deploy','dev','unknown'].map(CONTEXT=>({NETLIFY:'true',CONTEXT})),{NETLIFY:'true',CONTEXT:undefined},{NETLIFY:'true',CONTEXT:'production',NETLIFY_PREVIEW_SERVER:'true'}]) {
  const e={...env,...preview,SITE_PUBLICATION_APPROVED:'true'};
  assert.equal(publicationEnabled(e,fixture),false);
  assert.doesNotThrow(()=>assertPublicationBuild(e));
 }
 assert.throws(()=>assertPublicationBuild({...env,VERCEL_ENV:'production'}),/explicitly true/);
 assert.doesNotThrow(()=>assertPublicationBuild({...env,SITE_PUBLICATION_APPROVED:'true'}));
 for(const bad of [{NEXT_PUBLIC_SITE_URL:'http://localhost:3000'},{NEXT_PUBLIC_SITE_URL:''},{LEGAL_PUBLICATION_DATE:''},{LEGAL_PUBLICATION_DATE:'2026-02-30'}])assert.throws(()=>assertPublicationBuild({...env,...bad,SITE_PUBLICATION_APPROVED:'true'}),/Publication blocked/);
 assert.doesNotThrow(()=>assertPublicationBuild({...env,VERCEL_ENV:'production',SITE_PUBLICATION_APPROVED:'true'},fixture));
 assert.equal(publicationEnabled({...env,NETLIFY:undefined,CONTEXT:undefined,SITE_PUBLICATION_APPROVED:'true'}),false,'local build cannot become indexable by approval alone');
 assert.equal(isProductionEnvironment({...env,VERCEL_ENV:'preview'}),true,'Netlify context takes precedence');
 assert.equal(deploymentPreviewOrigin({NETLIFY:'true',CONTEXT:'deploy-preview',DEPLOY_PRIME_URL:'https://deploy-preview-2--check.netlify.app',DEPLOY_URL:'https://unique--check.netlify.app',VERCEL_URL:'old.vercel.app'}),'https://deploy-preview-2--check.netlify.app');
 assert.equal(deploymentPreviewOrigin({NETLIFY:'true',DEPLOY_PRIME_URL:'http://localhost:3000',DEPLOY_URL:'https://unique--check.netlify.app'}),'https://unique--check.netlify.app');
 assert.equal(deploymentPreviewOrigin({NETLIFY:'true',URL:'https://production.netlify.app',VERCEL_URL:'old.vercel.app'}),undefined,'never substitute main URL or old host for missing preview URL');
 for(const text of ['[MISSING_FIELD_2]','See http://127.0.0.1:3000/tr/privacy','See http://localhost:3000','Draft policy']) {
  assert.throws(()=>assertPublicationBuild({...env,SITE_PUBLICATION_APPROVED:'true'},{documents:{'tr/privacy':text}}),/Publication blocked/);
 }
 assert.ok(releaseIssues(env,{...fixture,marketing:{nested:{label:'Local website preview'}}}).some(v=>v.includes('content.nested.label')));
 assert.ok(releaseIssues(env,{...fixture,marketing:{link:'http://localhost:3000'}}).some(v=>v.includes('Local URL')));
 assert.ok(releaseIssues(env,{...fixture,legalLabels:{label:'[MISSING_FIELD_2]'}}).some(v=>v.includes('Unresolved technical field')));
 for(const context of ['deploy-preview','branch-deploy']) {
  const meta=pageMetadata('en','privacy',{indexable:false,previewUrl:deploymentPreviewOrigin({NETLIFY:'true',CONTEXT:context,DEPLOY_PRIME_URL:`https://${context}--check.netlify.app`})});
  assert.deepEqual(meta.robots,{index:false,follow:false});
  assert.equal(meta.alternates,undefined);
  assert.equal(meta.openGraph.images[0].url,`https://${context}--check.netlify.app/en/og`);
  assert.equal(meta.twitter.images[0].url,`https://${context}--check.netlify.app/en/og`);
 }
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
 console.log('PASS publication blocks missing fields, unsafe URLs and unrevised drafts; legal follow-ups do not block technical publication');
} finally {fs.rmSync(temp,{recursive:true,force:true});}
