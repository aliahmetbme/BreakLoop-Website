import { ogImage } from '@/lib/og-image';
import { locales, type Locale } from '@/lib/config';
export const dynamic='force-static';
export function generateStaticParams(){return locales.map(locale=>({locale}));}
export async function GET(_request:Request,{params}:{params:Promise<{locale:string}>}){
 const {locale}=await params;
 if(!locales.includes(locale as Locale))return new Response(null,{status:404});
 return ogImage(locale as Locale);
}
