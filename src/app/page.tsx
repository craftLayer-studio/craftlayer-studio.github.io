import {buildMetadata} from '@/lib/seo';
import {site} from '@/lib/site';
import {organizationLd, websiteLd} from '@/lib/structured-data';
import {JsonLd} from '@/components/seo/JsonLd';
import {PageShell} from '@/components/layout/PageShell';
import {
  CaseStudiesTeaser,
  ContactCta,
  Hero,
  IndustriesSection,
  ProcessSection,
  ScriptlyShowcase,
  SelectedWork,
  ServicesSection,
  TechSection,
} from '@/components/home/sections';

export const metadata = buildMetadata({
  title: 'Websites, SaaS and AI applications',
  description: site.description,
  path: '/',
});

export default function Home() {
  return (
    <PageShell>
      <JsonLd data={[organizationLd(), websiteLd()]} />
      <Hero />
      <SelectedWork />
      <ServicesSection />
      <IndustriesSection />
      <ProcessSection />
      <TechSection />
      <CaseStudiesTeaser />
      <ScriptlyShowcase />
      <ContactCta />
    </PageShell>
  );
}
