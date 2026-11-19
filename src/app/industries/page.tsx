import {buildMetadata} from '@/lib/seo';
import {breadcrumbLd, itemListLd} from '@/lib/structured-data';
import {industries} from '@/data/industries';
import {JsonLd} from '@/components/seo/JsonLd';
import {projects} from '@/data/projects';
import {PageShell} from '@/components/layout/PageShell';
import {PageHeader} from '@/components/ui/PageHeader';
import {Accent, Section, SectionHead} from '@/components/ui/primitives';
import {ContactCta, IndustriesList} from '@/components/home/sections';
import {ProjectCard} from '@/components/work/ProjectCard';
import w from '@/components/work/work.module.css';
import p from '@/components/pages/pages.module.css';

export const metadata = buildMetadata({
  title: 'Website design by industry',
  description:
    'Website design for gyms, restaurants, clinics, law firms, hotels, builders, salons, charities and more, each with a working, clearly labelled concept demo.',
  path: '/industries/',
});

export default function IndustriesPage() {
  const concepts = projects.filter(pr => pr.type === 'concept-demo');
  const demoNames = industries.map(i => (i.demo ? projects.find(pr => pr.slug === i.demo)?.title : undefined)).filter(Boolean);
  return (
    <PageShell>
      <JsonLd
        data={[
          breadcrumbLd([
            {name: 'Home', path: '/'},
            {name: 'Industries', path: '/industries/'},
          ]),
          itemListLd({
            name: 'Industries CraftLayer Studio designs for',
            path: '/industries/',
            items: industries.map(i => ({name: i.seoTitle, url: `/industries/${i.slug}/`, description: i.summary})),
          }),
        ]}
      />
      <PageHeader
        crumbs={[{label: 'Industries'}]}
        eyebrow={`Industries / ${industries.length} sectors`}
        title={
          <>
            Designed for how your sector <Accent>works.</Accent>
          </>
        }
        lead="Each sector has its own patterns: timetables, menus, appointment requests, listings, fee estimators. We design for those realities rather than forcing a generic template, and each sector has a working concept demo you can try."
      />
      <Section rule={false} labelledBy="sectors-title">
        <SectionHead label="Sectors" id="sectors-title" title="Who we design for" />
        <IndustriesList headingLevel={3} />
      </Section>
      <Section labelledBy="concepts-title">
        <SectionHead
          label="Concept demonstrations"
          id="concepts-title"
          title="Try the patterns before we talk"
          intro={`${concepts.length} working demo sites for fictional businesses, each with public source code.`}
        />
        <p className={p.notice} style={{marginBottom: 32}}>
          {demoNames.join(', ')} and the landing page gallery are fictional brands built by CraftLayer Studio to
          demonstrate industry patterns. They are not real businesses or client projects, and their forms do not send
          data anywhere.
        </p>
        <div className={w.grid3}>
          {concepts.map(pr => (
            <ProjectCard key={pr.slug} project={pr} compact />
          ))}
        </div>
      </Section>
      <ContactCta />
    </PageShell>
  );
}
