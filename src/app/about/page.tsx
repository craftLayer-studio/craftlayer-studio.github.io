import {Button} from '@astryxdesign/core/Button';
import {Link} from '@astryxdesign/core/Link';
import {buildMetadata} from '@/lib/seo';
import {site} from '@/lib/site';
import {breadcrumbLd, founderLd} from '@/lib/structured-data';
import {JsonLd} from '@/components/seo/JsonLd';
import {contributions} from '@/data/projects';
import {PageShell} from '@/components/layout/PageShell';
import {PageHeader} from '@/components/ui/PageHeader';
import {Accent, Eyebrow, Section, SectionHead} from '@/components/ui/primitives';
import {ContactCta} from '@/components/home/sections';
import p from '@/components/pages/pages.module.css';

export const metadata = buildMetadata({
  title: 'About',
  description:
    'CraftLayer Studio is founded and run by Shaswat Raj, a software engineer in India. A small, founder-led, engineering-first studio with public evidence for its work.',
  path: '/about/',
});

const howWeWork = [
  {
    title: 'Founder-led',
    body: 'The studio is run by its founder, who scopes, designs and writes the code. You talk to the person doing the work, not an account manager.',
  },
  {
    title: 'Small on purpose',
    body: 'We take on a limited number of projects at a time. When a project needs a specialist skill we do not have, we say so before starting.',
  },
  {
    title: 'Engineering-first',
    body: 'Typed code, automated checks, accessible markup and documented decisions. The same standards as our public repositories.',
  },
];

export default function AboutPage() {
  return (
    <PageShell>
      <JsonLd
        data={[
          {'@context': 'https://schema.org', ...founderLd()},
          breadcrumbLd([
            {name: 'Home', path: '/'},
            {name: 'About', path: '/about/'},
          ]),
        ]}
      />
      <PageHeader
        crumbs={[{label: 'About'}]}
        eyebrow="About / Who runs the studio"
        title={
          <>
            A small studio with <Accent>public</Accent> proof.
          </>
        }
        lead="CraftLayer Studio is a founder-led software studio. There is no large team behind this page: the studio is run by its founder, works in the open, and links every claim to evidence you can check."
      />

      <Section rule={false} labelledBy="founder-title">
        <div className={p.founder} id="founder">
          <div className={p.stack}>
            <Eyebrow>Founder</Eyebrow>
            <h2 id="founder-title" className={p.founderName}>
              {site.founder.name}
            </h2>
            <p className={p.body}>
              Software engineer based in {site.founder.location}. Shaswat founded CraftLayer Studio and runs it
              day to day: scoping projects, designing interfaces and writing the code.
            </p>
            <p className={p.body}>
              To be transparent: he is also currently a B.Tech Computer Science and Engineering student at BIT Mesra.
              Studio work is planned around that, and timelines are agreed honestly up front.
            </p>
            <div className={p.links}>
              <Button href={site.founder.proof} target="_blank" rel="noopener" variant="primary" label="See the evidence index" />
              <Button href={site.founder.github} target="_blank" rel="noopener" variant="secondary" label="GitHub profile" />
            </div>
          </div>
          <dl className={p.facts}>
            <div>
              <dt>Role</dt>
              <dd>{site.founder.role}</dd>
            </div>
            <div>
              <dt>Based in</dt>
              <dd>{site.founder.location}</dd>
            </div>
            <div>
              <dt>Studies</dt>
              <dd>B.Tech CSE, BIT Mesra (current)</dd>
            </div>
            <div>
              <dt>GitHub</dt>
              <dd>
                <Link href={site.founder.github} isExternalLink>
                  playlikeboy
                </Link>
              </dd>
            </div>
            <div>
              <dt>Portfolio</dt>
              <dd>
                <Link href={site.founder.portfolio} isExternalLink>
                  playlikeboy.github.io
                </Link>
              </dd>
            </div>
            <div>
              <dt>Evidence</dt>
              <dd>
                <Link href={site.founder.proof} isExternalLink>
                  playlikeboy.github.io/proof
                </Link>
              </dd>
            </div>
            <div>
              <dt>LinkedIn</dt>
              <dd>
                <Link href={site.founder.linkedin} isExternalLink>
                  sh20raj
                </Link>
              </dd>
            </div>
          </dl>
        </div>
      </Section>

      <Section labelledBy="how-title">
        <SectionHead label="How the studio works" id="how-title" title="Small, founder-led and engineering-first" />
        <div className={p.cols3}>
          {howWeWork.map(x => (
            <div key={x.title} className={p.col}>
              <h3>{x.title}</h3>
              <p>{x.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section labelledBy="oss-title">
        <div className={p.split}>
          <div className={p.stack}>
            <p className={p.sideLabel}>Open source</p>
            <h2 id="oss-title" className={p.h2}>
              Upstream contributions
            </h2>
            <p className={p.body}>Merged changes to widely used open-source projects. Each links to the public pull request or commit.</p>
          </div>
          <ol className={p.ruled}>
            {contributions.map((c, i) => (
              <li key={c.href}>
                <span aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <span>
                  <Link href={c.href} isExternalLink>
                    {c.label}
                  </Link>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </Section>
      <ContactCta />
    </PageShell>
  );
}
