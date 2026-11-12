import NextLink from 'next/link';
import {buildMetadata} from '@/lib/seo';
import {site} from '@/lib/site';
import {breadcrumbLd} from '@/lib/structured-data';
import {JsonLd} from '@/components/seo/JsonLd';
import {PageShell} from '@/components/layout/PageShell';
import {PageHeader} from '@/components/ui/PageHeader';
import {Accent, Section} from '@/components/ui/primitives';
import {ContactForm} from '@/components/contact/ContactForm';
import c from '@/components/contact/contact.module.css';

export const metadata = buildMetadata({
  title: 'Contact',
  description: `Start a project with CraftLayer Studio. Send an enquiry or email ${site.contactEmail} directly.`,
  path: '/contact/',
});

export default function ContactPage() {
  const usesEndpoint = Boolean(site.formEndpoint);
  return (
    <PageShell>
      <JsonLd
        data={breadcrumbLd([
          {name: 'Home', path: '/'},
          {name: 'Contact', path: '/contact/'},
        ])}
      />
      <PageHeader
        crumbs={[{label: 'Contact'}]}
        eyebrow="Contact / Start a project"
        title={
          <>
            Tell us what you are <Accent>building.</Accent>
          </>
        }
        lead="A few details help us reply with useful questions rather than a generic quote. All fields except company are required."
      />
      <Section rule={false}>
        <div className={c.layout}>
          <div className={c.panel}>
            <ContactForm />
          </div>
          <aside className={c.aside} aria-label="Other ways to reach us">
            <div className={c.asideBlock}>
              <h2>Email directly</h2>
              <a className={c.email} href={`mailto:${site.contactEmail}`}>
                {site.contactEmail}
              </a>
              <p>Prefer your own email app? Write to this address with the same details.</p>
            </div>
            <div className={c.asideBlock}>
              <h2>What happens next</h2>
              <ol>
                <li>The founder reads your enquiry personally.</li>
                <li>You get a reply with questions or a suggested next step.</li>
                <li>If it is a fit, we agree a written scope before any work starts.</li>
              </ol>
            </div>
            <div className={c.asideBlock}>
              <h2>Your data</h2>
              <p>
                {usesEndpoint
                  ? 'The form sends your details to our form provider, which forwards them to our inbox.'
                  : 'This site has no server or database. The form opens your email app; nothing is stored by this website.'}{' '}
                See the <NextLink href="/privacy/">privacy notice</NextLink>.
              </p>
            </div>
          </aside>
        </div>
      </Section>
    </PageShell>
  );
}
