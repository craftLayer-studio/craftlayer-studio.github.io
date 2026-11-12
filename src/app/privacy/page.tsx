import NextLink from 'next/link';
import {buildMetadata} from '@/lib/seo';
import {site} from '@/lib/site';
import {breadcrumbLd} from '@/lib/structured-data';
import {JsonLd} from '@/components/seo/JsonLd';
import {PageShell} from '@/components/layout/PageShell';
import {PageHeader} from '@/components/ui/PageHeader';
import {Prose, Section} from '@/components/ui/primitives';

export const metadata = buildMetadata({
  title: 'Privacy notice',
  description:
    'How the CraftLayer Studio website handles data: no analytics, no cookies, self-hosted fonts, and contact form details sent only by email or a form provider.',
  path: '/privacy/',
});

export default function PrivacyPage() {
  return (
    <PageShell>
      <JsonLd
        data={breadcrumbLd([
          {name: 'Home', path: '/'},
          {name: 'Privacy', path: '/privacy/'},
        ])}
      />
      <PageHeader crumbs={[{label: 'Privacy'}]} eyebrow="Legal / Last updated 12 November 2026" title="Privacy notice" />
      <Section rule={false}>
        <Prose>
          <h2>Who we are</h2>
          <p>
            This website is operated by {site.name}, a founder-led studio run by {site.founder.name} in{' '}
            {site.founder.location}. For any privacy question or request, email{' '}
            <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
          </p>

          <h2>What this website collects</h2>
          <p>
            Very little. This is a static website: there is no application server, no database and no user accounts.
          </p>
          <ul>
            <li>No analytics or tracking scripts are loaded.</li>
            <li>The site does not set cookies.</li>
            <li>
              Fonts are self-hosted with the site files, so loading a page does not send a request to a font provider.
            </li>
          </ul>

          <h2>The contact form</h2>
          <p>
            The details you type into the <NextLink href="/contact/">contact form</NextLink> (name, email, company,
            service, project description, budget and timeline) are used only to reply to your enquiry. Where they go
            depends on how the site is configured:
          </p>
          <ul>
            <li>
              <strong>Email app (default).</strong> Submitting opens your own email app with the enquiry filled in.
              Nothing is sent or stored by this website; the message is only sent if you press send, and it is then
              handled by your email provider and ours.
            </li>
            <li>
              <strong>Form provider.</strong> If a hosted form service is enabled, such as Formspree, your details are
              sent to that provider, which forwards them to our inbox. The provider processes the data under its own
              terms; see the{' '}
              <a href="https://formspree.io/legal/privacy-policy/" rel="noopener">
                Formspree privacy policy
              </a>
              .
            </li>
          </ul>
          <p>We keep enquiry emails only as long as needed to respond and to keep a record of any resulting project.</p>

          <h2>Hosting</h2>
          <p>
            The site is hosted on GitHub Pages. GitHub may log technical information such as IP addresses when pages
            are requested, for security and operation of the service. See the{' '}
            <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" rel="noopener">
              GitHub General Privacy Statement
            </a>
            .
          </p>

          <h2>External links</h2>
          <p>
            Pages link to other sites, including project demos, GitHub, LinkedIn and Scriptly. Those sites have their
            own privacy practices, which this notice does not cover.
          </p>

          <h2>Your rights and requests</h2>
          <p>
            You can ask what we hold about you, ask for a correction, or ask us to delete your enquiry emails. Write to{' '}
            <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a> and we will respond.
          </p>

          <h2>Changes</h2>
          <p>If this notice changes, the date at the top of the page will be updated.</p>
        </Prose>
      </Section>
    </PageShell>
  );
}
