import {VisuallyHidden} from '@astryxdesign/core/VisuallyHidden';
import {buildMetadata} from '@/lib/seo';
import {breadcrumbLd, serviceLd} from '@/lib/structured-data';
import {JsonLd} from '@/components/seo/JsonLd';
import {services} from '@/data/services';
import {PageShell} from '@/components/layout/PageShell';
import {PageHeader} from '@/components/ui/PageHeader';
import {Accent, Section} from '@/components/ui/primitives';
import {ContactCta, ServicesList} from '@/components/home/sections';

export const metadata = buildMetadata({
  title: 'Services',
  description:
    'Web development, SaaS development, AI applications, e-commerce, business automation and custom software, scoped carefully and built in small increments.',
  path: '/services/',
});

export default function ServicesPage() {
  return (
    <PageShell>
      <JsonLd
        data={[
          breadcrumbLd([
            {name: 'Home', path: '/'},
            {name: 'Services', path: '/services/'},
          ]),
          ...services.map(sv => serviceLd({name: sv.name, description: sv.intro, path: `/services/${sv.slug}/`})),
        ]}
      />
      <PageHeader
        crumbs={[{label: 'Services'}]}
        eyebrow="Services / Six disciplines"
        title={
          <>
            What we <Accent>build.</Accent>
          </>
        }
        lead="Six kinds of engagement, one way of working: written scope, small reviewable increments, and code you own at the end."
      />
      <Section rule={false} labelledBy="services-list-title">
        <VisuallyHidden as="h2">
          <span id="services-list-title">All services</span>
        </VisuallyHidden>
        <ServicesList headingLevel={3} />
      </Section>
      <ContactCta />
    </PageShell>
  );
}
