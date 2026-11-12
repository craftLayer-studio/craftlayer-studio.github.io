import {notFound} from 'next/navigation';
import NextLink from 'next/link';
import {buildMetadata} from '@/lib/seo';
import {breadcrumbLd, serviceLd} from '@/lib/structured-data';
import {JsonLd} from '@/components/seo/JsonLd';
import {getService, services} from '@/data/services';
import {getProject} from '@/data/projects';
import {PageShell} from '@/components/layout/PageShell';
import {PageHeader} from '@/components/ui/PageHeader';
import {ArrowIcon, Section, SectionHead, TechChips} from '@/components/ui/primitives';
import {ContactCta} from '@/components/home/sections';
import {ProjectCard} from '@/components/work/ProjectCard';
import w from '@/components/work/work.module.css';
import p from '@/components/pages/pages.module.css';

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map(sv => ({slug: sv.slug}));
}

export async function generateMetadata({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params;
  const sv = getService(slug);
  if (!sv) return {};
  return buildMetadata({title: sv.name, description: sv.short, path: `/services/${sv.slug}/`});
}

const pad = (n: number) => String(n).padStart(2, '0');

export default async function ServicePage({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params;
  const sv = getService(slug);
  if (!sv) notFound();
  const index = services.findIndex(x => x.slug === sv.slug);
  const related = sv.related.map(getProject).filter(x => x !== undefined);
  const path = `/services/${sv.slug}/`;

  return (
    <PageShell>
      <JsonLd
        data={[
          serviceLd({name: sv.name, description: sv.intro, path}),
          breadcrumbLd([
            {name: 'Home', path: '/'},
            {name: 'Services', path: '/services/'},
            {name: sv.name, path},
          ]),
        ]}
      />
      <PageHeader
        crumbs={[{label: 'Services', href: '/services/'}, {label: sv.name}]}
        eyebrow={`Service ${pad(index + 1)} / ${pad(services.length)}`}
        title={sv.name}
        lead={sv.intro}
      >
        <TechChips items={sv.stack} label="Typical technology" />
      </PageHeader>

      <Section rule={false} labelledBy="included-title">
        <div className={p.split}>
          <div className={p.stack}>
            <p className={p.sideLabel}>What is included</p>
            <h2 id="included-title" className={p.h2}>
              A typical engagement
            </h2>
            <p className={p.body}>Every project is scoped individually; this is the usual shape of the work.</p>
          </div>
          <ol className={p.ruled}>
            {sv.deliverables.map((d, i) => (
              <li key={d}>
                <span aria-hidden="true">{pad(i + 1)}</span>
                <span>{d}</span>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section labelledBy="approach-title">
        <div className={p.cols3}>
          <div className={p.col}>
            <h2 id="approach-title">How we approach it</h2>
            <ul>
              {sv.approach.map(a => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
          <div className={p.col}>
            <h2>A good fit when</h2>
            <ul>
              {sv.goodFit.map(a => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
          <div className={p.col}>
            <h2>Not sure it fits?</h2>
            <p>Describe the problem rather than the solution. We will tell you honestly if a different approach, or a different studio, would serve you better.</p>
            <p>
              <NextLink href="/contact/">Start a conversation</NextLink>
            </p>
          </div>
        </div>
      </Section>

      {related.length ? (
        <Section labelledBy="related-title">
          <SectionHead
            label="Related work"
            id="related-title"
            title="Where we have done this before"
            intro="Public projects that use the same kind of engineering. Labels show whether each is an in-house product, open source, community work or a concept demo."
          />
          <div className={w.grid3}>
            {related.map(pr => (
              <ProjectCard key={pr.slug} project={pr} compact />
            ))}
          </div>
          <p style={{marginTop: 32}}>
            <NextLink href="/services/" style={{display: 'inline-flex', gap: 8, alignItems: 'center', color: 'var(--cl-ink)'}}>
              All services <ArrowIcon />
            </NextLink>
          </p>
        </Section>
      ) : null}
      <ContactCta />
    </PageShell>
  );
}
