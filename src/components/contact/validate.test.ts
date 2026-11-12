import {describe, expect, it} from 'vitest';
import {
  buildMailto,
  buildPayload,
  emptyContact,
  formatEnquiry,
  hasErrors,
  isLikelySpam,
  validateContact,
  type ContactValues,
} from './validate';

const valid: ContactValues = {
  name: 'Asha Rao',
  email: 'asha@example.com',
  company: 'Rao & Co',
  service: 'Web development',
  description: 'We need a new website for our design consultancy with a project gallery.',
  budget: 'Not sure yet',
  timeline: 'Flexible',
  website: '',
};

describe('validateContact', () => {
  it('accepts a complete enquiry', () => {
    expect(validateContact(valid)).toEqual({});
    expect(hasErrors(validateContact(valid))).toBe(false);
  });

  it('flags every required field on an empty form', () => {
    const errors = validateContact(emptyContact);
    expect(Object.keys(errors).sort()).toEqual(['budget', 'description', 'email', 'name', 'service', 'timeline']);
  });

  it('treats company as optional', () => {
    expect(validateContact({...valid, company: ''}).company).toBeUndefined();
  });

  it('rejects malformed email addresses', () => {
    for (const email of ['asha', 'asha@', 'asha@example', 'a sha@example.com', '@example.com']) {
      expect(validateContact({...valid, email}).email, email).toMatch(/format/);
    }
  });

  it('trims whitespace before checking required fields', () => {
    expect(validateContact({...valid, name: '   '}).name).toBe('Enter your name.');
  });

  it('requires a meaningful description', () => {
    expect(validateContact({...valid, description: 'Website pls'}).description).toMatch(/at least 20/);
    expect(validateContact({...valid, description: 'x'.repeat(4001)}).description).toMatch(/under 4000/);
  });

  it('only accepts listed options for selects', () => {
    expect(validateContact({...valid, service: 'Hacking'}).service).toBeDefined();
    expect(validateContact({...valid, budget: '1 million'}).budget).toBeDefined();
    expect(validateContact({...valid, timeline: 'yesterday'}).timeline).toBeDefined();
  });

  it('accepts "Not sure yet" as a budget', () => {
    expect(validateContact({...valid, budget: 'Not sure yet'}).budget).toBeUndefined();
  });
});

describe('honeypot', () => {
  it('detects a filled honeypot', () => {
    expect(isLikelySpam(valid)).toBe(false);
    expect(isLikelySpam({...valid, website: 'http://spam.example'})).toBe(true);
  });
});

describe('serialisation', () => {
  it('builds an encoded mailto link with every field', () => {
    const url = buildMailto(valid, 'studio@example.com');
    expect(url.startsWith('mailto:studio@example.com?subject=')).toBe(true);
    const body = decodeURIComponent(url.split('&body=')[1]);
    expect(body).toContain('Your name: Asha Rao');
    expect(body).toContain('Company or business: Rao & Co');
    expect(body).toContain('Budget range: Not sure yet');
    expect(body).toContain(valid.description);
    // Ampersands in values must not break the query string.
    expect(url.split('&body=')[0]).not.toContain('Rao & Co');
  });

  it('marks missing optional values', () => {
    expect(formatEnquiry({...valid, company: ''})).toContain('Company or business: Not provided');
  });

  it('builds a Formspree-compatible payload with the honeypot as _gotcha', () => {
    const payload = buildPayload({...valid, name: ' Asha Rao '});
    expect(payload.name).toBe('Asha Rao');
    expect(payload._replyto).toBe('asha@example.com');
    expect(payload._gotcha).toBe('');
    expect(payload).not.toHaveProperty('website');
  });
});
