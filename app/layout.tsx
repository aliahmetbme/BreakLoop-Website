import type { Metadata } from 'next';
import { site } from '@/lib/config';
import './globals.css';
// Local metadata base only resolves preview OG assets; it never creates a canonical.
export const metadata: Metadata = { title: 'BreakLoop', applicationName: 'BreakLoop', metadataBase: new URL(site.url || 'http://127.0.0.1:3000') };
export default function RootLayout({ children }: { children: React.ReactNode }) { return children; }
