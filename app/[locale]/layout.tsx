import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/lib/config';
import { content } from '@/lib/content';
import { Header, Footer } from '@/components/site';
import { ThemeScript } from '@/components/theme-script';
export default async function LocaleLayout({children,params}:{children:React.ReactNode;params:Promise<{locale:string}>}) {const {locale}=await params;if(!locales.includes(locale as Locale))notFound();const lang=locale as Locale;return <html lang={lang} suppressHydrationWarning><head><ThemeScript/></head><body><a className="skip-link" href="#main">{content[lang].skip}</a><Header locale={lang}/>{children}<Footer locale={lang}/></body></html>;}
