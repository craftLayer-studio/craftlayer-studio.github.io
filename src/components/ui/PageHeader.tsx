import type {ReactNode} from 'react';
import {Breadcrumbs, BreadcrumbItem} from '@astryxdesign/core/Breadcrumbs';
import {Eyebrow} from './primitives';
import s from './ui.module.css';

export type Crumb = {label: string; href?: string};

/** Breadcrumb trail; the last crumb is the current page. Home is prepended. */
export function PageCrumbs({items}: {items: Crumb[]}) {
  const all: Crumb[] = [{label: 'Home', href: '/'}, ...items];
  return (
    <Breadcrumbs variant="supporting">
      {all.map((c, i) =>
        i === all.length - 1 ? (
          <BreadcrumbItem key={c.label} isCurrent>
            {c.label}
          </BreadcrumbItem>
        ) : (
          <BreadcrumbItem key={c.label} href={c.href}>
            {c.label}
          </BreadcrumbItem>
        ),
      )}
    </Breadcrumbs>
  );
}

/** Inner-page header: breadcrumbs, mono eyebrow, the page's single h1 and a lead. */
export function PageHeader({
  crumbs,
  eyebrow,
  title,
  lead,
  children,
}: {
  crumbs: Crumb[];
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className={s.pageHeader}>
      <div className={s.pageHeaderGrid} aria-hidden="true" />
      <div className="cl-container">
        <div className={s.crumbs}>
          <PageCrumbs items={crumbs} />
        </div>
        <div className={s.pageHeaderInner}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className={s.h1}>{title}</h1>
          {lead ? <p className={s.lead}>{lead}</p> : null}
          {children}
        </div>
      </div>
    </header>
  );
}
