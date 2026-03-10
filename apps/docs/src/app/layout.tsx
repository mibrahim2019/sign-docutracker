import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { RootProvider } from 'fumadocs-ui/provider/next';
import PlausibleProvider from 'next-plausible';

import './global.css';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://docs.docutracker.com'),
  title: {
    template: '%s | Docutracker Docs',
    default: 'Docutracker Docs',
  },
  description:
    'The official documentation for Docutracker, the open-source document signing platform.',
  openGraph: {
    siteName: 'Docutracker Docs',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@docutracker',
  },
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <PlausibleProvider domain="docutracker.com">
          <RootProvider>{children}</RootProvider>
        </PlausibleProvider>
      </body>
    </html>
  );
}
