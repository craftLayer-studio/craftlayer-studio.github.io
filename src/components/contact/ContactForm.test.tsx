import {afterEach, describe, expect, it, vi} from 'vitest';
import '@testing-library/jest-dom/vitest';
import {cleanup, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {ContactForm} from './ContactForm';

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe('ContactForm', () => {
  it('shows a focused error summary and marks invalid fields on empty submit', async () => {
    const user = userEvent.setup();
    render(<ContactForm endpoint="" email="studio@example.com" openMailto={() => {}} />);

    await user.click(screen.getByRole('button', {name: /continue in your email app/i}));

    const summary = await screen.findByRole('group', {name: /problems with your enquiry/i});
    expect(summary).toHaveFocus();
    expect(screen.getByRole('link', {name: 'Enter your name.'})).toBeInTheDocument();

    const name = screen.getByRole('textbox', {name: /your name/i});
    expect(name).toHaveAttribute('aria-invalid', 'true');
    const describedBy = name.getAttribute('aria-describedby') ?? '';
    const described = describedBy
      .split(' ')
      .map(id => document.getElementById(id)?.textContent ?? '')
      .join(' ');
    expect(described).toContain('Enter your name.');
  });

  it('opens the email app (and says nothing was stored) when no endpoint is configured', async () => {
    const user = userEvent.setup();
    const openMailto = vi.fn();
    render(<ContactForm endpoint="" email="studio@example.com" openMailto={openMailto} />);

    await user.type(screen.getByRole('textbox', {name: /your name/i}), 'Asha Rao');
    await user.type(screen.getByRole('textbox', {name: /email address/i}), 'asha@example.com');
    await user.type(
      screen.getByRole('textbox', {name: /project description/i}),
      'A new website for our consultancy, with a project gallery.',
    );
    for (const [label, option] of [
      [/service required/i, 'Web development'],
      [/budget range/i, 'Not sure yet'],
      [/timeline/i, 'Flexible'],
    ] as const) {
      await user.click(screen.getByRole('combobox', {name: label}));
      await user.click(await screen.findByRole('option', {name: option}));
    }
    await user.click(screen.getByRole('button', {name: /continue in your email app/i}));

    expect(openMailto).toHaveBeenCalledTimes(1);
    expect(openMailto.mock.calls[0][0]).toMatch(/^mailto:studio@example\.com\?subject=/);
    expect(await screen.findByText(/nothing has been sent or stored yet/i)).toBeInTheDocument();
  });
});
