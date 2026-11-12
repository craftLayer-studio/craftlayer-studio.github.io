import {Geist, Geist_Mono, Instrument_Serif} from 'next/font/google';

// Self-hosted at build time by next/font: no runtime request to Google.
export const sans = Geist({subsets: ['latin'], variable: '--font-sans', display: 'swap'});
export const mono = Geist_Mono({subsets: ['latin'], variable: '--font-mono', display: 'swap'});
export const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});
