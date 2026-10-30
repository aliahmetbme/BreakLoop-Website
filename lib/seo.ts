import type { Metadata } from 'next';
import { getContent } from './content';
import { getLegalCopy } from './legal-copy';
import { vercelOrigin, verifiedHttps } from './release';
import type { Locale } from './config';

type SeoConfig = { url?: string; previewUrl?: string; vercelUrl?: string; indexable: boolean };
/** Pure metadata builder, also exercised with isolated publication fixtures. */
export function pageMetadata(locale: Locale, path: string, config: SeoConfig): Metadata {
  const c = getContent(locale, config.indexable);
  const legal = getLegalCopy(locale, config.indexable);
  const title = path === 'privacy' ? legal.privacy : path === 'terms' ? legal.terms : path === 'kvkk' ? legal.kvkk : path === 'support' ? c.nav[2] : path === 'how-it-works' ? c.nav[0] : c.hero.join(' ');
  const description = path === 'privacy' ? legal.privacyDescription : path === 'terms' ? legal.termsDescription : path === 'kvkk' ? legal.kvkkDescription : path === 'support' ? legal.supportIntro : path === 'how-it-works' ? c.howSeoDescription : c.seoDescription;
  const suffix = path ? `/${path}` : '';
  const prodOrigin = config.indexable ? verifiedHttps(config.url) : undefined;
  const previewOrigin = !config.indexable ? vercelOrigin(config.previewUrl ?? config.vercelUrl) : undefined;
  const imageOrigin = prodOrigin || previewOrigin;
  const url = prodOrigin ? `${prodOrigin}/${locale}${suffix}` : undefined;
  const imageUrl = imageOrigin ? `${imageOrigin}/${locale}/og` : undefined;
  const imageAlt = `BreakLoop — ${c.hero.join(' ')}`;
  return {
    title: `BreakLoop — ${title}`, description,
    robots: { index: config.indexable, follow: config.indexable },
    ...(imageOrigin ? { metadataBase: new URL(imageOrigin) } : {}),
    ...(prodOrigin ? {
      alternates: {
        canonical: url,
        languages: { ...(path !== 'kvkk' ? { en: `/en${suffix}` } : {}), tr: `/tr${suffix}`, 'x-default': path === 'kvkk' ? '/tr/kvkk' : `/en${suffix}` },
      },
    } : {}),
    openGraph: {
      title: `BreakLoop — ${title}`, description,
      locale: locale === 'en' ? 'en_US' : 'tr_TR',
      ...(path !== 'kvkk' ? { alternateLocale: locale === 'en' ? 'tr_TR' : 'en_US' } : {}),
      type: 'website',
      // Only emit share images with a verified public origin; local builds omit them.
      ...(imageUrl ? { images: [{ url: imageUrl, width: 1200, height: 630, alt: imageAlt }] } : {}),
      ...(url ? { url } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: `BreakLoop — ${title}`, description,
      ...(imageUrl ? { images: [{ url: imageUrl, alt: imageAlt }] } : {}),
    },
  };
}
