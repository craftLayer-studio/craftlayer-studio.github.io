import {buildMetadata} from '@/lib/seo';
import {breadcrumbLd} from '@/lib/structured-data';
import {JsonLd} from '@/components/seo/JsonLd';
import {PageShell} from '@/components/layout/PageShell';
import {PageHeader} from '@/components/ui/PageHeader';
import {Accent, Section, SectionHead} from '@/components/ui/primitives';
import {ContactCta, ProcessList} from '@/components/home/sections';
import p from '@/components/pages/pages.module.css';

export const metadata = buildMetadata({
  title: 'Process',
  description:
    'How CraftLayer Studio works: Discover, Plan, Design, Build, Validate, Deploy and Improve, with working software on staging early and often.',
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
        data={breadcrumbLd([
          {name: 'Home', path: '/'},
          {name: 'Process', path: '/process/'},
        ])}
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
      <ContactCta />
    </PageShell>
  );
}
