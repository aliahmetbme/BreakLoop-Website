import assert from 'node:assert/strict';
import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
import ts from 'typescript';
const baseline='b144c2eceb760dbfd76fd411cf98c876aa5ce495';
const original=path=>execFileSync('git',['show',`${baseline}:${path}`],{encoding:'utf8'});
const exportsOf=source=>{const m={exports:{}};new Function('exports','module',ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText)(m.exports,m);return m.exports;};
const css=fs.readFileSync('app/globals.css','utf8');assert.ok(css.startsWith(original('app/globals.css')),'all existing CSS must remain unchanged');
const legalDocs=exportsOf(fs.readFileSync('lib/legal-documents.ts','utf8')).legalDocuments;
assert.deepEqual(Object.keys(legalDocs).sort(),['en/privacy','en/terms','tr/kvkk','tr/privacy','tr/terms'],'all 5 legal documents must be present');
for(const [key,doc] of Object.entries(legalDocs)){
 assert.ok(!/aliahmet44@icloud\.com|breakloopSupport@icloud\.com/i.test(doc),`no hardcoded email in ${key}`);
 if(key.endsWith('/terms'))assert.ok(doc.includes('https://www.apple.com/legal/internet-services/itunes/dev/stdeula/'),`Apple Standard EULA in ${key}`);
 else assert.ok(/\[[^\]]+\](?!\()/.test(doc),`draft placeholders preserved in ${key}`);
}
const baselineAssets=execFileSync('git',['ls-tree','-r','--name-only',baseline,'public/images','app/icon.png','app/apple-icon.png'],{encoding:'utf8'}).trim().split('\n').filter(Boolean);
for(const asset of baselineAssets)assert.ok(fs.readFileSync(asset).equals(execFileSync('git',['show',`${baseline}:${asset}`])),`existing asset must not change: ${asset}`);
assert.equal(execFileSync('git',['diff',baseline,'--','components/controls.tsx'],{encoding:'utf8'}),'','navigation/theme controls must not change');
const oldLegal=exportsOf(original('lib/legal-copy.ts')).legalCopy;
const newLegal=exportsOf(fs.readFileSync('lib/legal-copy.ts','utf8')).previewLegalCopy;
assert.deepEqual(newLegal,oldLegal,'preview legal/support labels preserve the approved baseline');
console.log('PASS all baseline CSS, assets, controls, legal documents and preview legal/support labels preserved');
