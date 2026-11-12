import {buildMetadata} from '@/lib/seo';
import {breadcrumbLd} from '@/lib/structured-data';
import {JsonLd} from '@/components/seo/JsonLd';
import {projects, projectTypeLabel, type ProjectType} from '@/data/projects';
import {PageShell} from '@/components/layout/PageShell';
import {PageHeader} from '@/components/ui/PageHeader';
import {Accent, Section} from '@/components/ui/primitives';
import {CaseStudiesTeaser, ContactCta} from '@/components/home/sections';
import {ProjectCard} from '@/components/work/ProjectCard';
import w from '@/components/work/work.module.css';

export const metadata = buildMetadata({
  title: 'Work',
  description:
    'In-house products, open-source projects, community work and concept demos, each honestly labelled and linked to its live site and source code.',
  path: '/work/',
});

const groups: {type: ProjectType; intro: string}[] = [
  {type: 'in-house-product', intro: 'Products built and run by the founder, live today.'},
  {type: 'community-project', intro: 'Built and operated for a community, with a public write-up.'},
  {type: 'open-source', intro: 'Open-source tools with public repositories.'},
  {type: 'concept-demo', intro: 'Fictional brands built to demonstrate industry patterns. Not client work.'},
];

export default function WorkPage() {
  return (
    <PageShell>
      <JsonLd
        data={breadcrumbLd([
          {name: 'Home', path: '/'},
          {name: 'Work', path: '/work/'},
        ])}
      />
      <PageHeader
        crumbs={[{label: 'Work'}]}
        eyebrow={`Work / ${projects.length} projects`}
        title={
          <>
            Work you can <Accent>check.</Accent>
          </>
        }
        lead="Every project here is public. Each one says what kind of work it is, and links to the live site, the source code or a public write-up so you can verify it yourself."
      />
      <Section rule={false}>
        {groups.map((g, gi) => {
          const items = projects.filter(pr => pr.type === g.type);
          if (!items.length) return null;
          const id = `group-${g.type}`;
          return (
            <section key={g.type} aria-labelledby={id}>
              <div className={w.subhead} style={gi === 0 ? {marginTop: 0} : undefined}>
                <h2 id={id}>
                  {projectTypeLabel[g.type]}
                  {g.type === 'open-source' || g.type === 'concept-demo' || g.type === 'in-house-product' ? 's' : ''}
                </h2>
                <p>{g.intro}</p>
              </div>
              <div className={g.type === 'in-house-product' ? w.grid2 : w.grid3}>
                {items.map(pr => (
                  <ProjectCard key={pr.slug} project={pr} compact={g.type !== 'in-house-product'} />
                ))}
              </div>
            </section>
          );
        })}
      </Section>
      <CaseStudiesTeaser />
      <ContactCta />
    </PageShell>
  );
}
