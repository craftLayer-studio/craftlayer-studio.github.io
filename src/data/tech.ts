/**
 * Technology we can point to in shipped work. Only list tools evidenced by a
 * project in src/data/projects.ts (or its public repository).
 */
export type Tech = {name: string; area: 'Frontend' | 'Backend' | 'Data' | 'Edge' | 'AI & tooling' | 'Delivery'; usedIn: string[]};

export const tech: Tech[] = [
  {name: 'Next.js', area: 'Frontend', usedIn: ['campusloop', 'sketchflow', 'picser']},
  {name: 'React', area: 'Frontend', usedIn: ['sketchflow']},
  {name: 'TypeScript', area: 'Frontend', usedIn: ['campusloop', 'indexfast', 'sketchflow', 'picser']},
  {name: 'PostgreSQL', area: 'Data', usedIn: ['campusloop', 'bitotsav-2026']},
  {name: 'Redis', area: 'Data', usedIn: ['bitotsav-2026']},
  {name: 'Cloudflare Workers', area: 'Edge', usedIn: ['campusloop', 'indexfast', 'sketchflow']},
  {name: 'Hono', area: 'Edge', usedIn: ['indexfast']},
  {name: 'WebSockets', area: 'Edge', usedIn: ['campusloop']},
  {name: 'MCP', area: 'AI & tooling', usedIn: ['indexfast', 'video-studio']},
  {name: 'Python', area: 'AI & tooling', usedIn: ['video-studio']},
  {name: 'FFmpeg', area: 'AI & tooling', usedIn: ['video-studio']},
  {name: 'GitHub Actions', area: 'Delivery', usedIn: ['universal-filter-engine']},
];
