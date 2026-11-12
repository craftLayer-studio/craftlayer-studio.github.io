/**
 * CraftLayer Studio theme.
 *
 * Extends the official Astryx neutral theme. Fonts are self-hosted by
 * next/font (see src/app/fonts.ts) and exposed as CSS variables, which the
 * typography tokens below reference.
 *
 * Rebuild after every edit:
 *   pnpm exec astryx theme build src/themes/craftlayer/craftlayerTheme.ts
 */
import {defineTheme} from '@astryxdesign/core/theme';
import {neutralTheme} from '@astryxdesign/theme-neutral';

export const craftlayerTheme = defineTheme({
  name: 'craftlayer',
  extends: neutralTheme,
  color: {
    // [light, dark]: electric blue accent, lifted for dark surfaces.
    accent: ['#3A50E0', '#8A99FF'],
    neutralStyle: 'cool',
    contrast: 'standard',
  },
  typography: {
    scale: {base: 16, ratio: 1.25},
    body: {
      family: 'var(--font-sans)',
      fallbacks: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
    },
    heading: {
      family: 'var(--font-sans)',
      fallbacks: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
    },
    code: {
      family: 'var(--font-mono)',
      fallbacks: 'ui-monospace, SFMono-Regular, Menlo, monospace',
    },
  },
  radius: {base: 6, multiplier: 1},
  tokens: {
    '--color-background-body': ['#F7F8F5', '#0B111D'],
    '--color-background-surface': ['#FFFFFF', '#101828'],
  },
});
