'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Locale } from '@/lib/config';
import { content } from '@/lib/content';
export function Controls({ locale }: { locale: Locale }) {
 const c = content[locale]; const pathname = usePathname();
 const [theme, setTheme] = useState('system'); const [open, setOpen] = useState(false);
 useEffect(() => { try { setTheme(localStorage.getItem('breakloop-theme') || 'system'); } catch {} }, []);
 useEffect(() => { setOpen(false); }, [pathname]);
 function change(value: string) { setTheme(value); try { localStorage.setItem('breakloop-theme', value); } catch {} document.documentElement.dataset.theme = value; }
 const other = locale === 'en' ? 'tr' : 'en';
 return <><div className="controls"><label className="theme-control"><span className="sr-only">{c.theme}</span><svg className="theme-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{theme === 'light' ? <><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/></> : theme === 'dark' ? <path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z"/> : <><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M12 16v4m-4 0h8"/></>}</svg><select aria-label={c.theme} value={theme} onChange={e => change(e.target.value)}>{['light','dark','system'].map((v,i)=><option key={v} value={v}>{c.themes[i]}</option>)}</select><svg className="theme-chevron" width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m4 6 4 4 4-4"/></svg></label><Link className="language" href={pathname==='/tr/kvkk'?'/en/privacy':pathname.replace(/^\/(en|tr)(?=\/|$)/, `/${other}`)} title={pathname==='/tr/kvkk'?'Privacy Policy (English) — KVKK notice is available in Turkish only':undefined} aria-label={pathname==='/tr/kvkk'?'English Privacy Policy — KVKK notice is available in Turkish only':undefined} hrefLang={other} lang={other}>{other.toUpperCase()}</Link><button className="menu-button" aria-label={c.menu} aria-expanded={open} aria-controls="mobile-navigation" onClick={()=>setOpen(!open)}>{open ? '×' : '☰'}</button></div>{open && <nav id="mobile-navigation" className="mobile-nav" aria-label={c.menu}>{['how-it-works','privacy','support'].map((p,i)=><Link key={p} href={`/${locale}/${p}`} onClick={()=>setOpen(false)}>{c.nav[i]}</Link>)}</nav>}</>;
}
