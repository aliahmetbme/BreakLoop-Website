import { legalDocuments } from './legal-documents';
import { content } from './content';
import { legalCopy } from './legal-copy';
type Environment = Record<string, string | undefined>;
export function verifiedHttps(value: string | undefined) {
 if (!value) return undefined;
 try { const u=new URL(value); if(u.protocol!=='https:'||u.username||u.password||u.port||u.pathname!=='/'||u.search||u.hash||u.hostname==='localhost'||u.hostname.endsWith('.example')||u.hostname.endsWith('.test')||u.hostname.endsWith('.invalid')||u.hostname.endsWith('.localhost')||/^\d+\.\d+\.\d+\.\d+$/.test(u.hostname)||u.hostname.includes(':')||!u.hostname.includes('.'))return undefined; return u.origin; }catch{return undefined;}
}
export function vercelOrigin(value: string | undefined) {
 if (!value) return undefined;
 const trimmed = value.trim();
 if (!trimmed) return undefined;
 return verifiedHttps(trimmed.startsWith('http://') || trimmed.startsWith('https://') ? trimmed : `https://${trimmed}`);
}
export function supportEmail(value: string | undefined) {
 if (!value) return undefined;
 const trimmed = value.trim();
 if (!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(trimmed) || /[\r\n]/.test(trimmed)) return undefined;
 // Never expose the developer's primary personal iCloud address as the public support contact.
 if (trimmed.toLowerCase() === 'aliahmet44@icloud.com') return undefined;
 return trimmed;
}
export function verifiedSupportEmail(env: Environment = process.env) {
 return env.SUPPORT_EMAIL_MONITORED === 'true' ? supportEmail(env.NEXT_PUBLIC_SUPPORT_EMAIL) : undefined;
}
export function legalValues(env:Environment):Record<string,string|undefined>{
 const url=verifiedHttps(env.NEXT_PUBLIC_SITE_URL);
 const email=verifiedSupportEmail(env);
 return {
 LEGAL_OPERATOR_NAME:env.NEXT_PUBLIC_OPERATOR,HUKUKİ_YAYINCI_UNVANI:env.NEXT_PUBLIC_OPERATOR,VERIFIED_LEGAL_NAME:env.NEXT_PUBLIC_OPERATOR,DOĞRULANMIŞ_YASAL_AD_SOYAD:env.NEXT_PUBLIC_OPERATOR,
 VERIFIED_SUPPORT_EMAIL:email,DOĞRULANMIŞ_DESTEK_EPOSTASI:email,'DOĞRULANMIŞ GİZLİLİK EPOSTASI':email,'DOĞRULANMIŞ_DESTEK/GİZLİLİK_EPOSTASI':email,DOĞRULANMIŞ_DESTEK_VE_GİZLİLİK_EPOSTASI:email,
 VERIFIED_DOMAIN:url,DOĞRULANMIŞ_ALAN_ADI:url,
 EMAIL_SERVICE_PROVIDER:env.LEGAL_EMAIL_PROVIDER,EPOSTA_HİZMET_SAĞLAYICISI:env.LEGAL_EMAIL_PROVIDER,
 'SUPPORT_RETENTION_PERIOD / RULE':env.LEGAL_SUPPORT_RETENTION,DESTEK_KAYDI_SAKLAMA_SÜRESİ:env.LEGAL_SUPPORT_RETENTION,DOĞRULANMIŞ_DESTEK_KAYDI_SAKLAMA_KRİTERİ:env.LEGAL_SUPPORT_RETENTION,VERIFIED_SUPPORT_RETENTION:env.LEGAL_SUPPORT_RETENTION,
 HOSTING_PROVIDER:env.LEGAL_HOSTING_PROVIDER,BARINDIRMA_SAĞLAYICISI:env.LEGAL_HOSTING_PROVIDER,
 HOSTING_LOG_RETENTION:env.LEGAL_HOSTING_RETENTION,WEB_LOG_SAKLAMA_SÜRESİ:env.LEGAL_HOSTING_RETENTION,DOĞRULANMIŞ_HOSTING_LOG_SAKLAMA_KRİTERİ:env.LEGAL_HOSTING_RETENTION,VERIFIED_HOSTING_LOG_RETENTION:env.LEGAL_HOSTING_RETENTION,
 'GERÇEK KİŞİ ADI SOYADI VEYA TAM TİCARİ UNVAN':env.NEXT_PUBLIC_OPERATOR,
 'İŞ ADRESİ / GEREKLİ KİMLİK VE İLETİŞİM BİLGİLERİ':env.LEGAL_OPERATOR_ADDRESS,DOĞRULANMIŞ_BAŞVURU_KANALI_VE_GEREKLİ_ADRES_BİLGİSİ:env.LEGAL_OPERATOR_ADDRESS,
 'EPOSTA_SAĞLAYICISI, ALT İŞLEYEN, ÜLKE':env.LEGAL_EMAIL_PROCESSING,EMAIL_PROCESSING:env.LEGAL_EMAIL_PROCESSING,
 'HOSTING/CDN, ÜLKE':env.LEGAL_HOSTING_PROCESSING,HOSTING_PROCESSING:env.LEGAL_HOSTING_PROCESSING,
 GERÇEK_ALICILAR:env.LEGAL_KVKK_RECIPIENTS,
 DOĞRULANMIŞ_AKTARIM_DAYANAĞI:env.LEGAL_KVKK_TRANSFER_BASIS,
 'KVKK m.5 kapsamında somut faaliyet için değerlendirme; salt cihaz içi işleme ve veri sorumlusu kapsamını ayrıca hukuken incele':env.LEGAL_KVKK_LOCAL_BASIS,
 'SÖZLEŞME/MEŞRU MENFAAT/HAK TESİSİ VB. UYGUN SOMUT M.5 ŞARTI':env.LEGAL_KVKK_SUPPORT_BASIS,SOMUT_DESTEK_FAALİYETİNE_UYGUN_DOĞRULANMIŞ_HUKUKİ_SEBEP:env.LEGAL_KVKK_SUPPORT_BASIS,
 'DOĞRU M.5 ŞARTI':env.LEGAL_KVKK_HOSTING_BASIS,SOMUT_FAALİYETE_UYGUN_DOĞRULANMIŞ_HUKUKİ_SEBEP:env.LEGAL_KVKK_HOSTING_BASIS,
 'DOĞRULANMIŞ KANAL + KİMLİK DOĞRULAMA YÖNTEMİ':env.LEGAL_RIGHTS_PROCESS,
 'DİĞER KANUNİ KANAL':env.LEGAL_RIGHTS_CHANNEL,DOĞRULANMIŞ_KVKK_BAŞVURU_KANALI:env.LEGAL_RIGHTS_CHANNEL,
 'YAYIN TARİHİ':env.LEGAL_PUBLICATION_DATE,PUBLICATION_DATE:env.LEGAL_PUBLICATION_DATE,VERIFIED_PUBLICATION_DATE:env.LEGAL_PUBLICATION_DATE,DOĞRULANMIŞ_YAYIN_TARİHİ:env.LEGAL_PUBLICATION_DATE,
 // The two retention fields in the KVKK notice are replaced by context below.
 };
}
export function resolveLegalText(text:string, env:Environment=process.env){
 const values=legalValues(env);
 return text.replace(/(\*\*)?Destek yazışmaları:(\*\*)? \[SAKLAMA KRİTERİ VE SÜRESİ\]/g,`$1Destek yazışmaları:$2 ${env.LEGAL_SUPPORT_RETENTION||'[DESTEK_KAYDI_SAKLAMA_SÜRESİ]'}`)
 .replace(/(\*\*)?Web\/CDN erişim kayıtları:(\*\*)? \[SAKLAMA KRİTERİ VE SÜRESİ\]/g,`$1Web/CDN erişim kayıtları:$2 ${env.LEGAL_HOSTING_RETENTION||'[WEB_LOG_SAKLAMA_SÜRESİ]'}`)
 .replace(/\[([^\]\n]+)\](?!\()/g,(match,key:string)=>values[key]?.trim()||match);
}
type ReleaseSources = { documents?: Record<string,string>; marketing?: unknown; legalLabels?: unknown };
export function publicCopyIssues(value:unknown, prefix='public copy'):string[]{
 if(typeof value==='string')return /\bdraft\b|tasla[kğ]|local (?:website )?preview|yerel (?:web sitesi )?önizleme|to be verified|doğrulanmayı bekliyor|not approved for publication|yayın için onaylanmadı/i.test(value)?[`Preview/draft wording remains: ${prefix}`]:[];
 if(value&&typeof value==='object')return Object.entries(value).flatMap(([key,child])=>publicCopyIssues(child,`${prefix}.${key}`));
 return [];
}
// Website publication readiness: promotional website can publish before the iOS App Store release once domain, mailbox, operator, provider and legal/KVKK checks are complete.
export function websiteReleaseIssues(env:Environment=process.env,sources:ReleaseSources={}){
 const issues:string[]=[];
 if(!verifiedHttps(env.NEXT_PUBLIC_SITE_URL))issues.push('Verified public HTTPS site origin');
 if(!verifiedSupportEmail(env))issues.push('Valid monitored support email');
 for(const key of ['LEGAL_PUBLICATION_DATE','LEGAL_OPERATOR_ADDRESS','LEGAL_SUPPORT_RETENTION','LEGAL_KVKK_HOSTING_BASIS','LEGAL_KVKK_SUPPORT_BASIS','LEGAL_KVKK_TRANSFER_BASIS'])if(!env[key]?.trim())issues.push(key);
 for(const key of ['DOMAIN_OWNERSHIP_VERIFIED','SUPPORT_EMAIL_MONITORED','LEGAL_COPY_APPROVED','KVKK_LEGAL_REVIEW_APPROVED','MARKETING_COPY_APPROVED'])if(env[key]!=='true')issues.push(key);
 for(const [key,text]of Object.entries(sources.documents ?? legalDocuments)){
 const resolved=resolveLegalText(text,env);
 if(/\[[^\]\n]+\](?!\()/.test(resolved))issues.push(`Unresolved legal fields: ${key}`);
 // Supplied drafts contain editorial instructions. Require actual reviewed publication copy, not just filled values.
 if(/\bdraft\b|taslak|yayın öncesi|before publication|must be verified|must be reviewed|following verification|do not publish|doğrulanma|doğrulanacaktır|tamamlanacaktır|kesinleşmeden|proposed default/i.test(resolved))issues.push(`Draft/review language remains: ${key}`);
 }
 issues.push(...publicCopyIssues(sources.marketing ?? content,'content'),...publicCopyIssues(sources.legalLabels ?? legalCopy,'legal-copy'));
 return [...new Set(issues)];
}
export const releaseIssues = websiteReleaseIssues;

// Separate App Store release readiness gates (not required merely to publish the Coming Soon promotional website).
export function appStoreReleaseIssues(env:Environment=process.env,sources:ReleaseSources={}){
 const issues=[...websiteReleaseIssues(env,sources)];
 for(const key of ['IOS_RELEASE_AUDIT_APPROVED','FINAL_PRIVACY_INVENTORY_APPROVED','FAMILY_CONTROLS_ENTITLEMENT_VERIFIED','APP_STORE_PRIVACY_ANSWERS_VERIFIED','IOS_DEVICE_QA_APPROVED','NATIVE_LEGAL_LINKS_VERIFIED'])if(env[key]!=='true')issues.push(key);
 return [...new Set(issues)];
}

export function publicationEnabled(env:Environment=process.env,sources:ReleaseSources={}){
 return env.SITE_RELEASE_APPROVED==='true'&&env.VERCEL_ENV!=='preview'&&websiteReleaseIssues(env,sources).length===0;
}
