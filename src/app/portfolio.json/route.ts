import {buildPortfolio} from '@/lib/discovery';

// Static route handler: emitted as out/portfolio.json at build time.
export const dynamic = 'force-static';

export function GET() {
  return Response.json(buildPortfolio());
}
