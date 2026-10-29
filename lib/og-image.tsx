import { ImageResponse } from 'next/og';
import { content } from './content';
import type { Locale } from './config';
export function ogImage(locale: Locale) {
 const c=content[locale];
 return new ImageResponse(
  <div style={{width:'100%',height:'100%',background:'#0C0E14',color:'#F5F6FA',display:'flex',flexDirection:'column',justifyContent:'center',padding:90,fontFamily:'sans-serif'}}>
   <div style={{display:'flex',color:'#BEC2FF',fontSize:34,marginBottom:50}}>∞ BreakLoop</div>
   <div style={{display:'flex',fontSize:64,letterSpacing:-3}}>{c.hero[0]}</div>
   <div style={{display:'flex',fontSize:64,color:'#BEC2FF',letterSpacing:-3}}>{c.hero[1]}</div>
   <div style={{display:'flex',fontSize:24,color:'#9BA3B8',marginTop:45}}>{c.soon}</div>
  </div>,{width:1200,height:630}
 );
}
