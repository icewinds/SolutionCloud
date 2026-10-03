import { useState, type FormEvent } from 'react'
import type { ContactFormValues, ContactInfo } from '../types/content'
import {
  submitContactEnquiry,
  validateContactForm,
} from '../lib/contactSubmission'
import './ContactForm.css'

interface ContactFormProps {
  contact: ContactInfo
}

const initialValues: ContactFormValues = {
  name: '',
  company: '',
  email: '',
  phone: '',
  message: '',
}

export function ContactForm({ contact }: ContactFormProps) {
  const [values, setValues] = useState<ContactFormValues>(initialValues)
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormValues, string>>>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'mailto' | 'error'>('idle')

  function updateField<K extends keyof ContactFormValues>(
    field: K,
    value: ContactFormValues[K],
  ): void {
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => {
      if (!current[field]) {
        return current
      }

      const next = { ...current }
      delete next[field]
      return next
    })
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()
    if (status === 'sending') {
      return
    }

    const nextErrors = validateContactForm(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      setStatus('idle')
      return
    }

    setStatus('sending')
    try {
      const outcome = await submitContactEnquiry(contact, values)
      setStatus(outcome)
      if (outcome === 'sent') {
        setValues(initialValues)
      }
    } catch (error) {
      console.error(error)
      setStatus('error')
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(event) => updateField('name', event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
            required
          />
          {errors.name ? (
            <p id="name-error" className="field-error">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div className="form-field">
          <label htmlFor="company">Company</label>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            value={values.company}
            onChange={(event) => updateField('company', event.target.value)}
            aria-invalid={Boolean(errors.company)}
            aria-describedby={errors.company ? 'company-error' : undefined}
            required
          />
          {errors.company ? (
            <p id="company-error" className="field-error">
              {errors.company}
            </p>
          ) : null}
        </div>

        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(event) => updateField('email', event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
            required
          />
          {errors.email ? (
            <p id="email-error" className="field-error">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div className="form-field">
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(event) => updateField('phone', event.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
          />
          {errors.phone ? (
            <p id="phone-error" className="field-error">
              {errors.phone}
            </p>
          ) : null}
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows={6}
          value={values.message}
          onChange={(event) => updateField('message', event.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'message-error' : undefined}
          required
        />
        {errors.message ? (
          <p id="message-error" className="field-error">
            {errors.message}
          </p>
        ) : null}
      </div>

      <button type="submit" className="button" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send Message'}
      </button>

      <div role="status" aria-live="polite">
        {status === 'sent' || status === 'mailto' ? (
          <p className="form-success">
            {status === 'sent' ? contact.form.successMessage : contact.form.mailtoMessage}
          </p>
        ) : null}
        {status === 'error' ? (
          <p className="form-error">
            {contact.form.errorMessage}{' '}
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </p>
        ) : null}
      </div>
    </form>
  )
}
