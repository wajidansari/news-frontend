import Link from 'next/link'
import Image from 'next/image'
import { timeAgo, getImageUrl } from '../../lib/helpers'

export default function Sidebar({ trendingPosts = [], categories = [] }) {
  return (
    <aside style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

      {/* Newsletter */}
      <div style={{ background: 'var(--black)', padding: '24px', color: 'white' }}>
        <div style={{ fontFamily: 'var(--font-ui)', fontSize: '10px', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--red)', marginBottom: '10px' }}>
          Newsletter
        </div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '18px', marginBottom: '10px', lineHeight: 1.3 }}>
          Get the day's top stories delivered to your inbox
        </h3>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', marginBottom: '16px', lineHeight: 1.5 }}>
          Breaking news, analysis and opinion. Unsubscribe anytime.
        </p>
        <input type="email" placeholder="Your email address"
          style={{ width: '100%', padding: '10px 12px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', fontSize: '13px', fontFamily: 'var(--font-ui)', marginBottom: '10px', outline: 'none' }} />
        <button style={{ width: '100%', padding: '10px', background: 'var(--red)', color: 'white', border: 'none', fontFamily: 'var(--font-ui)', fontSize: '12px', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', transition: 'background 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--red-dark)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--red)'}>
          Subscribe Free
        </button>
      </div>

      {/* Trending */}
      {trendingPosts.length > 0 && (
        <div>
          <div className="section-header">
            <div className="accent" />
            <h2>Trending Now</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {trendingPosts.slice(0, 5).map((post, i) => (
              <Link key={post.id} href={`/article/${post.slug}`}
                style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}
                className="article-card">
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 900, color: i === 0 ? 'var(--red)' : 'var(--border)', lineHeight: 1, flexShrink: 0, width: '32px' }}>
                  {i + 1}
                </span>
                <div>
                  <h4 className="card-title" style={{ fontSize: '13px', lineHeight: 1.35, marginBottom: '5px' }}>{post.title}</h4>
                  <span style={{ fontSize: '11px', color: 'var(--gray-light)', fontFamily: 'var(--font-ui)' }}>{timeAgo(post.date)}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Categories */}
      {categories.length > 0 && (
        <div>
          <div className="section-header">
            <div className="accent" />
            <h2>Browse Topics</h2>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {categories.map(cat => (
              <Link key={cat.id} href={`/category/${cat.slug}`}
                style={{
                  fontFamily: 'var(--font-ui)', fontSize: '11px', fontWeight: 700,
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  border: '2px solid var(--border)', padding: '6px 12px',
                  color: 'var(--dark)', transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--red)'; e.currentTarget.style.borderColor = 'var(--red)'; e.currentTarget.style.color = 'white' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--dark)' }}>
                {cat.name}
                {cat.count && <span style={{ opacity: 0.5, marginLeft: '4px' }}>({cat.count})</span>}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Ad placeholder */}
      <div style={{ background: 'var(--off-white)', border: '2px dashed var(--border)', height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gray-light)', fontSize: '12px', fontFamily: 'var(--font-ui)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        Advertisement
      </div>
    </aside>
  )
}
