import type { NextConfig } from 'next';
import { assertPublicationBuild } from './lib/release';
assertPublicationBuild();
const config:NextConfig={poweredByHeader:false,images:{qualities:[75,90]}};
export default config;
