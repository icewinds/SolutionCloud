import type { ContactFormValues } from '../types/content'

/**
 * Builds a mailto URL from form values.
 * Replace this module later with a form service, serverless function or API client.
 */
export function buildMailtoUrl(
  toEmail: string,
  subject: string,
  values: ContactFormValues,
): string {
  const body = [
    `Name: ${values.name}`,
    `Company: ${values.company}`,
    `Email: ${values.email}`,
    `Phone: ${values.phone || 'Not provided'}`,
    '',
    'Message:',
    values.message,
  ].join('\n')

  const params = new URLSearchParams({
    subject,
    body,
  })

  return `mailto:${toEmail}?${params.toString()}`
}

export function validateContactForm(
  values: ContactFormValues,
): Partial<Record<keyof ContactFormValues, string>> {
  const errors: Partial<Record<keyof ContactFormValues, string>> = {}

  if (!values.name.trim()) {
    errors.name = 'Please enter your name.'
  }

  if (!values.company.trim()) {
    errors.company = 'Please enter your company name.'
  }

  if (!values.email.trim()) {
    errors.email = 'Please enter your email address.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address.'
  }

  if (values.phone.trim() && !/^[\d\s+().-]{7,}$/.test(values.phone.trim())) {
    errors.phone = 'Please enter a valid phone number.'
  }

  if (!values.message.trim()) {
    errors.message = 'Please tell us a little about your problem or project.'
  } else if (values.message.trim().length < 20) {
    errors.message = 'Please provide a little more detail (at least 20 characters).'
  }

  return errors
}

export function submitContactEnquiry(
  toEmail: string,
  subject: string,
  values: ContactFormValues,
): void {
  const mailtoUrl = buildMailtoUrl(toEmail, subject, values)
  window.location.href = mailtoUrl
}
