import NextLink from 'next/link';
import {LogoWordmark} from '@/components/brand/Logo';
import {nav, site} from '@/lib/site';
import {services} from '@/data/services';
import s from './layout.module.css';

const year = new Date().getFullYear();

export function SiteFooter() {
  const elsewhere = [
    {label: 'GitHub organisation', href: site.githubOrg},
    {label: 'Founder on GitHub', href: site.founder.github},
    {label: 'Scriptly store', href: site.scriptlyUrl},
  ];
  return (
    <footer className={s.footer}>
      <div className="cl-container">
        <div className={s.footerTop}>
          <div className={s.footerBrand}>
            <NextLink href="/" aria-label={`${site.name} home`} className={s.footerLogo}>
              <LogoWordmark height={28} tone="dark" />
            </NextLink>
            <p className={s.footerBlurb}>
              A founder-led studio that designs and engineers websites, SaaS products and AI-powered applications.
            </p>
            <a className={s.footerEmail} href={`mailto:${site.contactEmail}`}>
              {site.contactEmail}
            </a>
          </div>

          <nav aria-label="Footer" className={s.footerCols}>
            <div>
              <h2 className={s.footerHeading}>Studio</h2>
              <ul className={s.footerList}>
                {nav.map(item => (
                  <li key={item.href}>
                    <NextLink href={item.href}>{item.label}</NextLink>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className={s.footerHeading}>Services</h2>
              <ul className={s.footerList}>
                {services.map(sv => (
                  <li key={sv.slug}>
                    <NextLink href={`/services/${sv.slug}/`}>{sv.name}</NextLink>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className={s.footerHeading}>Elsewhere</h2>
              <ul className={s.footerList}>
                {elsewhere.map(l => (
                  <li key={l.href}>
                    <a href={l.href} rel="noopener">
                      {l.label}
                    </a>
                  </li>
                ))}
                <li>
                  <NextLink href="/contact/">Contact</NextLink>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div className={s.footerBottom}>
          <p>
            © {year} {site.name}. Founder-led by {site.founder.name}.
          </p>
          <ul className={s.footerLegal}>
            <li>
              <NextLink href="/privacy/">Privacy</NextLink>
            </li>
            <li>
              <NextLink href="/terms/">Terms</NextLink>
            </li>
            <li>
              Built with Next.js and Astryx,{' '}
              <a href={site.websiteRepo} rel="noopener">
                source on GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
