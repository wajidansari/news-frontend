import { NextSeo } from 'next-seo'
import { useState } from 'react'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Connect to your contact form API/email service here
    setSent(true)
  }

  const inputStyle = {
    width: '100%', padding: '12px 16px', border: '2px solid var(--border)',
    fontSize: '15px', fontFamily: 'var(--font-body)', outline: 'none',
    background: 'white', transition: 'border-color 0.2s', marginBottom: '16px',
  }

  return (
    <>
      <NextSeo title="Contact Us" />
      <div style={{ background: 'var(--black)', borderBottom: '4px solid var(--red)' }}>
        <div className="container" style={{ padding: '48px 20px' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(32px, 5vw, 64px)', color: 'white', lineHeight: 1 }}>Contact Us</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: '12px', fontSize: '15px' }}>Tips, corrections, feedback or advertising enquiries</p>
        </div>
      </div>
      <div style={{ background: 'var(--cream)', padding: '60px 0' }}>
        <div className="container" style={{ maxWidth: '600px' }}>
          {sent ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>✓</div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', marginBottom: '12px' }}>Message Sent</h2>
              <p style={{ color: 'var(--gray)' }}>Thank you for reaching out. We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <label style={{ display: 'block', fontFamily: 'var(--font-ui)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gray)', marginBottom: '6px' }}>Full Name *</label>
              <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} style={inputStyle} placeholder="Your full name"
                onFocus={e => e.target.style.borderColor = 'var(--red)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'} />

              <label style={{ display: 'block', fontFamily: 'var(--font-ui)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gray)', marginBottom: '6px' }}>Email Address *</label>
              <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} style={inputStyle} placeholder="your@email.com"
                onFocus={e => e.target.style.borderColor = 'var(--red)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'} />

              <label style={{ display: 'block', fontFamily: 'var(--font-ui)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gray)', marginBottom: '6px' }}>Subject</label>
              <input value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} style={inputStyle} placeholder="What is this about?"
                onFocus={e => e.target.style.borderColor = 'var(--red)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'} />

              <label style={{ display: 'block', fontFamily: 'var(--font-ui)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gray)', marginBottom: '6px' }}>Message *</label>
              <textarea required value={form.message} onChange={e => setForm({...form, message: e.target.value})} rows={6}
                style={{ ...inputStyle, resize: 'vertical' }} placeholder="Your message..."
                onFocus={e => e.target.style.borderColor = 'var(--red)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'} />

              <button type="submit" style={{ background: 'var(--red)', color: 'white', border: 'none', padding: '14px 40px', fontFamily: 'var(--font-ui)', fontSize: '13px', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', transition: 'background 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--red-dark)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--red)'}>
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  )
}
