/**
 * Builders for AI/agent discovery files: /llms.txt (https://llmstxt.org/) and
 * /portfolio.json. Served by static route handlers in src/app. Experimental aid:
 * llms.txt is not a search ranking factor. Same facts as the pages, no extra claims.
 */
import {caseStudies, projects, projectTypeLabel} from '@/data/projects';
import {services} from '@/data/services';
import {absoluteUrl, nav, site} from './site';

/** Machine-readable portfolio. Same facts as the Work pages; no extra claims. */
export function buildPortfolio() {
  return {
    $comment:
      'Machine-readable portfolio of CraftLayer Studio. Project types are honest: concept-demo entries are fictional brands, not clients.',
    organization: {
      name: site.name,
      url: absoluteUrl('/'),
      description: site.description,
      github: site.githubOrg,
      email: site.contactEmail,
      founder: {
        name: site.founder.name,
        role: site.founder.role,
        github: site.founder.github,
        portfolio: site.founder.portfolio,
        linkedin: site.founder.linkedin,
        evidence: site.founder.proof,
      },
      products: [{name: 'Scriptly', url: site.scriptlyUrl}],
      demos: site.demosUrl,
    },
    projects: projects.map(p => ({
      slug: p.slug,
      title: p.title,
      summary: p.summary,
      category: p.category,
      projectType: p.type,
      projectTypeLabel: projectTypeLabel[p.type],
      status: p.status,
      technologies: p.technologies,
      demoUrl: p.demoUrl ?? null,
      repoUrl: p.repoUrl ?? null,
      caseStudyUrl: p.caseStudy ? absoluteUrl(`/work/${p.slug}/`) : null,
      evidence: p.evidence,
    })),
  };
}

export function buildLlmsTxt(): string {
  const lines: string[] = [];
  lines.push(`# ${site.name}`, '');
  lines.push(`> ${site.description} Founded and run by ${site.founder.name} (${site.founder.location}). Every claim on the site links to public evidence; concept demos are fictional and labelled as such.`, '');
  lines.push(
    'Contact by email at ' + site.contactEmail + ' or via the contact page. Work is listed only with public evidence; there are no invented clients, testimonials or metrics.',
    '',
  );

  lines.push('## Pages', '');
  for (const item of nav) lines.push(`- [${item.label}](${absoluteUrl(item.href)})`);
  lines.push('');

  lines.push('## Services', '');
  for (const service of services) lines.push(`- [${service.name}](${absoluteUrl(`/services/${service.slug}/`)}): ${service.short}`);
  lines.push('');

  lines.push('## Case studies', '');
  for (const p of caseStudies) lines.push(`- [${p.title}](${absoluteUrl(`/work/${p.slug}/`)}): ${p.summary}`);
  lines.push('');

  lines.push('## Projects', '');
  for (const p of projects) {
    const link = p.demoUrl ?? p.repoUrl ?? absoluteUrl('/work/');
    lines.push(`- [${p.title}](${link}): ${projectTypeLabel[p.type]}. ${p.summary}`);
  }
  lines.push('');

  lines.push('## Data', '');
  lines.push(`- [portfolio.json](${absoluteUrl('/portfolio.json')}): machine-readable list of projects with type, status, technologies and evidence links`);
  lines.push(`- [Sitemap](${absoluteUrl('/sitemap.xml')})`);
  lines.push('');

  lines.push('## Optional', '');
  lines.push(`- [Founder portfolio](${site.founder.portfolio})`);
  lines.push(`- [Evidence index](${site.founder.proof})`);
  lines.push(`- [GitHub organization](${site.githubOrg})`);
  lines.push(`- [Concept demos](${site.demosUrl}): fictional gym, restaurant and clinic sites`);
  lines.push(`- [Scriptly](${site.scriptlyUrl}): in-house product`);
  lines.push('');
  return lines.join('\n');
}

