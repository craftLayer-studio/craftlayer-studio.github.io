import NextLink from 'next/link';
import {Button} from '@astryxdesign/core/Button';
import {Link} from '@astryxdesign/core/Link';
import {VisuallyHidden} from '@astryxdesign/core/VisuallyHidden';
import {caseStudies, getProject, projects} from '@/data/projects';
import {services} from '@/data/services';
import {industries} from '@/data/industries';
import {processSteps} from '@/data/process';
import {tech} from '@/data/tech';
import {site} from '@/lib/site';
import {Accent, ArrowIcon, Eyebrow, Section, SectionHead} from '@/components/ui/primitives';
import {ProjectCard} from '@/components/work/ProjectCard';
import {HeroVisual} from './HeroVisual';
import w from '@/components/work/work.module.css';
import s from './home.module.css';

const pad = (n: number) => String(n).padStart(2, '0');

export function Hero() {
  return (
    <section className={s.hero} aria-labelledby="hero-title">
      <div className={s.heroGrid} aria-hidden="true" />
      <div className={`cl-container ${s.heroInner}`}>
        <div className={s.heroCopy}>
          <Eyebrow>CraftLayer Studio / Digital product engineering</Eyebrow>
          <h1 id="hero-title" className={s.heroTitle}>
            Ideas deserve more than <Accent>prototypes.</Accent>
          </h1>
          <p className={s.heroLead}>
            We design and engineer websites, SaaS products and AI-powered applications that help ambitious businesses
            move forward.
          </p>
          <div className={s.heroCtas}>
            <Button href="/contact/" variant="primary" size="lg" label="Start a project" />
            <Button href="/work/" variant="secondary" size="lg" label="Explore our work" />
          </div>
          <ul className={s.heroFacts} aria-label="How the studio works">
            <li>
              <span>Founder-led</span> You work directly with the engineer building it.
            </li>
            <li>
              <span>Evidence first</span> Every project claim links to public proof.
            </li>
          </ul>
        </div>
        <HeroVisual />
      </div>
    </section>
  );
}

export function SelectedWork() {
  const featured = projects.filter(p => p.featured && p.type !== 'concept-demo');
  const concepts = projects.filter(p => p.featured && p.type === 'concept-demo');
  return (
    <Section labelledBy="work-title">
      <SectionHead
        index="01"
        label="Selected work"
        id="work-title"
        title={
          <>
            Shipped, public and <Accent>verifiable.</Accent>
          </>
        }
        intro="Products the founder has built and runs, community work, and concept demonstrations. Each card says honestly which is which, and links to the live site and source where they exist."
      />
      <div className={w.grid2}>
        {featured.map(p => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
      <div className={w.subhead}>
        <h3>Concept demonstrations</h3>
        <p>Fictional brands built to show how we approach common industries. Not client work.</p>
      </div>
      <div className={w.grid3}>
        {concepts.map(p => (
          <ProjectCard key={p.slug} project={p} compact />
        ))}
      </div>
      <p className={s.moreLink}>
        <NextLink href="/work/" className={s.textLink}>
          See all work <ArrowIcon />
        </NextLink>
      </p>
    </Section>
  );
}

export function ServicesList({headingLevel = 3}: {headingLevel?: 2 | 3}) {
  const H = headingLevel === 2 ? 'h2' : 'h3';
  return (
    <ol className={s.services}>
      {services.map((sv, i) => (
        <li key={sv.slug} className={s.service}>
          <NextLink href={`/services/${sv.slug}/`} className={s.serviceLink}>
            <span className={s.serviceIndex} aria-hidden="true">
              {pad(i + 1)}
            </span>
            <H className={s.serviceName}>{sv.name}</H>
            <p className={s.serviceShort}>{sv.short}</p>
            <span className={s.serviceArrow} aria-hidden="true">
              <ArrowIcon size={20} />
            </span>
          </NextLink>
        </li>
      ))}
    </ol>
  );
}

export function ServicesSection() {
  return (
    <Section labelledBy="services-title">
      <SectionHead
        index="02"
        label="Services"
        id="services-title"
        title={
          <>
            Six ways we help you <Accent>ship.</Accent>
          </>
        }
        intro="From a fast marketing site to a full SaaS product or an AI workflow, we scope carefully, build in small increments and hand over code you own."
      />
      <ServicesList />
    </Section>
  );
}

export function IndustriesList({headingLevel = 3}: {headingLevel?: 2 | 3}) {
  const H = headingLevel === 2 ? 'h2' : 'h3';
  return (
    <ul className={s.industries}>
      {industries.map((ind, i) => {
        const demo = ind.demo ? getProject(ind.demo) : undefined;
        return (
          <li key={ind.slug} className={s.industry}>
            <span className={s.industryIndex} aria-hidden="true">
              {pad(i + 1)}
            </span>
            <H className={s.industryName}>{ind.name}</H>
            <p className={s.industrySummary}>{ind.summary}</p>
            {demo?.demoUrl ? (
              <p className={s.industryDemo}>
                <span className={s.conceptTag}>Concept demo</span>
                <Link href={demo.demoUrl} isExternalLink isStandalone type="label">
                  {demo.title}
                  <VisuallyHidden> (fictional {ind.name.toLowerCase()} brand)</VisuallyHidden>
                </Link>
              </p>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}

export function IndustriesSection() {
  return (
    <Section labelledBy="industries-title" className={s.tinted}>
      <SectionHead
        index="03"
        label="Industries"
        id="industries-title"
        title={
          <>
            Built around how your sector <Accent>works.</Accent>
          </>
        }
        intro="We design for the realities of each sector. For fitness, hospitality and healthcare we have built fictional concept demos so you can try the patterns before we talk."
      />
      <IndustriesList />
    </Section>
  );
}

export function ProcessList({headingLevel = 3, detailed = false}: {headingLevel?: 2 | 3; detailed?: boolean}) {
  const H = headingLevel === 2 ? 'h2' : 'h3';
  return (
    <ol className={`${s.process} ${detailed ? s.processDetailed : ''}`}>
      {processSteps.map((step, i) => (
        <li key={step.slug} className={s.step} id={detailed ? step.slug : undefined}>
          <span className={s.stepIndex}>
            {pad(i + 1)} / {step.name}
          </span>
          <H className={s.stepName}>{step.name}</H>
          <p className={s.stepSummary}>{step.summary}</p>
          {detailed ? (
            <>
              <p className={s.stepOutLabel}>You receive</p>
              <ul className={s.stepOutputs}>
                {step.outputs.map(o => (
                  <li key={o}>{o}</li>
                ))}
              </ul>
            </>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

export function ProcessSection() {
  return (
    <Section labelledBy="process-title">
      <SectionHead
        index="04"
        label="Engineering process"
        id="process-title"
        title={
          <>
            Seven steps, no <Accent>surprises.</Accent>
          </>
        }
        intro="A predictable rhythm from first conversation to ongoing improvement. You see working software early and often."
      />
      <ProcessList />
      <p className={s.moreLink}>
        <NextLink href="/process/" className={s.textLink}>
          How each step works <ArrowIcon />
        </NextLink>
      </p>
    </Section>
  );
}

export function TechSection() {
  return (
    <Section labelledBy="tech-title" className={s.dark} rule={false}>
      <SectionHead
        index="05"
        label="Technology"
        id="tech-title"
        title={
          <>
            Tools we have <Accent>shipped</Accent> with.
          </>
        }
        intro="Only technology used in our public projects. Each entry names where it runs today."
      />
      <ul className={s.tech}>
        {tech.map(t => (
          <li key={t.name} className={s.techItem}>
            <span className={s.techArea}>{t.area}</span>
            <span className={s.techName}>{t.name}</span>
            <span className={s.techUsed}>
              Used in {t.usedIn.map(slug => getProject(slug)?.title ?? slug).join(', ')}
            </span>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function CaseStudiesTeaser() {
  return (
    <Section labelledBy="cases-title">
      <SectionHead
        index="06"
        label="Case studies"
        id="cases-title"
        title={
          <>
            The decisions behind the <Accent>build.</Accent>
          </>
        }
        intro="Context, problem, architecture and the engineering trade-offs, with every result tied to a public source."
      />
      <ol className={s.cases}>
        {caseStudies.map((p, i) => (
          <li key={p.slug}>
            <NextLink href={`/work/${p.slug}/`} className={s.caseRow}>
              <span className={s.caseIndex} aria-hidden="true">
                {pad(i + 1)}
              </span>
              <span className={s.caseTitle}>{p.title}</span>
              <span className={s.caseProblem}>{p.caseStudy?.problem}</span>
              <span className={s.caseCat}>{p.category}</span>
              <span className={s.caseArrow} aria-hidden="true">
                <ArrowIcon size={20} />
              </span>
            </NextLink>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export function ScriptlyShowcase({headingLevel = 2}: {headingLevel?: 1 | 2}) {
  const H = headingLevel === 1 ? 'h1' : 'h2';
  return (
    <section className={s.scriptly} aria-labelledby="scriptly-title">
      <div className={`cl-container ${s.scriptlyInner}`}>
        <div className={s.scriptlyCopy}>
          <Eyebrow>Products / Scriptly</Eyebrow>
          <H id="scriptly-title" className={s.scriptlyTitle}>
            Ready-to-use <Accent>digital products.</Accent>
          </H>
          <p className={s.scriptlyLead}>
            Scriptly is a separate storefront for ready-made digital products. It runs independently of studio
            client work, on its own site and under its own terms.
          </p>
          <div className={s.heroCtas}>
            <Button
              href={site.scriptlyUrl}
              target="_blank"
              rel="noopener"
              variant="primary"
              size="lg"
              label="Visit scriptly.store"
            />
          </div>
          <p className={s.scriptlyNote}>Opens scriptly.store, an external site, in a new tab.</p>
        </div>
        <div className={s.scriptlyArt} aria-hidden="true">
          <div className={s.pkg}>
            <span className={s.pkgTab}>scriptly.store</span>
            <span className={s.pkgLine} />
            <span className={s.pkgLine} style={{width: '62%'}} />
            <span className={s.pkgLine} style={{width: '78%'}} />
          </div>
          <div className={`${s.pkg} ${s.pkgB}`}>
            <span className={s.pkgTab}>ready to use</span>
            <span className={s.pkgLine} />
            <span className={s.pkgLine} style={{width: '54%'}} />
          </div>
        </div>
      </div>
    </section>
  );
}

export function ContactCta() {
  return (
    <section className={s.cta} aria-labelledby="cta-title">
      <svg className={s.ctaArt} viewBox="0 0 300 300" aria-hidden="true" focusable="false">
        <rect x="60" y="0" width="240" height="240" rx="18" fill="#8BDDC0" fillOpacity="0.5" />
        <rect x="30" y="30" width="240" height="240" rx="18" fill="#3A50E0" fillOpacity="0.9" />
        <rect x="0" y="60" width="240" height="240" rx="18" fill="#fff" stroke="#E4E7EC" />
        <g transform="translate(48 108) scale(6)">
          <path d="M6 0H24V6H0Z" fill="#101828" />
          <path d="M0 8H6V16H0Z" fill="#3A50E0" />
          <path d="M0 18H24V24H6Z" fill="#101828" />
        </g>
      </svg>
      <div className={`cl-container ${s.ctaInner}`}>
        <Eyebrow>Next step</Eyebrow>
        <h2 id="cta-title" className={s.ctaTitle}>
          Have an idea worth <Accent>building?</Accent>
        </h2>
        <p className={s.ctaLead}>
          Tell us what you are working on. You will hear back from the founder directly, usually with questions before
          a quote.
        </p>
        <div className={s.heroCtas}>
          <Button href="/contact/" variant="primary" size="lg" label="Start a project" />
          <Button href={`mailto:${site.contactEmail}`} variant="secondary" size="lg" label={`Email ${site.contactEmail}`} />
        </div>
      </div>
    </section>
  );
}
