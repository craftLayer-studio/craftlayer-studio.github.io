import type {ReactNode} from 'react';
import {SiteHeader} from './SiteHeader';
import {SiteFooter} from './SiteFooter';

/** Header, the page's single <main id="main"> landmark, and footer. */
export function PageShell({children}: {children: ReactNode}) {
  return (
    <>
      <SiteHeader />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
