import {buildMetadata} from '@/lib/seo';
import {site} from '@/lib/site';
import {breadcrumbLd} from '@/lib/structured-data';
import {JsonLd} from '@/components/seo/JsonLd';
import {PageShell} from '@/components/layout/PageShell';
import {PageCrumbs} from '@/components/ui/PageHeader';
import {Section} from '@/components/ui/primitives';
import {ContactCta, ScriptlyShowcase} from '@/components/home/sections';
import p from '@/components/pages/pages.module.css';

export const metadata = buildMetadata({
  title: 'Products',
  description:
    'Scriptly is a separate storefront for ready-to-use digital products, run alongside CraftLayer Studio client work.',
  path: '/products/',
});

export default function ProductsPage() {
  return (
    <PageShell>
      <JsonLd
        data={breadcrumbLd([
          {name: 'Home', path: '/'},
          {name: 'Products', path: '/products/'},
        ])}
      />
      <div className="cl-container" style={{paddingBlock: '28px'}}>
        <PageCrumbs items={[{label: 'Products'}]} />
      </div>
      <ScriptlyShowcase headingLevel={1} />
      <Section rule={false} labelledBy="about-scriptly">
        <div className={p.split}>
          <div className={p.stack}>
            <p className={p.sideLabel}>Good to know</p>
            <h2 id="about-scriptly" className={p.h2}>
              How Scriptly relates to the studio
            </h2>
          </div>
          <div className={p.stack}>
            <p className={p.body}>
              Scriptly is a separate storefront at{' '}
              <a href={site.scriptlyUrl} rel="noopener">
                scriptly.store
              </a>
              . Anything bought or downloaded there is handled on that site, under its own terms and policies.
            </p>
            <p className={p.body}>
              Studio projects, such as a custom website or application, are separate. To discuss one, use the contact
              page on this site.
            </p>
          </div>
        </div>
      </Section>
      <ContactCta />
    </PageShell>
  );
}
