import { useState, type FormEvent } from 'react'
import { contact } from '../data/content'
import './ContactForm.css'

// Set to a Formspree/Hostinger form endpoint to submit via fetch.
// Empty string falls back to opening the user's mail client.
const FORM_ENDPOINT = ''

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') ?? '')
    const email = String(data.get('email') ?? '')
    const message = String(data.get('message') ?? '')

    if (!FORM_ENDPOINT) {
      const subject = encodeURIComponent(`Project inquiry — ${name}`)
      const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`)
      window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (!res.ok) throw new Error(`form endpoint returned ${res.status}`)
      setStatus('sent')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <form className="cform" onSubmit={onSubmit}>
      <label>
        <span className="mono">Name</span>
        <input name="name" type="text" required autoComplete="name" />
      </label>
      <label>
        <span className="mono">Email</span>
        <input name="email" type="email" required autoComplete="email" />
      </label>
      <label>
        <span className="mono">What are we building?</span>
        <textarea name="message" rows={5} required />
      </label>
      <button type="submit" className="btn btn-solid" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send it'}
      </button>
      <p className="cform-status mono" role="status">
        {status === 'sent' && 'Received. We will be in touch.'}
        {status === 'error' && 'Something broke — email us directly instead.'}
      </p>
    </form>
  )
}
