import {describe, expect, it} from 'vitest';
import {serializeJsonLd} from '@/components/seo/JsonLd';
import {buildLlmsTxt, buildPortfolio} from './discovery';
import {buildMetadata, serviceSlugs, sitePages} from './seo';
import {articleLd, breadcrumbLd, creativeWorkLd, organizationLd, projectLd, serviceLd, websiteLd} from './structured-data';
import {caseStudies, projects} from '@/data/projects';
import {services} from '@/data/services';

const ORIGIN = 'https://craftlayer-studio.github.io';

describe('buildMetadata', () => {
  it('sets canonical, Open Graph and Twitter fields with absolute URLs', () => {
    const m = buildMetadata({title: 'Work', description: 'Selected work', path: '/work/'});
    expect(m.alternates?.canonical).toBe(`${ORIGIN}/work/`);
    expect(m.openGraph).toMatchObject({url: `${ORIGIN}/work/`, title: 'Work', siteName: 'CraftLayer Studio'});
    expect(JSON.stringify(m.openGraph?.images)).toContain(`${ORIGIN}/brand/og-cover.png`);
    expect(m.twitter).toMatchObject({card: 'summary_large_image'});
  });
});

describe('sitePages', () => {
  it('uses unique paths with trailing slashes', () => {
    const paths = sitePages().map(p => p.path);
    expect(new Set(paths).size).toBe(paths.length);
    for (const p of paths) expect(p.endsWith('/')).toBe(true);
    for (const c of caseStudies) expect(paths).toContain(`/work/${c.slug}/`);
  });

  it('covers every service in src/data/services.ts', () => {
    const paths = sitePages().map(p => p.path);
    for (const s of services) expect(paths).toContain(`/services/${s.slug}/`);
    expect(services).toHaveLength(serviceSlugs.length);
  });
});

describe('serializeJsonLd', () => {
  it('cannot break out of a script tag', () => {
    const out = serializeJsonLd({'@type': 'Thing', name: '</script><script>alert(1)</script>'});
    expect(out).not.toContain('<');
    expect(out).not.toContain('>');
    expect(JSON.parse(out).name).toBe('</script><script>alert(1)</script>');
  });
});

describe('structured data', () => {
  const all = [
    organizationLd(),
    websiteLd(),
    serviceLd({name: 'Web development', description: 'Sites', path: '/services/web-development/'}),
    breadcrumbLd([{name: 'Home', path: '/'}, {name: 'Work', path: '/work/'}]),
    ...projects.map(projectLd),
    ...caseStudies.map(p => articleLd(p)),
  ];

  it('never emits ratings or reviews', () => {
    const text = JSON.stringify(all);
    for (const banned of ['aggregateRating', 'review', 'ratingValue']) expect(text).not.toContain(banned);
  });

  it('labels concept demos as fictional', () => {
    for (const p of projects.filter(x => x.type === 'concept-demo')) {
      expect(String(creativeWorkLd(p).description)).toMatch(/fictional concept/i);
    }
  });

  it('names the founder with public profiles', () => {
    const founder = organizationLd().founder as {name: string; sameAs: string[]};
    expect(founder.name).toBe('Shaswat Raj');
    expect(founder.sameAs).toContain('https://www.linkedin.com/in/sh20raj/');
  });

  it('dates case study articles', () => {
    for (const p of caseStudies) expect(articleLd(p).datePublished).toBe('2026-11-12');
  });
});

describe('discovery files', () => {
  it('llms.txt starts with an H1 and a blockquote summary', () => {
    const lines = buildLlmsTxt().split('\n');
    expect(lines[0]).toBe('# CraftLayer Studio');
    expect(lines[2].startsWith('> ')).toBe(true);
    expect(buildLlmsTxt()).toContain('## Case studies');
  });

  it('portfolio.json lists every project with its honest type', () => {
    const data = buildPortfolio();
    expect(data.projects).toHaveLength(projects.length);
    for (const p of data.projects) {
      expect(p).toHaveProperty('projectType');
      expect(p).toHaveProperty('technologies');
    }
    expect(JSON.parse(JSON.stringify(data)).organization.name).toBe('CraftLayer Studio');
  });
});
