import {buildMetadata} from '@/lib/seo';
import {breadcrumbLd} from '@/lib/structured-data';
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
  title: 'Industries',
  description:
    'Websites and software for fitness, restaurants and hospitality, healthcare, startups, education and professional services, with clearly labelled concept demos.',
  path: '/industries/',
});

export default function IndustriesPage() {
  const concepts = projects.filter(pr => pr.type === 'concept-demo');
  return (
    <PageShell>
      <JsonLd
        data={breadcrumbLd([
          {name: 'Home', path: '/'},
          {name: 'Industries', path: '/industries/'},
        ])}
      />
      <PageHeader
        crumbs={[{label: 'Industries'}]}
        eyebrow="Industries / Six sectors"
        title={
          <>
            Designed for how your sector <Accent>works.</Accent>
          </>
        }
        lead="Each sector has its own patterns: timetables, menus, appointment requests, verified communities. We design for those realities rather than forcing a generic template."
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
          intro="Three working demo sites for fictional businesses."
        />
        <p className={p.notice} style={{marginBottom: 32}}>
          Forge Fitness, Juniper Kitchen and Northstar Clinic are fictional brands built by CraftLayer Studio to
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
