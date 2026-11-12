/**
 * Pure validation and serialisation for the contact form. No DOM, no network:
 * covered by validate.test.ts.
 */
export type ContactValues = {
  name: string;
  email: string;
  company: string;
  service: string;
  description: string;
  budget: string;
  timeline: string;
  /** Honeypot. Real people never see or fill this field. */
  website: string;
};

export type ContactField = Exclude<keyof ContactValues, 'website'>;
export type ContactErrors = Partial<Record<ContactField, string>>;

export const emptyContact: ContactValues = {
  name: '',
  email: '',
  company: '',
  service: '',
  description: '',
  budget: '',
  timeline: '',
  website: '',
};

export const serviceOptions = [
  'Web development',
  'SaaS development',
  'AI applications',
  'E-commerce',
  'Business automation',
  'Custom software',
  'Something else',
] as const;

export const budgetOptions = [
  'Under US$2,000',
  'US$2,000 to US$5,000',
  'US$5,000 to US$15,000',
  'More than US$15,000',
  'Not sure yet',
] as const;

export const timelineOptions = [
  'As soon as possible',
  'Within 1 month',
  '1 to 3 months',
  '3 months or more',
  'Flexible',
] as const;

export const fieldLabels: Record<ContactField, string> = {
  name: 'Your name',
  email: 'Email address',
  company: 'Company or business',
  service: 'Service required',
  description: 'Project description',
  budget: 'Budget range',
  timeline: 'Timeline',
};

/** Order used for the error summary and focus management. */
export const fieldOrder: ContactField[] = ['name', 'email', 'company', 'service', 'description', 'budget', 'timeline'];

export const DESCRIPTION_MIN = 20;
export const DESCRIPTION_MAX = 4000;

// Pragmatic check: something@something.tld, no spaces. Real verification is a reply.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const description = values.description.trim();

  if (!name) errors.name = 'Enter your name.';
  else if (name.length > 120) errors.name = 'Name must be 120 characters or fewer.';

  if (!email) errors.email = 'Enter your email address.';
  else if (!EMAIL_RE.test(email)) errors.email = 'Enter an email address in the format name@example.com.';

  if (values.company.trim().length > 160) errors.company = 'Company must be 160 characters or fewer.';

  if (!values.service) errors.service = 'Choose the service you need.';
  else if (!(serviceOptions as readonly string[]).includes(values.service)) errors.service = 'Choose a service from the list.';

  if (!description) errors.description = 'Describe your project.';
  else if (description.length < DESCRIPTION_MIN)
    errors.description = `Add a little more detail (at least ${DESCRIPTION_MIN} characters).`;
  else if (description.length > DESCRIPTION_MAX)
    errors.description = `Keep the description under ${DESCRIPTION_MAX} characters.`;

  if (!values.budget) errors.budget = 'Choose a budget range, or "Not sure yet".';
  else if (!(budgetOptions as readonly string[]).includes(values.budget)) errors.budget = 'Choose a budget range from the list.';

  if (!values.timeline) errors.timeline = 'Choose a timeline.';
  else if (!(timelineOptions as readonly string[]).includes(values.timeline)) errors.timeline = 'Choose a timeline from the list.';

  return errors;
}

export function hasErrors(errors: ContactErrors): boolean {
  return Object.keys(errors).length > 0;
}

/** True when the hidden honeypot was filled in, which only bots do. */
export function isLikelySpam(values: ContactValues): boolean {
  return values.website.trim().length > 0;
}

/** Plain-text body shared by the email fallback. */
export function formatEnquiry(values: ContactValues): string {
  const line = (field: ContactField) => `${fieldLabels[field]}: ${values[field].trim() || 'Not provided'}`;
  return [
    line('name'),
    line('email'),
    line('company'),
    line('service'),
    line('budget'),
    line('timeline'),
    '',
    `${fieldLabels.description}:`,
    values.description.trim(),
  ].join('\n');
}

export function buildMailto(values: ContactValues, to: string): string {
  const subject = `Project enquiry: ${values.service || 'General'} from ${values.name.trim() || 'website visitor'}`;
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(formatEnquiry(values))}`;
}

/** JSON payload for a Formspree-compatible endpoint. The honeypot travels as `_gotcha`. */
export function buildPayload(values: ContactValues): Record<string, string> {
  return {
    name: values.name.trim(),
    email: values.email.trim(),
    company: values.company.trim(),
    service: values.service,
    description: values.description.trim(),
    budget: values.budget,
    timeline: values.timeline,
    _subject: `Project enquiry: ${values.service} from ${values.name.trim()}`,
    _replyto: values.email.trim(),
    _gotcha: values.website,
  };
}
