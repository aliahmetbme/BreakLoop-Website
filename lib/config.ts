import { releaseIssues, supportEmail, verifiedHttps } from './release';
export const site = {
 url: verifiedHttps(process.env.NEXT_PUBLIC_SITE_URL),
 email: supportEmail(process.env.NEXT_PUBLIC_SUPPORT_EMAIL),
 operator: process.env.NEXT_PUBLIC_OPERATOR?.trim() || undefined,
 indexable: process.env.SITE_RELEASE_APPROVED==='true' && process.env.VERCEL_ENV!=='preview' && releaseIssues().length===0,
};
export const locales=['en','tr'] as const;
export type Locale=typeof locales[number];
export const paths=['','how-it-works','privacy','support','terms','kvkk'] as const;
export function availablePaths(locale:Locale){return paths.filter(path=>path!=='kvkk'||locale==='tr');}
