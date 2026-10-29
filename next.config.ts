import type { NextConfig } from 'next';
import { releaseIssues } from './lib/release';
if(process.env.VERCEL_ENV==='production'&&process.env.SITE_RELEASE_APPROVED!=='true')throw new Error('Publication blocked: SITE_RELEASE_APPROVED is required for Vercel production.');
if(process.env.SITE_RELEASE_APPROVED==='true') {
 const issues=releaseIssues();
 if(issues.length)throw new Error(`Publication blocked:\n- ${issues.join('\n- ')}`);
}
const config:NextConfig={poweredByHeader:false,images:{qualities:[75,90]}};
export default config;
