'use client';

import {useState} from 'react';
import NextLink from 'next/link';
import {usePathname} from 'next/navigation';
import {Button} from '@astryxdesign/core/Button';
import {Icon} from '@astryxdesign/core/Icon';
import {MobileNav} from '@astryxdesign/core/MobileNav';
import {LogoWordmark} from '@/components/brand/Logo';
import {nav, site} from '@/lib/site';
import s from './layout.module.css';

const strip = (p: string) => (p.length > 1 ? p.replace(/\/+$/, '') : p);

/** True when `href` is the current page or a section the current page sits under. */
export function isActive(pathname: string, href: string): boolean {
  const current = strip(pathname || '/');
  const target = strip(href);
  if (target === '/') return current === '/';
  return current === target || current.startsWith(target + '/');
}

export function SiteHeader() {
  const pathname = usePathname() ?? '/';
  const [open, setOpen] = useState(false);
  const desktopItems = nav.filter(item => item.href !== '/' && item.href !== '/contact/');

  return (
    <header className={s.header}>
      <div className={`cl-container ${s.headerInner}`}>
        <NextLink href="/" className={s.brand} aria-label={`${site.name} home`}>
          <LogoWordmark height={26} />
        </NextLink>

        <nav aria-label="Primary" className={s.desktopNav}>
          <ul className={s.navList}>
            {desktopItems.map(item => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <NextLink href={item.href} className={s.navLink} aria-current={active ? 'page' : undefined}>
                    {item.label}
                  </NextLink>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={s.headerActions}>
          <span className={s.desktopCta}>
            <Button href="/contact/" variant="primary" label="Start a project" />
          </span>
          <span className={s.menuToggle}>
            <Button
              label="Open menu"
              isIconOnly
              variant="ghost"
              icon={<Icon icon="menu" />}
              onClick={() => setOpen(true)}
            />
          </span>
        </div>
      </div>

      <MobileNav isOpen={open} onOpenChange={setOpen} side="end" header={<LogoWordmark height={22} title={site.name} />}>
        <nav aria-label="Mobile" className={s.mobileNav}>
          <ul className={s.mobileList}>
            {nav.map((item, i) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <NextLink
                    href={item.href}
                    className={s.mobileLink}
                    aria-current={active ? 'page' : undefined}
                    onClick={() => setOpen(false)}
                  >
                    <span className={s.mobileIndex} aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {item.label}
                  </NextLink>
                </li>
              );
            })}
          </ul>
          <div className={s.mobileFoot}>
            <p className={s.mobileFootLabel}>Email</p>
            <a href={`mailto:${site.contactEmail}`} className={s.mobileEmail}>
              {site.contactEmail}
            </a>
          </div>
        </nav>
      </MobileNav>
    </header>
  );
}
