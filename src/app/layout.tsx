import type {Metadata, Viewport} from 'next';
import '@/themes/craftlayer/craftlayer.css';
import './globals.css';
import {mono, sans, serif} from './fonts';
import {Providers} from './providers';
import {site} from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {default: `${site.name} | Digital product engineering`, template: `%s | ${site.name}`},
  description: site.description,
  applicationName: site.name,
  authors: [{name: site.founder.name, url: site.founder.portfolio}],
  icons: {
    icon: [
      {url: '/favicon.ico', sizes: 'any'},
      {url: '/brand/icon.svg', type: 'image/svg+xml'},
    ],
    apple: '/brand/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#101828',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} ${serif.variable}`}>
      <body>
        <a href="#main" className="cl-skip-link">
          Skip to content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
