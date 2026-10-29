import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/lib/config';
import { content } from '@/lib/content';
import { Header, Footer } from '@/components/site';
const themeScript = `(function(){try{var t=localStorage.getItem('breakloop-theme');document.documentElement.dataset.theme=['light','dark'].includes(t)?t:'system'}catch(e){document.documentElement.dataset.theme='system'}})()`;
export default async function LocaleLayout({children,params}:{children:React.ReactNode;params:Promise<{locale:string}>}) {const {locale}=await params;if(!locales.includes(locale as Locale))notFound();const lang=locale as Locale;return <html lang={lang} suppressHydrationWarning><head><script dangerouslySetInnerHTML={{__html:themeScript}}/></head><body><a className="skip-link" href="#main">{content[lang].skip}</a><Header locale={lang}/>{children}<Footer locale={lang}/></body></html>;}
