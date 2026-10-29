import { ImageResponse } from 'next/og';
export const size={width:1200,height:630};
export const contentType='image/png';
export default function OG(){return new ImageResponse(<div style={{width:'100%',height:'100%',background:'#0C0E14',color:'#F5F6FA',display:'flex',flexDirection:'column',justifyContent:'center',padding:90,fontFamily:'sans-serif'}}><div style={{display:'flex',color:'#BEC2FF',fontSize:34,marginBottom:50}}>∞ BreakLoop</div><div style={{display:'flex',fontSize:76,letterSpacing:-3}}>Break the scroll.</div><div style={{display:'flex',fontSize:76,color:'#BEC2FF',letterSpacing:-3}}>Find your rhythm.</div><div style={{display:'flex',fontSize:24,color:'#9BA3B8',marginTop:45}}>Coming soon on iOS</div></div>,size);}
