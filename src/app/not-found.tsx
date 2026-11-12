import type {Metadata} from 'next';
import {Button} from '@astryxdesign/core/Button';
import {PageShell} from '@/components/layout/PageShell';
import {Accent} from '@/components/ui/primitives';
import ui from '@/components/ui/ui.module.css';
import p from '@/components/pages/pages.module.css';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: {index: false},
};

export default function NotFound() {
  return (
    <PageShell>
      <div className={`cl-container ${p.notFound}`}>
        <p className={p.notFoundCode}>404 / Not found</p>
        <h1 className={ui.h1}>
          This page is still a <Accent>prototype.</Accent>
        </h1>
        <p className={ui.lead}>The page you were looking for does not exist or has moved.</p>
        <div className={p.links}>
          <Button href="/" variant="primary" label="Go to the home page" />
          <Button href="/work/" variant="secondary" label="Explore our work" />
        </div>
      </div>
    </PageShell>
  );
}
