import type { Metadata } from 'next';
import { site } from '@/lib/config';
import './globals.css';
// Local/preview metadataBase only resolves OG and Twitter image assets; it never creates a canonical.
const assetOrigin = (site.indexable ? site.url : site.previewUrl);
export const metadata: Metadata = { title: 'BreakLoop', applicationName: 'BreakLoop', ...(assetOrigin ? { metadataBase: new URL(assetOrigin) } : {}) };
export default function RootLayout({ children }: { children: React.ReactNode }) { return children; }
