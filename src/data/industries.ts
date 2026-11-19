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
  /** Page title without the site suffix. Keep under 40 characters. */
  seoTitle: string;
  /** Meta description, 120-155 characters, no unevidenced claims. */
  metaDescription: string;
  /** Opening paragraph of /industries/[slug]/. */
  intro: string;
  /** What the concept demo lets you try. Each item must be visible in the live demo. */
  demoShows: string[];
  /** Service slugs from src/data/services.ts that usually apply. */
  services: string[];
  /** Real (non-concept) project slugs with related engineering, if any. */
  related?: string[];
};

export const industries: Industry[] = [
  {
    slug: 'fitness',
    name: 'Fitness',
    summary: 'Gyms and studios that need timetables, memberships and trial bookings people can use on their phone.',
    needs: ['Class timetables with filters', 'Membership and pricing pages', 'Trial and class booking requests'],
    demo: 'forge-fitness',
    seoTitle: 'Gym and fitness website design',
    metaDescription: 'Website design for gyms and fitness studios: filterable class timetables, membership pricing and trial booking requests. Try the Forge Fitness demo.',
    intro: 'A gym website has three jobs: show which classes run and when, explain memberships without small print, and make a trial session easy to request from a phone. We design those flows first and build the brand around them.',
    demoShows: ['Programme cards that pre-filter the class timetable', 'Timetable filtered by day, programme and intensity, with an empty state', 'Membership tiers with a monthly and annual switch that recalculates prices', 'Trial booking form with an error summary and a date limited to the class weekday'],
    services: ['web-development'],
  },
  {
    slug: 'restaurants-hospitality',
    name: 'Restaurants & hospitality',
    summary: 'Venues that want menus, ordering and reservations to be quick on mobile and easy to update.',
    needs: ['Filterable menus with dietary labels', 'Online ordering flows', 'Reservation requests with validation'],
    demo: 'juniper-kitchen',
    seoTitle: 'Restaurant website design',
    metaDescription: 'Restaurant website design with filterable menus, dietary labels, pickup ordering and validated table reservations. Try the Juniper Kitchen demo.',
    intro: 'Most restaurant visits start on a phone: someone checks the menu, the opening hours and whether there is a table. We design menus that are quick to scan and filter, and ordering and reservation flows that only offer times you are actually open.',
    demoShows: ['Menu with category tabs, dietary filters and accent-insensitive search', 'Mock pickup order with a cart drawer, quantities and pickup-time validation', 'Table reservations limited to open days, with time slots from opening hours', 'Confirmation messages that say clearly nothing was ordered or paid'],
    services: ['web-development', 'e-commerce'],
  },
  {
    slug: 'healthcare',
    name: 'Healthcare',
    summary: 'Clinics and practices that need clear service information and accessible appointment requests.',
    needs: ['Specialty and clinician pages', 'Accessible multi-step appointment requests', 'Plain-language FAQs'],
    demo: 'northstar-clinic',
    seoTitle: 'Clinic and healthcare website design',
    metaDescription: 'Website design for clinics and practices: specialty and clinician pages, plain-language FAQs and accessible multi-step appointment requests.',
    intro: 'Patients arrive anxious or in a hurry, and some use assistive technology. A clinic site should explain services in plain language, help people find the right clinician and offer an appointment request that works with a keyboard and a screen reader.',
    demoShows: ['Specialty pages written without medical claims', 'Clinician directory with a working specialty filter', 'Multi-step appointment request where focus moves to each step heading', 'FAQ accordion and a clear notice that the clinic is not real'],
    services: ['web-development', 'custom-software'],
  },
  {
    slug: 'startups',
    name: 'Startups',
    summary: 'Founders who need a first product version, a marketing site and an architecture that can grow.',
    needs: ['Scoped first releases', 'Product and marketing sites', 'Edge and serverless infrastructure'],
    demo: 'pulsegrid',
    seoTitle: 'Startup and SaaS website design',
    metaDescription: 'Marketing sites and first product versions for startups: feature tours, pricing calculators and waitlist forms. Try the Pulsegrid concept demo.',
    intro: 'A startup usually needs two things at once: a marketing site that explains the product and a first version of the product itself. We scope both so the first release is small enough to ship and built on an architecture that does not need rewriting.',
    demoShows: ['Feature tour with tabs and a sample-data dashboard, labelled as sample data', 'Pricing calculator and plan comparison table', 'Validated waitlist form that sends nothing'],
    services: ['saas-development', 'web-development'],
    related: ['indexfast', 'sopkit'],
  },
  {
    slug: 'education',
    name: 'Education',
    summary: 'Student communities, campus tools and event platforms where verification and reliability matter.',
    needs: ['Verified-member communities', 'Event registration and entry', 'Content and resource libraries'],
    demo: 'quillmark-academy',
    seoTitle: 'Education and course website design',
    metaDescription: 'Websites for academies, course providers and student communities: searchable catalogues, cohort calendars and enrolment enquiries.',
    intro: 'Learners compare courses before they commit, so a catalogue has to be searchable and honest about what each course covers and when it runs. For student communities, verification and reliability matter as much as design.',
    demoShows: ['Searchable course catalogue with filters and a course detail dialog', 'Learning paths, cohort calendar and fictional instructors', 'Validated enrolment enquiry with a demo-only success state'],
    services: ['web-development', 'custom-software'],
    related: ['campusloop', 'bitotsav-2026'],
  },
  {
    slug: 'professional-services',
    name: 'Professional services',
    summary: 'Consultancies, agencies and firms that need a credible site and tools that cut admin work.',
    needs: ['Credible service websites', 'Enquiry and intake forms', 'Workflow automation'],
    demo: 'halden-rowe',
    seoTitle: 'Professional services website design',
    metaDescription: 'Websites for consultancies, accountants and advisory firms: practice areas, fee estimators and multi-step consultation requests.',
    intro: 'Buyers of professional services look for signs of competence: clear practice areas, a sense of what work costs and an easy way to start a conversation. We design sites that explain the work plainly and intake forms that collect what you need before the first call.',
    demoShows: ['Practice areas, process and audience sections', 'Fee estimator with illustrative sample pricing, labelled as not a quote', 'Multi-step consultation request'],
    services: ['web-development', 'business-automation'],
  },
  {
    slug: 'real-estate',
    name: 'Real estate',
    summary: 'Estate and letting agents who need listings people can search and compare, and a quick way to book viewings.',
    needs: ['Searchable, filterable listings', 'Listing detail pages with floor plans', 'Viewing requests and calculators'],
    demo: 'ashgrove-property',
    seoTitle: 'Estate agent website design',
    metaDescription: 'Website design for estate and letting agents: searchable property listings, floor plans, repayment estimators and viewing requests.',
    intro: 'People browsing property want to filter quickly, compare listings and book a viewing without phoning. We design listing search, detail pages and viewing requests that stay fast on a phone and keep your listings easy to update.',
    demoShows: ['Hero search by buy or rent, area, price and bedrooms that filters and sorts listings', 'Listing dialog with a front-elevation drawing and an illustrative floor plan', 'Repayment estimator labelled as illustrative, not financial advice', 'Viewing request with weekday dates and time slots'],
    services: ['web-development'],
  },
  {
    slug: 'beauty-wellness',
    name: 'Beauty & wellness',
    summary: 'Salons, spas and studios that want their service menu, team and appointment requests to feel as calm as a visit.',
    needs: ['Service menus with durations and prices', 'Team and specialist profiles', 'Appointment and gift card flows'],
    demo: 'fernlight-salon',
    seoTitle: 'Salon and spa website design',
    metaDescription: 'Website design for salons, spas and studios: service menus with durations and prices, specialist profiles, gift cards and appointment requests.',
    intro: 'Salon clients want to see what a treatment involves, how long it takes and what it costs before they ask for a time. We design service menus and appointment requests that respect your opening hours and the days off of each specialist.',
    demoShows: ['Tabbed service menu with durations and sample prices', 'Specialist profiles with a filter', 'Gift card builder with a live preview, where nothing is charged', 'Appointment request with dates that exclude closed days and specialist days off'],
    services: ['web-development', 'e-commerce'],
  },
  {
    slug: 'nonprofit',
    name: 'Nonprofits',
    summary: 'Charities and community groups that need clear programmes, simple donation forms and volunteer sign-up.',
    needs: ['Donation forms with one-off and monthly giving', 'Volunteer shift sign-up', 'Events and help directories'],
    demo: 'common-table',
    seoTitle: 'Charity and nonprofit website design',
    metaDescription: 'Website design for charities and community groups: clear programmes, one-off and monthly donation forms, volunteer sign-up and events.',
    intro: 'A charity site has to earn trust quickly and make giving, volunteering and finding help simple. We design donation and sign-up flows that are short and accessible, and we avoid impact numbers you cannot back up.',
    demoShows: ['Programme pages and an illustrative gift breakdown chart with a data-table alternative', 'Donation form for one-off or monthly gifts, where no payment is taken', 'Volunteer shift sign-up with role and day filters, plus events'],
    services: ['web-development', 'business-automation'],
  },
  {
    slug: 'ecommerce-retail',
    name: 'E-commerce & retail',
    summary: 'Independent shops and makers who need a fast storefront with filters, a clear cart and subscriptions.',
    needs: ['Filterable product catalogues', 'Cart and checkout flows', 'Subscription builders'],
    demo: 'brightwater-coffee',
    seoTitle: 'Independent shop website design',
    metaDescription: 'Online shop design for independent retailers and makers: filterable catalogues, product dialogs, clear carts and subscription builders.',
    intro: 'Independent shops win on product knowledge and care, and the storefront should show that. We design catalogues that are easy to filter, product pages that answer questions and carts that are clear about costs before checkout.',
    demoShows: ['Catalogue filtered by roast, process and tasting notes, with sorting', 'Product dialog and a mock cart drawer with a free-shipping threshold', 'Subscription builder and a brew ratio calculator'],
    services: ['e-commerce', 'web-development'],
  },
  {
    slug: 'legal',
    name: 'Law firms',
    summary: 'Solicitors and legal practices that need clear practice areas, transparent fixed fees and a confidential way to get in touch.',
    needs: ['Practice area pages', 'Fixed-fee estimators', 'Confidential enquiry forms'],
    demo: 'marlowe-pike',
    seoTitle: 'Law firm website design',
    metaDescription: 'Website design for solicitors and law firms: practice area pages, fixed-fee estimators and confidential enquiry forms. See the Marlowe & Pike demo.',
    intro: 'People contacting a law firm are often worried and want to know three things: whether you handle their matter, roughly what it costs and how to get in touch confidentially. We design practice area pages, fee explainers and enquiry forms around those questions.',
    demoShows: ['Practice area tabs', 'Fixed-fee conveyancing estimator with sample fees, VAT and disbursements', 'Fictional solicitor profiles with no invented credentials', 'Confidential enquiry form, with a clear note that the site is not legal advice'],
    services: ['web-development', 'business-automation'],
  },
  {
    slug: 'hospitality',
    name: 'Hotels & hospitality',
    summary: 'Boutique hotels and B&Bs that want to show rooms beautifully and take booking requests without heavy third-party widgets.',
    needs: ['Room collections with filters', 'Availability and rate calculators', 'Booking request flows'],
    demo: 'the-saltmarsh',
    seoTitle: 'Boutique hotel website design',
    metaDescription: 'Website design for boutique hotels and B&Bs: room collections with filters, rate calculators with minimum stays and direct booking requests.',
    intro: 'Guests choose a small hotel on feel as much as price, so rooms need to look good and load fast. We design room pages, rate explainers and booking requests that work without heavy third-party widgets.',
    demoShows: ['Stay search and filterable rooms with a detail dialog', 'Rate calculator with weekend uplift and minimum stays', 'Dining and spa tabs and an illustrated area guide', 'Booking request where nothing is booked or charged'],
    services: ['web-development'],
  },
  {
    slug: 'architecture',
    name: 'Architects & interiors',
    summary: 'Practices whose portfolio is the pitch: a project archive that loads fast and a structured way to start a brief.',
    needs: ['Filterable project archives', 'Process and fee explainers', 'Multi-step brief forms'],
    demo: 'ostrander-studio',
    seoTitle: 'Architect and interiors website design',
    metaDescription: 'Website design for architects and interior designers: filterable project archives, design stage explainers, fee guides and brief builders.',
    intro: 'For a practice, the portfolio is the pitch. We design project archives that load quickly and filter well, and a structured brief form so first conversations start with the right information.',
    demoShows: ['Filterable archive of fictional projects drawn as SVG axonometrics, with a project dialog', 'Design stage explainer and an illustrative fee guide', 'Five-step brief builder'],
    services: ['web-development'],
  },
  {
    slug: 'construction',
    name: 'Builders & trades',
    summary: 'Builders and renovators who need to explain services and rough costs clearly and turn visitors into site survey requests.',
    needs: ['Service pages', 'Cost estimators', 'Survey and quote requests'],
    demo: 'keystone-build',
    seoTitle: 'Builder and trades website design',
    metaDescription: 'Website design for builders, renovators and trades: clear service pages, cost estimators with sample ranges and site survey requests.',
    intro: 'Homeowners want to know what you do, roughly what it costs and how the job will run before they ask for a survey. We design service pages, honest cost ranges and survey requests that make that first step easy.',
    demoShows: ['Service tabs and a process timeline', 'Extension cost estimator with sample ranges', 'Fictional sample projects, an FAQ and a site survey request form'],
    services: ['web-development', 'business-automation'],
  },
  {
    slug: 'dental',
    name: 'Dental practices',
    summary: 'Private dental and aesthetics practices that need clear treatment pages, honest price guidance and an easy consultation request.',
    needs: ['Treatment pages with price guidance', 'Payment plan explainers', 'Consultation requests'],
    demo: 'arbour-dental',
    seoTitle: 'Dental practice website design',
    metaDescription: 'Website design for private dental practices: treatment pages with price guidance, payment estimators and consultation requests. See the Arbour demo.',
    intro: 'New patients compare practices on what treatments you offer, what they roughly cost and how easy it is to book a first visit. We design treatment pages, price guidance and consultation flows around those questions, without outcome claims.',
    demoShows: ['Treatment tabs with illustrative sample prices', 'Monthly payment estimator labelled as not a credit offer', 'New patient journey and a fictional team without invented qualifications', 'Consultation request form with validation and a demo-only confirmation'],
    services: ['web-development'],
  },
  {
    slug: 'weddings',
    name: 'Wedding & event venues',
    summary: 'Wedding and event venues that need to show their spaces, explain packages and turn interest into viewing requests.',
    needs: ['Spaces and capacities', 'Package builders', 'Availability and viewing requests'],
    demo: 'hollin-barn',
    seoTitle: 'Wedding venue website design',
    metaDescription: 'Website design for wedding and event venues: spaces and capacities, package builders with clear pricing and viewing requests. See the Hollin Barn demo.',
    intro: 'Couples shortlist venues on the feel of the place, whether their numbers fit, the rough cost and which dates are free. We design venue pages, package builders and availability views that answer those before the first call.',
    demoShows: ['Spaces with ceremony, dining and evening capacities', 'Package builder with season, day, guests and add-ons at illustrative prices', 'Sample availability calendar that reprices the package for a chosen date', 'Viewing request form limited to viewing days'],
    services: ['web-development'],
  },
  {
    slug: 'automotive',
    name: 'Garages & automotive',
    summary: 'Independent garages and service centres that need clear service menus, price guidance and simple online booking requests.',
    needs: ['Service menus', 'Price estimators by vehicle', 'Booking and MOT reminder sign-up'],
    demo: 'torque-motors',
    seoTitle: 'Garage and MOT centre website design',
    metaDescription: 'Website design for independent garages: service menus, price estimators by vehicle and booking requests with MOT reminders. See the Torque & Co. demo.',
    intro: 'Drivers want to know what a service includes, roughly what it costs for their car and when they can bring it in. We design service menus, estimators and booking requests that answer those on a phone in the car park.',
    demoShows: ['Plate field that picks a sample vehicle class, with no DVLA lookup', 'Service tabs from interim service to EV health check', 'Service price estimator by vehicle class, engine and fuel', 'MOT reminder sign-up and booking request where nothing is sent'],
    services: ['web-development'],
  },
  {
    slug: 'veterinary',
    name: 'Veterinary practices',
    summary: 'Vet practices that need services by pet type, health plan explainers, opening hours and appointment requests.',
    needs: ['Services by pet type', 'Health plan calculators', 'Opening hours and appointment requests'],
    demo: 'meadowlark-vets',
    seoTitle: 'Veterinary practice website design',
    metaDescription: 'Website design for vet practices: services by pet type, health plan calculators, live opening hours and appointment requests. See the Meadowlark Vets demo.',
    intro: 'Pet owners look up a vet when something is worrying them, so hours, services and how to book need to be obvious. We design service pages, health plan explainers and appointment requests that stay calm and clear.',
    demoShows: ['Services filtered by dog, cat, rabbit and small pets', 'Health plan calculator with illustrative monthly prices', 'Open-now indicator from fictional opening hours', 'Appointment request form with validation'],
    services: ['web-development'],
  },
];

export const getIndustry = (slug: string) => industries.find(i => i.slug === slug);
