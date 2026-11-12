'use client';

import {useEffect, useRef, useState, type FormEvent} from 'react';
import {Banner} from '@astryxdesign/core/Banner';
import {Button} from '@astryxdesign/core/Button';
import {Selector} from '@astryxdesign/core/Selector';
import {TextArea} from '@astryxdesign/core/TextArea';
import {TextInput} from '@astryxdesign/core/TextInput';
import {site} from '@/lib/site';
import {
  budgetOptions,
  buildMailto,
  buildPayload,
  DESCRIPTION_MAX,
  emptyContact,
  fieldLabels,
  fieldOrder,
  hasErrors,
  isLikelySpam,
  serviceOptions,
  timelineOptions,
  validateContact,
  type ContactErrors,
  type ContactField,
  type ContactValues,
} from './validate';
import s from './contact.module.css';

type Status = 'idle' | 'submitting' | 'sent' | 'mailto' | 'error';

export type ContactFormProps = {
  /** Formspree-compatible endpoint. Empty means the email-app fallback is used. */
  endpoint?: string;
  email?: string;
  /** Injected for tests; defaults to navigating to the mailto: URL. */
  openMailto?: (url: string) => void;
};

const err = (message?: string) => (message ? {type: 'error' as const, message} : undefined);

export function ContactForm({endpoint = site.formEndpoint, email = site.contactEmail, openMailto}: ContactFormProps) {
  const [values, setValues] = useState<ContactValues>(emptyContact);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [summaryTick, setSummaryTick] = useState(0);
  const summaryRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const usesEndpoint = Boolean(endpoint);

  useEffect(() => {
    if (summaryTick > 0) summaryRef.current?.focus();
  }, [summaryTick]);

  useEffect(() => {
    if (status === 'sent' || status === 'mailto' || status === 'error') statusRef.current?.focus();
  }, [status]);

  function update(field: keyof ContactValues, value: string) {
    const next = {...values, [field]: value};
    setValues(next);
    if (attempted && field !== 'website') {
      const all = validateContact(next);
      setErrors(prev => {
        const copy = {...prev};
        if (all[field as ContactField]) copy[field as ContactField] = all[field as ContactField];
        else delete copy[field as ContactField];
        return copy;
      });
    }
  }

  function focusField(field: ContactField) {
    const el = document.getElementById(`field-${field}`)?.querySelector<HTMLElement>('input:not([type=hidden]), textarea, button');
    el?.focus();
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setAttempted(true);
    const found = validateContact(values);
    setErrors(found);
    if (hasErrors(found)) {
      setStatus('idle');
      setSummaryTick(t => t + 1);
      return;
    }
    // Bots that fill the hidden field get no confirmation and nothing is sent.
    if (isLikelySpam(values)) return;

    if (!usesEndpoint) {
      const url = buildMailto(values, email);
      if (openMailto) openMailto(url);
      else window.location.href = url;
      setStatus('mailto');
      return;
    }

    setStatus('submitting');
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', Accept: 'application/json'},
        body: JSON.stringify(buildPayload(values)),
      });
      if (!res.ok) throw new Error(`Form endpoint responded ${res.status}`);
      setStatus('sent');
      setValues(emptyContact);
      setAttempted(false);
    } catch {
      setStatus('error');
    }
  }

  const errorList = fieldOrder.filter(f => errors[f]);
  const showSummary = attempted && errorList.length > 0;
  const mailtoHref = buildMailto(values, email);

  return (
    <form className={s.form} noValidate onSubmit={onSubmit} aria-describedby="form-note">
      {showSummary ? (
        <div className={s.summary} ref={summaryRef} tabIndex={-1} role="group" aria-labelledby="error-summary-title">
          <h2 id="error-summary-title" className={s.summaryTitle}>
            {errorList.length === 1 ? 'There is 1 problem' : `There are ${errorList.length} problems`} with your enquiry
          </h2>
          <ul className={s.summaryList}>
            {errorList.map(f => (
              <li key={f}>
                <a
                  href={`#field-${f}`}
                  onClick={ev => {
                    ev.preventDefault();
                    focusField(f);
                  }}
                >
                  {errors[f]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div ref={statusRef} tabIndex={-1} className={s.statusRegion} aria-live="polite">
        {status === 'sent' ? (
          <Banner
            status="success"
            title="Thanks, your enquiry has been sent."
            description={`It was delivered through our form provider. We will reply from ${email}.`}
          />
        ) : null}
        {status === 'mailto' ? (
          <Banner
            status="info"
            title="Your email app should now open with the enquiry filled in."
            description={
              <>
                Nothing has been sent or stored yet: press send in your email app to deliver it. If nothing opened,{' '}
                <a href={mailtoHref}>open the email again</a> or write to <a href={`mailto:${email}`}>{email}</a>.
              </>
            }
          />
        ) : null}
        {status === 'error' ? (
          <Banner
            status="error"
            title="Your enquiry could not be sent."
            description={
              <>
                Nothing was delivered. Please try again, or email <a href={mailtoHref}>{email}</a> directly with the
                same details.
              </>
            }
          />
        ) : null}
      </div>

      <div className={s.row}>
        <div id="field-name" className={s.field}>
          <TextInput
            label={fieldLabels.name}
            value={values.name}
            onChange={v => update('name', v)}
            htmlName="name"
            autoComplete="name"
            isRequired
            width="100%"
            status={err(errors.name)}
            statusVariant="detached"
          />
        </div>
        <div id="field-email" className={s.field}>
          <TextInput
            type="email"
            label={fieldLabels.email}
            value={values.email}
            onChange={v => update('email', v)}
            htmlName="email"
            autoComplete="email"
            inputMode="email"
            isRequired
            width="100%"
            status={err(errors.email)}
            statusVariant="detached"
          />
        </div>
      </div>

      <div id="field-company" className={s.field}>
        <TextInput
          label={fieldLabels.company}
          value={values.company}
          onChange={v => update('company', v)}
          htmlName="company"
          autoComplete="organization"
          isOptional
          width="100%"
          status={err(errors.company)}
          statusVariant="detached"
        />
      </div>

      <div id="field-service" className={s.field}>
        <Selector
          label={fieldLabels.service}
          options={[...serviceOptions]}
          value={values.service || undefined}
          onChange={v => update('service', v ?? '')}
          placeholder="Choose a service"
          htmlName="service"
          isRequired
          width="100%"
          presentation="adaptive"
          status={err(errors.service)}
          statusVariant="detached"
        />
      </div>

      <div id="field-description" className={s.field}>
        <TextArea
          label={fieldLabels.description}
          description="What are you building, who is it for, and what does a good outcome look like?"
          value={values.description}
          onChange={v => update('description', v)}
          htmlName="description"
          rows={6}
          maxLength={DESCRIPTION_MAX}
          isRequired
          width="100%"
          status={err(errors.description)}
          statusVariant="detached"
        />
      </div>

      <div className={s.row}>
        <div id="field-budget" className={s.field}>
          <Selector
            label={fieldLabels.budget}
            options={[...budgetOptions]}
            value={values.budget || undefined}
            onChange={v => update('budget', v ?? '')}
            placeholder="Choose a range"
            htmlName="budget"
            isRequired
            width="100%"
            presentation="adaptive"
            status={err(errors.budget)}
            statusVariant="detached"
          />
        </div>
        <div id="field-timeline" className={s.field}>
          <Selector
            label={fieldLabels.timeline}
            options={[...timelineOptions]}
            value={values.timeline || undefined}
            onChange={v => update('timeline', v ?? '')}
            placeholder="Choose a timeline"
            htmlName="timeline"
            isRequired
            width="100%"
            presentation="adaptive"
            status={err(errors.timeline)}
            statusVariant="detached"
          />
        </div>
      </div>

      {/* Honeypot: hidden from people and assistive technology; bots tend to fill it. */}
      <div className={s.honeypot} aria-hidden="true">
        <label htmlFor="cl-website">Leave this field empty</label>
        <input
          id="cl-website"
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={e => update('website', e.target.value)}
        />
      </div>

      <div className={s.actions}>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          label={usesEndpoint ? 'Send enquiry' : 'Continue in your email app'}
          isLoading={status === 'submitting'}
        />
        <p id="form-note" className={s.formNote}>
          {usesEndpoint
            ? 'Your details are sent to our form provider and forwarded to our inbox. We use them only to reply.'
            : 'This site has no server. Submitting opens your own email app with the details filled in; nothing is sent or stored until you press send there.'}
        </p>
      </div>
    </form>
  );
}
