import {notFound} from 'next/navigation';
import NextLink from 'next/link';
import {Button} from '@astryxdesign/core/Button';
import {Link} from '@astryxdesign/core/Link';
import {buildMetadata} from '@/lib/seo';
import {articleLd, breadcrumbLd} from '@/lib/structured-data';
import {JsonLd} from '@/components/seo/JsonLd';
import {caseStudies, getProject} from '@/data/projects';
import {site} from '@/lib/site';
import {PageShell} from '@/components/layout/PageShell';
import {PageCrumbs} from '@/components/ui/PageHeader';
import {Eyebrow, Section, TechChips, TypeBadge} from '@/components/ui/primitives';
import {ContactCta} from '@/components/home/sections';
import {Screenshot} from '@/components/work/ProjectCard';
import {ArchitectureDiagram} from '@/components/work/ArchitectureDiagram';
import ui from '@/components/ui/ui.module.css';
import w from '@/components/work/work.module.css';

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map(pr => ({slug: pr.slug}));
}

export async function generateMetadata({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params;
  const pr = getProject(slug);
  if (!pr?.caseStudy) return {};
  return buildMetadata({
    title: `${pr.title} case study`,
    description: pr.summary,
    path: `/work/${pr.slug}/`,
  });
}

const pad = (n: number) => String(n).padStart(2, '0');

export default async function CaseStudyPage({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params;
  const pr = getProject(slug);
  if (!pr?.caseStudy) notFound();
  const cs = pr.caseStudy;
  const idx = caseStudies.findIndex(c => c.slug === pr.slug);
  const prev = caseStudies[idx - 1];
  const next = caseStudies[idx + 1];
  const path = `/work/${pr.slug}/`;

  const sections = [
    {id: 'context', title: 'Context'},
    {id: 'problem', title: 'Problem'},
    {id: 'objective', title: 'Objective'},
    {id: 'work', title: 'Work performed'},
    {id: 'decisions', title: 'Engineering decisions'},
    {id: 'architecture', title: 'Architecture'},
    {id: 'results', title: 'Results'},
    {id: 'technologies', title: 'Technologies'},
  ];
  const num = (id: string) => pad(sections.findIndex(x => x.id === id) + 1);

  return (
    <PageShell>
      <JsonLd
        data={[
          articleLd(pr),
          breadcrumbLd([
            {name: 'Home', path: '/'},
            {name: 'Work', path: '/work/'},
            {name: pr.title, path},
          ]),
        ]}
      />
      <header className={ui.pageHeader}>
        <div className={ui.pageHeaderGrid} aria-hidden="true" />
        <div className="cl-container">
          <div className={ui.crumbs}>
            <PageCrumbs items={[{label: 'Work', href: '/work/'}, {label: pr.title}]} />
          </div>
          <div className={`${ui.pageHeaderInner} ${w.caseHero}`}>
            <Eyebrow>{`Case study ${pad(idx + 1)} / ${pr.category}`}</Eyebrow>
            <h1 className={ui.h1}>{pr.title}</h1>
            <p className={ui.lead}>{pr.summary}</p>
            <div className={w.caseLinks}>
              {pr.demoUrl ? (
                <Button href={pr.demoUrl} target="_blank" rel="noopener" variant="primary" label="Visit the live site" />
              ) : null}
              {pr.repoUrl ? (
                <Button href={pr.repoUrl} target="_blank" rel="noopener" variant="secondary" label="View the source" />
              ) : null}
              {!pr.demoUrl && pr.evidence[0] ? (
                <Button href={pr.evidence[0].href} target="_blank" rel="noopener" variant="primary" label="Read the public write-up" />
              ) : null}
            </div>
            <dl className={w.caseFacts}>
              <div>
                <dt>Type</dt>
                <dd>
                  <TypeBadge type={pr.type} />
                </dd>
              </div>
              <div>
                <dt>Category</dt>
                <dd>{pr.category}</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd style={{textTransform: 'capitalize'}}>{pr.status}</dd>
              </div>
              <div>
                <dt>Built by</dt>
                <dd>{site.founder.name}</dd>
              </div>
            </dl>
          </div>
          {pr.screenshot ? (
            <div className={w.caseShot}>
              <Screenshot project={pr} priority sizes="(min-width: 1240px) 1160px, 100vw" />
            </div>
          ) : null}
        </div>
      </header>

      <Section rule={false}>
        <div className={w.caseLayout}>
          <nav className={w.toc} aria-label="On this page">
            <Eyebrow>On this page</Eyebrow>
            <ol>
              {sections.map((x, i) => (
                <li key={x.id}>
                  <a href={`#${x.id}`}>
                    <span>{pad(i + 1)}</span>
                    {x.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <div>
            <section id="context" className={w.caseBlock} aria-labelledby="context-h">
              <h2 id="context-h">
                <span>{num('context')}</span>Context
              </h2>
              <p>{cs.context}</p>
            </section>
            <section id="problem" className={w.caseBlock} aria-labelledby="problem-h">
              <h2 id="problem-h">
                <span>{num('problem')}</span>Problem
              </h2>
              <p>{cs.problem}</p>
            </section>
            <section id="objective" className={w.caseBlock} aria-labelledby="objective-h">
              <h2 id="objective-h">
                <span>{num('objective')}</span>Objective
              </h2>
              <p>{cs.objective}</p>
            </section>
            <section id="work" className={w.caseBlock} aria-labelledby="work-h">
              <h2 id="work-h">
                <span>{num('work')}</span>Work performed
              </h2>
              <ol className={w.ruledList}>
                {cs.work.map((x, i) => (
                  <li key={x}>
                    <span aria-hidden="true">{pad(i + 1)}</span>
                    <span>{x}</span>
                  </li>
                ))}
              </ol>
            </section>
            <section id="decisions" className={w.caseBlock} aria-labelledby="decisions-h">
              <h2 id="decisions-h">
                <span>{num('decisions')}</span>Engineering decisions
              </h2>
              <ol className={w.ruledList}>
                {cs.decisions.map((x, i) => (
                  <li key={x}>
                    <span aria-hidden="true">{pad(i + 1)}</span>
                    <span>{x}</span>
                  </li>
                ))}
              </ol>
            </section>
            <section id="architecture" className={w.caseBlock} aria-labelledby="architecture-h">
              <h2 id="architecture-h">
                <span>{num('architecture')}</span>Architecture
              </h2>
              <ArchitectureDiagram parts={cs.architecture} title={pr.title} />
            </section>
            <section id="results" className={w.caseBlock} aria-labelledby="results-h">
              <h2 id="results-h">
                <span>{num('results')}</span>Results
              </h2>
              {cs.results.map(r => (
                <div key={r} className={w.resultCard}>
                  <p>{r}</p>
                  <p className={w.evidenceLabel}>Evidence</p>
                  <ul className={w.evidence}>
                    {pr.evidence.map(ev => (
                      <li key={ev.href}>
                        <Link href={ev.href} isExternalLink isStandalone>
                          {ev.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
            <section id="technologies" className={w.caseBlock} aria-labelledby="technologies-h">
              <h2 id="technologies-h">
                <span>{num('technologies')}</span>Technologies
              </h2>
              <TechChips items={pr.technologies} label={`${pr.title} technologies`} />
            </section>
          </div>
        </div>
      </Section>

      <Section labelledBy="more-cases">
        <h2 id="more-cases" className={ui.eyebrow} style={{marginBottom: 20}}>
          More case studies
        </h2>
        <nav className={w.pager} aria-label="Case studies">
          {prev ? (
            <NextLink href={`/work/${prev.slug}/`} className={w.pagerLink}>
              <span>Previous</span>
              <span>{prev.title}</span>
            </NextLink>
          ) : (
            <NextLink href="/work/" className={w.pagerLink}>
              <span>Back to</span>
              <span>All work</span>
            </NextLink>
          )}
          {next ? (
            <NextLink href={`/work/${next.slug}/`} className={`${w.pagerLink} ${w.pagerNext}`}>
              <span>Next</span>
              <span>{next.title}</span>
            </NextLink>
          ) : (
            <NextLink href="/work/" className={`${w.pagerLink} ${w.pagerNext}`}>
              <span>Back to</span>
              <span>All work</span>
            </NextLink>
          )}
        </nav>
      </Section>
      <ContactCta />
    </PageShell>
  );
}
