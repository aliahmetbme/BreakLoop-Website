import type { ReactNode } from 'react';
import Link from 'next/link';
import { legalDocuments } from '@/lib/legal-documents';
import { legalCopy } from '@/lib/legal-copy';
import { resolveLegalText } from '@/lib/release';
import { site, type Locale } from '@/lib/config';
export type LegalPage='privacy'|'terms'|'kvkk';
function safeHref(value:string){return /^(https:\/\/|\/(?!\/)|mailto:)/.test(value)?value:undefined;}
function Inline({text,locale}:{text:string;locale:Locale}){
 const parts=text.split(/(\*\*[^*]+\*\*|\[[^\]\n]+\]\([^)]+\)|\[[^\]\n]+\]|https:\/\/[^\s;]+)/g);
 return <>{parts.map((part,i):ReactNode=>{
 if(part.startsWith('**')&&part.endsWith('**'))return <strong key={i}><Inline text={part.slice(2,-2)} locale={locale}/></strong>;
 const link=part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
 if(link){const href=safeHref(link[2]);return href?<Link key={i} href={href}>{link[1]}</Link>:link[1];}
 if(/^\[[^\]]+\]$/.test(part))return <span className="legal-pending" key={i}>{legalCopy[locale].pending}: {part.slice(1,-1).replaceAll('_',' ')}</span>;
 if(part.startsWith('https://'))return <a key={i} href={part}>{part}</a>;
 return part;
 })}</>;
}
function MarkdownBlock({block,locale,index}:{block:string;locale:Locale;index:number}){
 if(block.startsWith('## '))return <h2 id={`legal-section-${index}`}><Inline text={block.slice(3)} locale={locale}/></h2>;
 const lines=block.split('\n');
 if(lines.every(line=>line.startsWith('|'))){const rows=lines.filter(line=>!/^\|[\s:|-]+\|$/.test(line)).map(line=>line.split('|').slice(1,-1).map(v=>v.trim()));return <div className="legal-table-scroll" role="region" aria-label={locale==='tr'?'Veri işleme faaliyetleri':'Data processing activities'} tabIndex={0}><table><thead><tr>{rows[0].map((cell,i)=><th scope="col" key={i}><Inline text={cell} locale={locale}/></th>)}</tr></thead><tbody>{rows.slice(1).map((row,i)=><tr key={i}>{row.map((cell,j)=><td key={j}><Inline text={cell} locale={locale}/></td>)}</tr>)}</tbody></table></div>;}
 if(lines.every(line=>line.startsWith('- ')))return <ul>{lines.map((line,i)=><li key={i}><Inline text={line.slice(2)} locale={locale}/></li>)}</ul>;
 return <p><Inline text={block.replace(/\s*\n\s*/g,' ')} locale={locale}/></p>;
}
export function LegalLinks({locale}:{locale:Locale}){const c=legalCopy[locale];return <nav className="legal-links" aria-label={c.related}><Link href={`/${locale}/privacy`}>{c.privacy}</Link><Link href={`/${locale}/terms`}>{c.terms}</Link><Link href="/tr/kvkk" lang="tr">{c.kvkk}</Link><Link href={`/${locale}/support`}>{c.support}</Link></nav>;}
export function LegalDocument({locale,page}:{locale:Locale;page:LegalPage}){
 const c=legalCopy[locale];const text=resolveLegalText(legalDocuments[`${locale}/${page}`]);const blocks=text.replace(/^(## [^\n]+)\n(?!\n)/gm,'$1\n\n').split(/\n\s*\n/).filter(Boolean).filter(b=>!b.startsWith('# '));
 const headings=blocks.map((b,index)=>({b,index})).filter(({b})=>b.startsWith('## '));
 return <main id="main" className="wrap legal-document"><div className="legal-header">{!site.indexable&&<p className="draft">{c.draft}</p>}<p className="eyebrow">BREAKLOOP / {c[page]}</p><h1>{c[page]}</h1>{page==='kvkk'&&<p className="legal-language-note">{c.kvkkLanguage}</p>}</div><div className="legal-layout"><nav className="legal-toc" aria-label={c.contents}><p>{c.contents}</p><ol>{headings.map(({b,index})=><li key={index}><a href={`#legal-section-${index}`}>{b.slice(3).replace(/^\d+\.\s*/,'')}</a></li>)}</ol></nav><article className="legal-prose">{blocks.map((block,index)=><MarkdownBlock key={index} block={block} locale={locale} index={index}/>)}{page==='privacy'&&<p><Link href="/tr/kvkk" lang="tr">{c.kvkk}</Link></p>}</article></div><LegalLinks locale={locale}/></main>;
}
