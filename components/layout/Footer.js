import Link from 'next/link'

const FOOTER_LINKS = {
  'News': ['World', 'Politics', 'Business', 'Technology', 'Science', 'Health'],
  'Sports': ['Football', 'Cricket', 'Tennis', 'Olympics', 'Formula 1'],
  'Entertainment': ['Movies', 'Music', 'TV Shows', 'Celebrity', 'Arts'],
  'Company': ['About Us', 'Contact', 'Advertise', 'Careers', 'Newsletter'],
}

const SOCIAL = [
  { name: 'Twitter/X', href: 'https://twitter.com/headlinesoftoday', icon: '𝕏' },
  { name: 'Facebook', href: 'https://facebook.com', icon: 'f' },
  { name: 'Instagram', href: 'https://instagram.com', icon: '◉' },
  { name: 'YouTube', href: 'https://youtube.com', icon: '▶' },
]

export default function Footer() {
  return (
    <footer style={{ background: 'var(--black)', color: 'var(--gray-light)', marginTop: '60px' }}>
      {/* Top red bar */}
      <div style={{ height: '4px', background: 'var(--red)' }} />

      {/* Main footer */}
      <div className="container" style={{ padding: '48px 20px 32px' }}>

        {/* Logo + social */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px', flexWrap: 'wrap', gap: '24px' }}>
          <div>
            <Link href="/">
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '28px', color: 'white', textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
                Headlines
              </div>
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.3em', color: 'var(--red)', textTransform: 'uppercase' }}>
                Of Today
              </div>
            </Link>
            <p style={{ marginTop: '12px', fontSize: '13px', maxWidth: '300px', lineHeight: 1.6 }}>
              Breaking news, analysis and opinion on world events. Trusted journalism since 2020.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            {SOCIAL.map(s => (
              <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.name}
                style={{
                  width: '38px', height: '38px', border: '1px solid var(--border-dark)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '14px', fontWeight: 700, color: 'var(--gray-light)',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--red)'; e.currentTarget.style.borderColor = 'var(--red)'; e.currentTarget.style.color = 'white' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'var(--border-dark)'; e.currentTarget.style.color = 'var(--gray-light)' }}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Links grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '32px', marginBottom: '40px' }}>
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <h4 style={{ fontFamily: 'var(--font-ui)', fontSize: '11px', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--red)', marginBottom: '14px' }}>
                {section}
              </h4>
              {links.map(link => (
                <Link key={link} href={`/category/${link.toLowerCase().replace(/\s+/g, '-')}`}
                  style={{ display: 'block', fontSize: '13px', color: 'var(--gray-light)', marginBottom: '8px', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'white'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--gray-light)'}>
                  {link}
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid var(--border-dark)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <p style={{ fontSize: '12px' }}>
            © {new Date().getFullYear()} Headlines Of Today. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '20px' }}>
            {['Privacy Policy', 'Terms of Use', 'Cookie Policy', 'Sitemap'].map(l => (
              <Link key={l} href={`/${l.toLowerCase().replace(/\s+/g, '-')}`}
                style={{ fontSize: '12px', color: 'var(--gray-light)', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'white'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--gray-light)'}>
                {l}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
