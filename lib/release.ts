import { legalDocuments } from './legal-documents';
import { content } from './content';
import { legalCopy } from './legal-copy';
import { pendingLegalWork } from './legal-review';

type Environment = Record<string, string | undefined>;
type ReleaseSources = { pendingLegalWork?: readonly string[]; documents?: Record<string,string>; marketing?: unknown; legalLabels?: unknown };

export function verifiedHttps(value: string | undefined) {
 if (!value) return undefined;
 try {
  const u=new URL(value);
  if(u.protocol!=='https:'||u.username||u.password||u.port||u.pathname!=='/'||u.search||u.hash||!u.hostname.includes('.')||u.hostname==='localhost'||/\.(example|test|invalid|localhost|local)$/.test(u.hostname)||/^\d+\.\d+\.\d+\.\d+$/.test(u.hostname)||u.hostname.includes(':'))return undefined;
  return u.origin;
 } catch { return undefined; }
}
export function vercelOrigin(value: string | undefined) {
 const raw=value?.trim();
 return raw?verifiedHttps(raw.includes('://')?raw:`https://${raw}`):undefined;
}
export function verifiedPublicationDate(value: string | undefined) {
 const raw=value?.trim();
 if(!raw||!/^\d{4}-\d{2}-\d{2}$/.test(raw))return undefined;
 const [year,month,day]=raw.split('-').map(Number);
 const date=new Date(Date.UTC(year,month-1,day,12));
 return year>=2000&&year<=2100&&date.getUTCFullYear()===year&&date.getUTCMonth()===month-1&&date.getUTCDate()===day?raw:undefined;
}
export function formatPublicationDate(value:string|undefined,locale:'en'|'tr') {
 const valid=verifiedPublicationDate(value);
 if(!valid)return undefined;
 return new Intl.DateTimeFormat(locale==='tr'?'tr-TR':'en-US',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'}).format(new Date(`${valid}T12:00:00Z`));
}
export function resolveLegalText(text:string,locale:'en'|'tr',env:Environment=process.env) {
 return text.replaceAll('[LEGAL_PUBLICATION_DATE]',formatPublicationDate(env.LEGAL_PUBLICATION_DATE,locale)||(locale==='tr'?'Belge tarihi henüz belirlenmedi.':'Document date not yet set.'));
}
export function publicCopyIssues(value:unknown,prefix='public copy'):string[] {
 if(typeof value==='string')return /\bdraft\b|tasla[kğ]|local (?:website )?preview|yerel (?:web sitesi )?önizleme|to be verified|doğrulanmayı bekliyor/i.test(value)?[`Draft wording: ${prefix}`]:[];
 return value&&typeof value==='object'?Object.entries(value).flatMap(([key,child])=>publicCopyIssues(child,`${prefix}.${key}`)):[];
}
/** Facts are checked automatically; legal/operational review is recorded in RELEASE-CHECKLIST.md. */
export function releaseIssues(env:Environment=process.env,sources:ReleaseSources={}) {
 const issues:string[]=(sources.pendingLegalWork??pendingLegalWork).map(task=>`Pending legal work: ${task}`);
 if(!verifiedHttps(env.NEXT_PUBLIC_SITE_URL))issues.push('A verified public HTTPS origin is missing (NEXT_PUBLIC_SITE_URL).');
 if(!verifiedPublicationDate(env.LEGAL_PUBLICATION_DATE))issues.push('A real legal document date is missing or invalid (LEGAL_PUBLICATION_DATE).');
 for(const [key,text]of Object.entries(sources.documents??legalDocuments)) {
  const resolved=resolveLegalText(text,key.startsWith('tr/')?'tr':'en',env);
  const fields=[...resolved.matchAll(/\[([A-Z_]+)\](?!\()/g)].map(match=>match[1]);
  if(fields.length)issues.push(`${key}: unresolved fields — ${[...new Set(fields)].join(', ')}`);
  if(/\bdraft\b|tasla[kğ]/i.test(resolved))issues.push(`${key}: draft decisions remain; complete the real review/procedure before publication.`);
 }
 issues.push(...publicCopyIssues(sources.marketing??content,'content'),...publicCopyIssues(sources.legalLabels??legalCopy,'legal-copy'));
 return issues;
}
export function isPreviewEnvironment(env:Environment=process.env) {
 return env.VERCEL_ENV==='preview'||(env.NETLIFY==='true'&&env.CONTEXT!=='production');
}
export function assertPublicationBuild(env:Environment=process.env,sources:ReleaseSources={}) {
 const production=env.VERCEL_ENV==='production'||(env.NETLIFY==='true'&&env.CONTEXT==='production');
 if(production&&env.SITE_PUBLICATION_APPROVED!=='true')throw new Error('Publication blocked: SITE_PUBLICATION_APPROVED must be explicitly true for production.');
 // A preview always remains available and noindex, even if an approval was accidentally shared across environments.
 if(env.SITE_PUBLICATION_APPROVED==='true'&&!isPreviewEnvironment(env)) {
  const issues=releaseIssues(env,sources);
  if(issues.length)throw new Error(`Publication blocked:\n- ${issues.join('\n- ')}`);
 }
}
export function publicationEnabled(env:Environment=process.env,sources:ReleaseSources={}) {
 return env.SITE_PUBLICATION_APPROVED==='true'&&!isPreviewEnvironment(env)&&releaseIssues(env,sources).length===0;
}
