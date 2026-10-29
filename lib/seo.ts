import type { Metadata } from 'next';
import { getContent } from './content';
import { getLegalCopy } from './legal-copy';
import type { Locale } from './config';

type SeoConfig = { url?: string; indexable: boolean };
/** Pure metadata builder, also exercised with isolated publication fixtures. */
export function pageMetadata(locale: Locale, path: string, config: SeoConfig): Metadata {
  const c = getContent(locale, config.indexable);
  const legal = getLegalCopy(locale, config.indexable);
  const title = path === 'privacy' ? legal.privacy : path === 'terms' ? legal.terms : path === 'kvkk' ? legal.kvkk : path === 'support' ? c.nav[2] : path === 'how-it-works' ? c.nav[0] : c.hero.join(' ');
  const description = path === 'privacy' ? legal.privacyDescription : path === 'terms' ? legal.termsDescription : path === 'kvkk' ? legal.kvkkDescription : path === 'support' ? legal.supportIntro : path === 'how-it-works' ? c.howSeoDescription : c.seoDescription;
  const suffix = path ? `/${path}` : '';
  const url = config.url ? `${config.url}/${locale}${suffix}` : undefined;
  return {
    title: `BreakLoop — ${title}`, description,
    robots: { index: config.indexable, follow: config.indexable },
    ...(config.url ? {
      metadataBase: new URL(config.url),
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
      // A relative locale image works in preview; metadataBase resolves only asset URLs.
      images: [{ url: `${config.url || ''}/${locale}/og`, width: 1200, height: 630, alt: `BreakLoop — ${c.hero.join(' ')}` }],
      ...(url ? { url } : {}),
    },
  };
}
