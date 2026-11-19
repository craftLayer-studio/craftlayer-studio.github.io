import {notFound} from 'next/navigation';
import NextLink from 'next/link';
import {Button} from '@astryxdesign/core/Button';
import {Link} from '@astryxdesign/core/Link';
import {buildMetadata} from '@/lib/seo';
import {breadcrumbLd, creativeWorkLd, industryServiceLd} from '@/lib/structured-data';
import {JsonLd} from '@/components/seo/JsonLd';
import {getIndustry, industries} from '@/data/industries';
import {getProject} from '@/data/projects';
import {getService} from '@/data/services';
import {deliverables} from '@/data/process';
import {PageShell} from '@/components/layout/PageShell';
import {PageHeader} from '@/components/ui/PageHeader';
import {ArrowIcon, Section, SectionHead} from '@/components/ui/primitives';
import {ContactCta} from '@/components/home/sections';
import {ProjectCard} from '@/components/work/ProjectCard';
import w from '@/components/work/work.module.css';
import p from '@/components/pages/pages.module.css';

export const dynamicParams = false;

export function generateStaticParams() {
  return industries.map(ind => ({slug: ind.slug}));
}

export async function generateMetadata({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params;
  const ind = getIndustry(slug);
  if (!ind) return {};
  return buildMetadata({title: ind.seoTitle, description: ind.metaDescription, path: `/industries/${ind.slug}/`});
}

const pad = (n: number) => String(n).padStart(2, '0');

export default async function IndustryPage({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params;
  const ind = getIndustry(slug);
  if (!ind) notFound();
  const path = `/industries/${ind.slug}/`;
  const demo = ind.demo ? getProject(ind.demo) : undefined;
  const services = ind.services.map(getService).filter(x => x !== undefined);
  const related = (ind.related ?? []).map(getProject).filter(x => x !== undefined);
  const others = industries.filter(x => x.slug !== ind.slug);

  return (
    <PageShell>
      <JsonLd
        data={[
          industryServiceLd({name: ind.seoTitle, description: ind.metaDescription, path}),
          ...(demo ? [creativeWorkLd(demo)] : []),
          breadcrumbLd([
            {name: 'Home', path: '/'},
            {name: 'Industries', path: '/industries/'},
            {name: ind.name, path},
          ]),
        ]}
      />
      <PageHeader
        crumbs={[{label: 'Industries', href: '/industries/'}, {label: ind.name}]}
        eyebrow={`Industries / ${ind.name}`}
        title={ind.seoTitle}
        lead={ind.intro}
      >
        <div className={p.links}>
          <Button href="/contact/" variant="primary" size="lg" label="Start a project" />
          {demo?.demoUrl ? (
            <Button href={demo.demoUrl} variant="secondary" size="lg" label={`Try the ${demo.title} demo`} />
          ) : null}
        </div>
      </PageHeader>

      <Section rule={false} labelledBy="needs-title">
        <div className={p.split}>
          <div className={p.stack}>
            <p className={p.sideLabel}>What the site needs</p>
            <h2 id="needs-title" className={p.h2}>
              What {ind.name.toLowerCase()} websites need to do
            </h2>
            <p className={p.body}>{ind.summary}</p>
          </div>
          <ol className={p.ruled}>
            {ind.needs.map((n, i) => (
              <li key={n}>
                <span aria-hidden="true">{pad(i + 1)}</span>
                <span>{n}</span>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {demo ? (
        <Section labelledBy="demo-title">
          <SectionHead
            label="Concept demo"
            id="demo-title"
            title={`Try it: ${demo.title}`}
            intro="A working website for a fictional business, so you can click through the patterns before we talk."
          />
          <p className={p.notice}>
            <strong>Concept demo.</strong> {demo.title} is a fictional brand built by CraftLayer Studio to demonstrate
            design and engineering patterns. It is not a real business or a client project, and its forms do not send
            data anywhere.
          </p>
          <div className={p.demoGrid}>
            <ProjectCard project={demo} compact />
            <div className={p.stack}>
              <h3 className={p.h3}>What you can try in the demo</h3>
              <ul className={p.checkList}>
                {ind.demoShows.map(d => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
              {demo.repoUrl ? (
                <p className={p.body}>
                  The full source is public:{' '}
                  <Link href={demo.repoUrl} isExternalLink>
                    read the {demo.title} code on GitHub
                  </Link>
                  .
                </p>
              ) : null}
            </div>
          </div>
        </Section>
      ) : null}

      <Section labelledBy="receive-title">
        <SectionHead
          label="What you receive"
          id="receive-title"
          title="How we build it"
          intro="The same standards apply to every project. Each one is something you can check in our public repositories."
        />
        <div className={p.cols3}>
          {deliverables.map(d => (
            <div key={d.title} className={p.col}>
              <h3>{d.title}</h3>
              <p>{d.body}</p>
            </div>
          ))}
        </div>
        <p className={p.more}>
          <NextLink href="/process/">
            Read how we work, step by step <ArrowIcon />
          </NextLink>
        </p>
      </Section>

      <Section labelledBy="services-title">
        <SectionHead label="Services" id="services-title" title="Services that usually apply" />
        <ul className={p.linkCards}>
          {services.map(sv => (
            <li key={sv.slug}>
              <NextLink href={`/services/${sv.slug}/`}>
                <strong>{sv.name}</strong>
                <span>{sv.short}</span>
              </NextLink>
            </li>
          ))}
        </ul>
      </Section>

      {related.length ? (
        <Section labelledBy="related-title">
          <SectionHead
            label="Related work"
            id="related-title"
            title="Real projects with similar engineering"
            intro="Built and run by the founder. Each card says what kind of project it is and links to public evidence."
          />
          <div className={w.grid3}>
            {related.map(pr => (
              <ProjectCard key={pr.slug} project={pr} compact />
            ))}
          </div>
        </Section>
      ) : null}

      <Section labelledBy="others-title">
        <SectionHead label="Other industries" id="others-title" title="Other sectors we design for" />
        <ul className={p.tagLinks}>
          {others.map(o => (
            <li key={o.slug}>
              <NextLink href={`/industries/${o.slug}/`}>{o.seoTitle}</NextLink>
            </li>
          ))}
        </ul>
      </Section>
      <ContactCta />
    </PageShell>
  );
}
