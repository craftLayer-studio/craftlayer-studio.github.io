import NextLink from 'next/link';
import {Link} from '@astryxdesign/core/Link';
import {buildMetadata} from '@/lib/seo';
import {site} from '@/lib/site';
import {breadcrumbLd, faqPageLd} from '@/lib/structured-data';
import {contributions} from '@/data/projects';
import {deliverables, faqs} from '@/data/process';
import {JsonLd} from '@/components/seo/JsonLd';
import {PageShell} from '@/components/layout/PageShell';
import {PageHeader} from '@/components/ui/PageHeader';
import {Accent, Section, SectionHead} from '@/components/ui/primitives';
import {ContactCta, ProcessList} from '@/components/home/sections';
import p from '@/components/pages/pages.module.css';

export const metadata = buildMetadata({
  title: 'How we work: process and deliverables',
  description:
    'How CraftLayer Studio works, from first call to launch: seven steps, what you receive, how quality is checked, and answers to common questions.',
  path: '/process/',
});

const principles = [
  {title: 'Written down', body: 'Scope, decisions and trade-offs are written down, so nothing depends on memory.'},
  {title: 'Small increments', body: 'You review real software on a staging URL, not slides, from the first weeks.'},
  {title: 'You own it', body: 'Code lives in a repository you can access, and you get everything at handover.'},
];

export default function ProcessPage() {
  return (
    <PageShell>
      <JsonLd
        data={[
          breadcrumbLd([
            {name: 'Home', path: '/'},
            {name: 'Process', path: '/process/'},
          ]),
          faqPageLd(faqs, '/process/'),
        ]}
      />
      <PageHeader
        crumbs={[{label: 'Process'}]}
        eyebrow="Process / Seven steps"
        title={
          <>
            From first call to <Accent>shipped.</Accent>
          </>
        }
        lead="A predictable rhythm for every engagement. The steps scale down for a small website and up for a SaaS product, but the order stays the same."
      />
      <Section rule={false} labelledBy="steps-title">
        <SectionHead label="The steps" id="steps-title" title="What happens, and what you receive" />
        <ProcessList headingLevel={3} detailed />
      </Section>
      <Section labelledBy="principles-title">
        <SectionHead label="Principles" id="principles-title" title="Three habits behind every step" />
        <div className={p.cols3}>
          {principles.map(x => (
            <div key={x.title} className={p.col}>
              <h3>{x.title}</h3>
              <p>{x.body}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section labelledBy="deliverables-title" id="deliverables">
        <SectionHead
          label="What you receive"
          id="deliverables-title"
          title="Standards every project ships with"
          intro="Described through practices you can already inspect in our public repositories, not promises."
        />
        <div className={p.cols3}>
          {deliverables.map(d => (
            <div key={d.title} className={p.col}>
              <h3>{d.title}</h3>
              <p>{d.body}</p>
              {d.evidence ? (
                <p className={p.evidence}>
                  <Link href={d.evidence.href} isExternalLink>
                    {d.evidence.label}
                  </Link>
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </Section>
      <Section labelledBy="verify-title">
        <div className={p.split}>
          <div className={p.stack}>
            <p className={p.sideLabel}>Check before you contact us</p>
            <h2 id="verify-title" className={p.h2}>
              Evidence you can verify
            </h2>
            <p className={p.body}>
              There are no client logos or testimonials on this site because we only show what can be checked. These are
              public. The industry demos are fictional concept sites, labelled as such on every page.
            </p>
          </div>
          <ul className={p.ruled}>
            <li>
              <span aria-hidden="true">01</span>
              <span>
                <Link href={site.demosRepo} isExternalLink>
                  Source code of all the industry concept demos
                </Link>
              </span>
            </li>
            <li>
              <span aria-hidden="true">02</span>
              <span>
                <Link href={site.websiteRepo} isExternalLink>
                  Source code of this website
                </Link>
              </span>
            </li>
            <li>
              <span aria-hidden="true">03</span>
              <span>
                <Link href={site.founder.proof} isExternalLink>
                  The founder&apos;s evidence index for published metrics
                </Link>
              </span>
            </li>
            {contributions.map((c, i) => (
              <li key={c.href}>
                <span aria-hidden="true">{String(i + 4).padStart(2, '0')}</span>
                <span>
                  <Link href={c.href} isExternalLink>
                    {c.label}
                  </Link>
                </span>
              </li>
            ))}
            <li>
              <span aria-hidden="true">{String(contributions.length + 4).padStart(2, '0')}</span>
              <span>
                <NextLink href="/about/">Who runs the studio, with public profile links</NextLink>
              </span>
            </li>
          </ul>
        </div>
      </Section>
      <Section labelledBy="faq-title" id="faq">
        <SectionHead label="Questions" id="faq-title" title="Common questions" />
        <dl className={p.faq}>
          {faqs.map(f => (
            <div key={f.question}>
              <dt>{f.question}</dt>
              <dd>{f.answer}</dd>
            </div>
          ))}
        </dl>
      </Section>
      <ContactCta />
    </PageShell>
  );
}
