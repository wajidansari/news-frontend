import Link from 'next/link'
import { NextSeo } from 'next-seo'

export default function NotFound() {
  return (
    <>
      <NextSeo title="404 - Page Not Found" />
      <div style={{ background: 'var(--black)', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '120px', fontWeight: 900, color: 'var(--red)', lineHeight: 1 }}>404</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: 'white', marginBottom: '16px' }}>Page Not Found</h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '32px', fontFamily: 'var(--font-ui)' }}>The story you're looking for doesn't exist or has been moved.</p>
          <Link href="/" style={{ background: 'var(--red)', color: 'white', padding: '12px 32px', fontFamily: 'var(--font-ui)', fontSize: '13px', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Back to Homepage
          </Link>
        </div>
      </div>
    </>
  )
}
