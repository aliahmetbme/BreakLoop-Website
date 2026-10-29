import type { MetadataRoute } from 'next';
import { site, locales, availablePaths } from '@/lib/config';
export default function sitemap():MetadataRoute.Sitemap {if(!site.indexable||!site.url)return [];return locales.flatMap(locale=>availablePaths(locale).map(path=>({url:`${site.url}/${locale}${path?`/${path}`:''}`,alternates:{languages:{...(path!=='kvkk'?{en:`${site.url}/en${path?`/${path}`:''}`} : {}),tr:`${site.url}/tr${path?`/${path}`:''}`}}})));}
