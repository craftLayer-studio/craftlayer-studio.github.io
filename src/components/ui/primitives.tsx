import type {ReactNode} from 'react';
import {Badge} from '@astryxdesign/core/Badge';
import {projectTypeLabel, type ProjectType} from '@/data/projects';
import s from './ui.module.css';

/** Small mono label, e.g. "01 / Discover". */
export function Eyebrow({children, plain = false, as: Tag = 'p'}: {children: ReactNode; plain?: boolean; as?: 'p' | 'span'}) {
  return <Tag className={`${s.eyebrow} ${plain ? s.eyebrowPlain : ''}`}>{children}</Tag>;
}

/** Instrument Serif italic accent for one or two words in a headline. */
export function Accent({children}: {children: ReactNode}) {
  return <em className={s.serif}>{children}</em>;
}

export function ArrowIcon({size = 16, direction = 'right'}: {size?: number; direction?: 'right' | 'up-right'}) {
  return (
    <svg className={s.arrow} width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
      {direction === 'right' ? (
        <path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="M4.5 11.5l7-7M6 4.5h5.5V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  );
}

export function SectionHead({
  index,
  label,
  title,
  intro,
  id,
}: {
  index?: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
}) {
  return (
    <header className={s.sectionHead}>
      <div className={s.sectionHeadMain}>
        <Eyebrow>{index ? `${index} / ${label}` : label}</Eyebrow>
        <h2 className={s.h2} id={id}>
          {title}
        </h2>
      </div>
      {intro ? <p className={s.sectionIntro}>{intro}</p> : null}
    </header>
  );
}

export function Section({
  children,
  labelledBy,
  rule = true,
  className,
  id,
}: {
  children: ReactNode;
  labelledBy?: string;
  rule?: boolean;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`${s.section} ${rule ? s.sectionRule : ''} ${className ?? ''}`}>
      <div className="cl-container">{children}</div>
    </section>
  );
}

export function TechChips({items, label = 'Technologies'}: {items: readonly string[]; label?: string}) {
  return (
    <ul className={s.chips} aria-label={label}>
      {items.map(t => (
        <li key={t} className={s.chip}>
          {t}
        </li>
      ))}
    </ul>
  );
}

const typeVariant: Record<ProjectType, 'blue' | 'green' | 'purple' | 'orange' | 'teal'> = {
  'in-house-product': 'blue',
  'open-source': 'green',
  'community-project': 'purple',
  'concept-demo': 'orange',
  'client-engagement': 'teal',
};

/** Honest project type label, e.g. "Concept demonstration". */
export function TypeBadge({type}: {type: ProjectType}) {
  return <Badge variant={typeVariant[type]} label={projectTypeLabel[type]} />;
}

export function Prose({children}: {children: ReactNode}) {
  return <div className={s.prose}>{children}</div>;
}

export {s as uiStyles};
