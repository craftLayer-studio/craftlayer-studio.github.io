import {buildLlmsTxt} from '@/lib/discovery';

// Static route handler: emitted as out/llms.txt at build time.
// Format: https://llmstxt.org/ (experimental; not a search ranking factor).
export const dynamic = 'force-static';

export function GET() {
  return new Response(buildLlmsTxt(), {headers: {'Content-Type': 'text/plain; charset=utf-8'}});
}
