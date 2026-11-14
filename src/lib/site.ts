/**
 * Single source of truth for site-wide facts. Every value here must be
 * verifiable. Do not add metrics, clients or claims without evidence.
 */
export const site = {
  name: 'CraftLayer Studio',
  shortName: 'CraftLayer',
  tagline: 'We turn ideas into digital products.',
  description:
    'CraftLayer Studio designs and engineers websites, SaaS products and AI-powered applications for founders and growing businesses.',
  // Canonical origin. Change only after a custom domain is verified (see README).
  url: 'https://craftlayer-studio.github.io',
  locale: 'en',
  githubOrg: 'https://github.com/craftLayer-studio',
  demosUrl: 'https://craftlayer-studio.github.io/industry-demos/',
  demosRepo: 'https://github.com/craftLayer-studio/industry-demos',
  galleryUrl: 'https://craftlayer-studio.github.io/landing-gallery/',
  galleryRepo: 'https://github.com/craftLayer-studio/landing-gallery',
  websiteRepo: 'https://github.com/craftLayer-studio/craftlayer-studio.github.io',
  scriptlyUrl: 'https://scriptly.store/',
  founder: {
    name: 'Shaswat Raj',
    role: 'Founder and engineer',
    github: 'https://github.com/playlikeboy',
    portfolio: 'https://playlikeboy.github.io',
    proof: 'https://playlikeboy.github.io/proof',
    linkedin: 'https://www.linkedin.com/in/sh20raj/',
    location: 'India',
  },
  // Public address published on the founder's GitHub profile.
  contactEmail: 'sh20raj@gmail.com',
  // Optional hosted form endpoint (Formspree/Tally). Public, not a secret.
  formEndpoint: process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? '',
} as const;

export const nav = [
  {label: 'Home', href: '/'},
  {label: 'Services', href: '/services/'},
  {label: 'Industries', href: '/industries/'},
  {label: 'Work', href: '/work/'},
  {label: 'Process', href: '/process/'},
  {label: 'About', href: '/about/'},
  {label: 'Products', href: '/products/'},
  {label: 'Contact', href: '/contact/'},
] as const;

export function absoluteUrl(path = '/'): string {
  return new URL(path, site.url + '/').toString();
}
