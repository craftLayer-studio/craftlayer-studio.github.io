'use client';

import NextLink from 'next/link';
import {Theme} from '@astryxdesign/core/theme';
import {LinkProvider} from '@astryxdesign/core/Link';
import {craftlayerTheme} from '@/themes/craftlayer/craftlayer';
import type {ReactNode} from 'react';

export function Providers({children}: {children: ReactNode}) {
  return (
    <Theme theme={craftlayerTheme} mode="light">
      <LinkProvider component={NextLink}>{children}</LinkProvider>
    </Theme>
  );
}
