import assert from 'node:assert/strict';
import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
import ts from 'typescript';
const baseline='b144c2eceb760dbfd76fd411cf98c876aa5ce495';
const original=path=>execFileSync('git',['show',`${baseline}:${path}`],{encoding:'utf8'});
const exportsOf=source=>{const m={exports:{}};new Function('exports','module',ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText)(m.exports,m);return m.exports;};
const css=fs.readFileSync('app/globals.css','utf8');
assert.ok(css.startsWith(execFileSync('git',['show','8e0d097:app/globals.css'],{encoding:'utf8'})),'approved CSS must remain intact; scoped responsive corrections may be appended');assert.ok(css.startsWith(original('app/globals.css')),'all existing CSS must remain unchanged');
const legalDocs=exportsOf(fs.readFileSync('lib/legal-documents.ts','utf8')).legalDocuments;
assert.deepEqual(Object.keys(legalDocs).sort(),['en/privacy','en/terms','tr/kvkk','tr/privacy','tr/terms'],'all 5 legal documents must be present');
for(const [key,doc] of Object.entries(legalDocs)){
 assert.ok(!/aliahmet44@icloud\.com/i.test(doc),`never expose personal email in ${key}`);
 assert.ok(doc.includes('Ali Ahmet Erdoğdu'),`developer identity in ${key}`);
 assert.ok(doc.includes('breakloopSupport@icloud.com'),`official support contact in ${key}`);
 if(key.endsWith('/terms'))assert.ok(doc.includes('https://www.apple.com/legal/internet-services/itunes/dev/stdeula/'),`Apple Standard EULA in ${key}`);
 else assert.ok(/\[[^\]]+\](?!\()/.test(doc),`remaining verification placeholders preserved in ${key}`);
}
const baselineAssets=execFileSync('git',['ls-tree','-r','--name-only',baseline,'public/images','app/icon.png','app/apple-icon.png'],{encoding:'utf8'}).trim().split('\n').filter(Boolean);
for(const asset of baselineAssets)assert.ok(fs.readFileSync(asset).equals(execFileSync('git',['show',`${baseline}:${asset}`])),`existing asset must not change: ${asset}`);
const controls=fs.readFileSync('components/controls.tsx','utf8');
const oldControls=original('components/controls.tsx');
assert.equal(controls.slice(controls.indexOf(' return <>')),oldControls.slice(oldControls.indexOf(' return <>')),'navigation/theme control markup must not change');
const oldLegal=exportsOf(original('lib/legal-copy.ts')).legalCopy;
const newLegal=exportsOf(fs.readFileSync('lib/legal-copy.ts','utf8')).previewLegalCopy;
assert.deepEqual(newLegal,oldLegal,'preview legal/support labels preserve the approved baseline');
console.log('PASS approved baseline CSS, assets, controls, legal document structure and preview labels preserved; scoped responsive additions allowed');
