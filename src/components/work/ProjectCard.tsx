import Image from 'next/image';
import NextLink from 'next/link';
import {Link} from '@astryxdesign/core/Link';
import {VisuallyHidden} from '@astryxdesign/core/VisuallyHidden';
import type {Project} from '@/data/projects';
import {ArrowIcon, TechChips, TypeBadge} from '@/components/ui/primitives';
import s from './work.module.css';

function hostOf(url: string) {
  try {
    return new URL(url).host;
  } catch {
    return url;
  }
}

/** Browser-framed screenshot with fixed dimensions to avoid layout shift. */
export function Screenshot({
  project,
  priority = false,
  sizes = '(min-width: 1100px) 560px, (min-width: 700px) 50vw, 100vw',
}: {
  project: Project;
  priority?: boolean;
  sizes?: string;
}) {
  if (!project.screenshot) return null;
  const source = project.demoUrl ?? project.evidence[0]?.href;
  const host = source ? hostOf(source) : project.title;
  const isConcept = project.type === 'concept-demo';
  return (
    <figure className={s.frame}>
      <div className={s.frameBar} aria-hidden="true">
        <span className={s.frameDots}>
          <i />
          <i />
          <i />
        </span>
        <span className={s.frameUrl}>{host}</span>
      </div>
      <div className={s.frameShot}>
        <Image
          src={project.screenshot}
          alt={`Screenshot of the ${project.title}${isConcept ? ' concept demo' : ''} home page`}
          width={1280}
          height={800}
          sizes={sizes}
          priority={priority}
          loading={priority ? undefined : 'lazy'}
        />
      </div>
    </figure>
  );
}

export function ProjectCard({
  project,
  headingLevel = 3,
  compact = false,
}: {
  project: Project;
  headingLevel?: 2 | 3;
  compact?: boolean;
}) {
  const H = headingLevel === 2 ? 'h2' : 'h3';
  const isConcept = project.type === 'concept-demo';
  return (
    <article className={`${s.card} ${compact ? s.cardCompact : ''}`}>
      {project.screenshot ? <Screenshot project={project} /> : <div className={s.noShot} aria-hidden="true" />}
      <div className={s.cardBody}>
        <div className={s.cardMeta}>
          <TypeBadge type={project.type} />
          <span className={s.cardCategory}>{project.category}</span>
        </div>
        <H className={s.cardTitle}>{project.title}</H>
        <p className={s.cardSummary}>
          {project.summary}
        </p>
        {compact ? null : <TechChips items={project.technologies} label={`${project.title} technologies`} />}
        <ul className={s.cardLinks}>
          {project.caseStudy ? (
            <li>
              <NextLink href={`/work/${project.slug}/`} className={s.caseLink}>
                Read the case study <VisuallyHidden>for {project.title}</VisuallyHidden>
                <ArrowIcon />
              </NextLink>
            </li>
          ) : null}
          {project.demoUrl ? (
            <li>
              <Link href={project.demoUrl} isExternalLink isStandalone type="label">
                {isConcept ? 'Open concept demo' : 'Live site'}
                <VisuallyHidden>: {project.title}</VisuallyHidden>
              </Link>
            </li>
          ) : null}
          {project.repoUrl ? (
            <li>
              <Link href={project.repoUrl} isExternalLink isStandalone type="label" color="secondary">
                Source
                <VisuallyHidden>: {project.title}</VisuallyHidden>
              </Link>
            </li>
          ) : null}
        </ul>
      </div>
    </article>
  );
}
