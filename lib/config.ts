import { publicationEnabled, deploymentPreviewOrigin, verifiedHttps } from './release';
import { siteDetails } from './site-details';
export const site = {
 url: verifiedHttps(process.env.NEXT_PUBLIC_SITE_URL),
 previewUrl: deploymentPreviewOrigin(),
 email: siteDetails.supportEmail,
 operator: siteDetails.developer,
 indexable: publicationEnabled(),
};
export const locales=['en','tr'] as const;
export type Locale=typeof locales[number];
export const paths=['','how-it-works','focus-mode','life-mode','privacy','support','terms','kvkk'] as const;
export function availablePaths(locale:Locale){return paths.filter(path=>path!=='kvkk'||locale==='tr');}
