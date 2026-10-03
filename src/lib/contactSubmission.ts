import type { ContactFormValues, ContactInfo } from '../types/content'

/** Builds a mailto URL from form values. */
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

/**
 * Sends the enquiry through Web3Forms (delivered to the inbox registered with the key).
 * Without a key, falls back to opening the visitor's email client.
 * Throws if Web3Forms rejects the submission or the network fails.
 */
export async function submitContactEnquiry(
  contact: ContactInfo,
  values: ContactFormValues,
): Promise<'sent' | 'mailto'> {
  const { web3formsAccessKey, mailtoSubject } = contact.form

  if (!web3formsAccessKey) {
    window.location.href = buildMailtoUrl(contact.email, mailtoSubject, values)
    return 'mailto'
  }

  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: web3formsAccessKey,
      subject: `${mailtoSubject} from ${values.name} (${values.company})`,
      from_name: 'SolutionCloud website',
      replyto: values.email,
      ...values,
      phone: values.phone || 'Not provided',
    }),
  })
  const result = (await response.json().catch(() => null)) as { success?: boolean } | null

  if (!response.ok || !result?.success) {
    throw new Error(`Web3Forms submission failed (HTTP ${response.status})`)
  }
  return 'sent'
}
