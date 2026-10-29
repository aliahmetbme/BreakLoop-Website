import { publicationEnabled, verifiedSupportEmail, verifiedHttps } from './release';
export const site = {
 url: verifiedHttps(process.env.NEXT_PUBLIC_SITE_URL),
 email: verifiedSupportEmail(process.env),
 operator: process.env.NEXT_PUBLIC_OPERATOR?.trim() || undefined,
 indexable: publicationEnabled(),
};
export const locales=['en','tr'] as const;
export type Locale=typeof locales[number];
export const paths=['','how-it-works','privacy','support','terms','kvkk'] as const;
export function availablePaths(locale:Locale){return paths.filter(path=>path!=='kvkk'||locale==='tr');}
