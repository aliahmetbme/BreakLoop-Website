import type { MetadataRoute } from 'next';
import { site } from '@/lib/config';
export default function robots():MetadataRoute.Robots{return {rules:{userAgent:'*',...(site.indexable?{allow:'/'}:{disallow:'/'})},...(site.indexable&&site.url?{sitemap:`${site.url}/sitemap.xml`}:{})};}
