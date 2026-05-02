import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { fetchAPI } from '../../lib/graphql-client'
import { GET_MENU } from '../../lib/queries'

const TOP_LINKS = [
  { label: 'Live TV', href: '/live' },
  { label: 'Newsletter', href: '/newsletter' },
  { label: 'Advertise', href: '/advertise' },
]

export default function Header() {
  const [categories, setCategories] = useState([])
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()

  useEffect(() => {
    fetchAPI(GET_MENU).then(d => setCategories(d?.categories?.nodes || [])).catch(() => {})
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <>
      {/* Top Bar */}
      <div style={{ background: 'var(--black)', color: 'var(--gray-light)', fontSize: '11px', fontFamily: 'var(--font-ui)', letterSpacing: '0.05em' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '32px' }}>
          <span>{today}</span>
          <div style={{ display: 'flex', gap: '20px' }}>
            {TOP_LINKS.map(l => (
              <Link key={l.href} href={l.href} style={{ color: 'var(--gray-light)', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = 'var(--red)'}
                onMouseLeave={e => e.target.style.color = 'var(--gray-light)'}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header style={{
        background: 'var(--dark)',
        position: 'sticky', top: 0, zIndex: 1000,
        boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.4)' : 'none',
        transition: 'box-shadow 0.3s'
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '56px', gap: '20px' }}>

          {/* Hamburger (mobile) */}
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu"
            style={{ background: 'none', border: 'none', color: 'white', fontSize: '20px', display: 'none', padding: '4px' }}
            className="hamburger">
            ☰
          </button>

          {/* Logo */}
          <Link href="/" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
            <span style={{
              fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '22px',
              color: 'var(--white)', letterSpacing: '-0.02em', lineHeight: 1,
              textTransform: 'uppercase'
            }}>
              Headlines
            </span>
            <span style={{
              fontFamily: 'var(--font-ui)', fontSize: '9px', fontWeight: 700,
              letterSpacing: '0.3em', color: 'var(--red)', textTransform: 'uppercase'
            }}>
              Of Today
            </span>
          </Link>

          {/* Nav */}
          <nav style={{ display: 'flex', gap: '2px', flex: 1, justifyContent: 'center' }} className="main-nav">
            {categories.slice(0, 7).map(cat => (
              <Link key={cat.id} href={`/category/${cat.slug}`}
                style={{
                  fontFamily: 'var(--font-ui)', fontSize: '13px', fontWeight: 700,
                  letterSpacing: '0.06em', textTransform: 'uppercase',
                  color: router.query.slug === cat.slug ? 'var(--red)' : 'rgba(255,255,255,0.85)',
                  padding: '6px 10px',
                  borderBottom: router.query.slug === cat.slug ? '2px solid var(--red)' : '2px solid transparent',
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--red)' }}
                onMouseLeave={e => { if (router.query.slug !== cat.slug) e.currentTarget.style.color = 'rgba(255,255,255,0.85)' }}
              >
                {cat.name}
              </Link>
            ))}
          </nav>

          {/* Search */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            {searchOpen ? (
              <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  autoFocus
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search news..."
                  style={{
                    background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
                    color: 'white', padding: '6px 12px', fontSize: '13px',
                    fontFamily: 'var(--font-ui)', outline: 'none', width: '200px',
                  }}
                />
                <button type="button" onClick={() => setSearchOpen(false)}
                  style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', fontSize: '18px' }}>✕</button>
              </form>
            ) : (
              <button onClick={() => setSearchOpen(true)} aria-label="Search"
                style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.8)', fontSize: '18px', padding: '4px', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--red)'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}>
                🔍
              </button>
            )}
          </div>
        </div>

        {/* Red accent line */}
        <div style={{ height: '3px', background: 'var(--red)' }} />
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 2000,
          background: 'var(--black)',
        }}>
          <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
              <span style={{ fontFamily: 'var(--font-display)', color: 'white', fontSize: '20px', fontWeight: 900 }}>Headlines Of Today</span>
              <button onClick={() => setMenuOpen(false)} style={{ background: 'none', border: 'none', color: 'white', fontSize: '24px' }}>✕</button>
            </div>
            {categories.map(cat => (
              <Link key={cat.id} href={`/category/${cat.slug}`} onClick={() => setMenuOpen(false)}
                style={{ display: 'block', fontFamily: 'var(--font-ui)', fontSize: '18px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'white', padding: '14px 0', borderBottom: '1px solid var(--border-dark)' }}>
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 768px) {
          .main-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </>
  )
}
