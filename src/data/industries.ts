/**
 * Industries we design for. `demo` points at a fictional concept demo in
 * src/data/projects.ts; those are always labelled as concept demos, never
 * as client work.
 */
export type Industry = {
  slug: string;
  name: string;
  summary: string;
  /** Typical needs we design for in this sector. */
  needs: string[];
  /** Slug of a concept demo project, if one exists. */
  demo?: string;
};

export const industries: Industry[] = [
  {
    slug: 'fitness',
    name: 'Fitness',
    summary: 'Gyms and studios that need timetables, memberships and trial bookings people can use on their phone.',
    needs: ['Class timetables with filters', 'Membership and pricing pages', 'Trial and class booking requests'],
    demo: 'forge-fitness',
  },
  {
    slug: 'restaurants-hospitality',
    name: 'Restaurants & hospitality',
    summary: 'Venues that want menus, ordering and reservations to be quick on mobile and easy to update.',
    needs: ['Filterable menus with dietary labels', 'Online ordering flows', 'Reservation requests with validation'],
    demo: 'juniper-kitchen',
  },
  {
    slug: 'healthcare',
    name: 'Healthcare',
    summary: 'Clinics and practices that need clear service information and accessible appointment requests.',
    needs: ['Specialty and clinician pages', 'Accessible multi-step appointment requests', 'Plain-language FAQs'],
    demo: 'northstar-clinic',
  },
  {
    slug: 'startups',
    name: 'Startups',
    summary: 'Founders who need a first product version, a marketing site and an architecture that can grow.',
    needs: ['Scoped first releases', 'Product and marketing sites', 'Edge and serverless infrastructure'],
    demo: 'pulsegrid',
  },
  {
    slug: 'education',
    name: 'Education',
    summary: 'Student communities, campus tools and event platforms where verification and reliability matter.',
    needs: ['Verified-member communities', 'Event registration and entry', 'Content and resource libraries'],
    demo: 'quillmark-academy',
  },
  {
    slug: 'professional-services',
    name: 'Professional services',
    summary: 'Consultancies, agencies and firms that need a credible site and tools that cut admin work.',
    needs: ['Credible service websites', 'Enquiry and intake forms', 'Workflow automation'],
    demo: 'halden-rowe',
  },
];
