import { publicationEnabled, supportEmail, verifiedHttps } from './release';
export const site = {
 url: verifiedHttps(process.env.NEXT_PUBLIC_SITE_URL),
 email: supportEmail(process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? 'breakloopSupport@icloud.com'),
 operator: process.env.NEXT_PUBLIC_OPERATOR?.trim() || 'Ali Ahmet Erdoğdu',
 indexable: publicationEnabled(),
};
export const locales=['en','tr'] as const;
export type Locale=typeof locales[number];
export const paths=['','how-it-works','privacy','support','terms','kvkk'] as const;
export function availablePaths(locale:Locale){return paths.filter(path=>path!=='kvkk'||locale==='tr');}
