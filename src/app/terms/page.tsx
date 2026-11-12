import NextLink from 'next/link';
import {buildMetadata} from '@/lib/seo';
import {site} from '@/lib/site';
import {breadcrumbLd} from '@/lib/structured-data';
import {JsonLd} from '@/components/seo/JsonLd';
import {PageShell} from '@/components/layout/PageShell';
import {PageHeader} from '@/components/ui/PageHeader';
import {Prose, Section} from '@/components/ui/primitives';

export const metadata = buildMetadata({
  title: 'Terms of use',
  description: 'Terms for using the CraftLayer Studio website, including concept demos, content, intellectual property and external links.',
  path: '/terms/',
});

export default function TermsPage() {
  return (
    <PageShell>
      <JsonLd
        data={breadcrumbLd([
          {name: 'Home', path: '/'},
          {name: 'Terms', path: '/terms/'},
        ])}
      />
      <PageHeader crumbs={[{label: 'Terms'}]} eyebrow="Legal / Last updated 12 November 2026" title="Terms of use" />
      <Section rule={false}>
        <Prose>
          <h2>About these terms</h2>
          <p>
            These terms cover your use of this website, operated by {site.name}. They do not cover project work, which
            is always agreed separately in writing.
          </p>

          <h2>Concept demos are fictional</h2>
          <p>
            Forge Fitness, Juniper Kitchen and Northstar Clinic are fictional brands created to demonstrate design and
            engineering patterns. They are not real businesses or client projects. Their menus, timetables, people,
            prices and forms are illustrative: no booking, order or appointment made there is real, and their forms do
            not send data anywhere.
          </p>

          <h2>Content is provided as is</h2>
          <p>
            We work to keep the information on this site accurate and link claims to public evidence, but the content is
            provided as is, without warranties of any kind. It is general information, not a quote or an offer.
          </p>

          <h2>Intellectual property</h2>
          <p>
            Unless stated otherwise, the text, design and brand assets on this site belong to {site.name}. Source code
            published in public repositories is available under the licence stated in each repository. Screenshots of
            other products are shown to illustrate work on those products. Third-party names and trademarks belong to
            their owners.
          </p>

          <h2>External links</h2>
          <p>
            This site links to external sites, including live projects, GitHub, LinkedIn and Scriptly. We are not
            responsible for their content, availability or policies. Scriptly is a separate storefront with its own
            terms.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about these terms: <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>. See also the{' '}
            <NextLink href="/privacy/">privacy notice</NextLink>.
          </p>
        </Prose>
      </Section>
    </PageShell>
  );
}
