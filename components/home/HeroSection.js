import Link from 'next/link'
import Image from 'next/image'
import { timeAgo, truncate, getImageUrl } from '../../lib/helpers'

export default function HeroSection({ posts = [] }) {
  if (!posts.length) return null
  const [hero, ...rest] = posts.slice(0, 5)
  const sideItems = rest.slice(0, 4)

  return (
    <section style={{ background: 'var(--black)', paddingBottom: '0' }}>
      <div className="container" style={{ paddingTop: '20px', paddingBottom: '24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '2px' }} className="hero-grid">

          {/* Main hero */}
          <Link href={`/article/${hero.slug}`} className="article-card" style={{ display: 'block', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'relative', paddingBottom: '56.25%', overflow: 'hidden', background: '#111' }}>
              {hero.featuredImage?.node?.sourceUrl ? (
                <Image
                  src={getImageUrl(hero)}
                  alt={hero.featuredImage.node.altText || hero.title}
                  fill style={{ objectFit: 'cover' }}
                  priority
                />
              ) : (
                <div style={{ position: 'absolute', inset: 0, background: 'var(--dark-3)' }} />
              )}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(0deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)',
              }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px' }}>
                {hero.categories?.nodes?.[0] && (
                  <span className="cat-badge" style={{ marginBottom: '10px', display: 'inline-block' }}>
                    {hero.categories.nodes[0].name}
                  </span>
                )}
                <h1 style={{
                  fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(22px, 3vw, 36px)',
                  color: 'white', lineHeight: 1.15, marginBottom: '10px',
                  textShadow: '0 2px 8px rgba(0,0,0,0.5)',
                }}>
                  {hero.title}
                </h1>
                <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '14px', lineHeight: 1.5, marginBottom: '10px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {truncate(hero.excerpt, 160)}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-ui)' }}>
                  {hero.author?.node?.name && <span>{hero.author.node.name}</span>}
                  <span>•</span>
                  <span>{timeAgo(hero.date)}</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Side stack */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {sideItems.map(post => (
              <Link key={post.id} href={`/article/${post.slug}`}
                style={{ display: 'flex', gap: '0', position: 'relative', overflow: 'hidden', flex: 1, background: 'var(--dark-2)' }}
                className="article-card">
                <div style={{ position: 'relative', width: '110px', flexShrink: 0, overflow: 'hidden' }}>
                  {post.featuredImage?.node?.sourceUrl ? (
                    <Image src={getImageUrl(post)} alt={post.title} fill style={{ objectFit: 'cover' }} />
                  ) : (
                    <div style={{ position: 'absolute', inset: 0, background: 'var(--dark-3)' }} />
                  )}
                </div>
                <div style={{ padding: '12px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  {post.categories?.nodes?.[0] && (
                    <span style={{ fontFamily: 'var(--font-ui)', fontSize: '9px', fontWeight: 800, color: 'var(--red)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '5px' }}>
                      {post.categories.nodes[0].name}
                    </span>
                  )}
                  <h3 className="card-title" style={{ fontSize: '13px', lineHeight: 1.3, color: 'white', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {post.title}
                  </h3>
                  <span style={{ fontSize: '11px', color: 'var(--gray)', marginTop: '6px', fontFamily: 'var(--font-ui)' }}>{timeAgo(post.date)}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
