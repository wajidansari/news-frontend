import Link from 'next/link'
import Image from 'next/image'
import { timeAgo, truncate, getImageUrl } from '../../lib/helpers'

export function ArticleCardLarge({ post }) {
  return (
    <Link href={`/article/${post.slug}`} className="article-card" style={{ display: 'block' }}>
      <div style={{ position: 'relative', paddingBottom: '62%', overflow: 'hidden', background: 'var(--off-white)', marginBottom: '14px' }}>
        {post.featuredImage?.node?.sourceUrl ? (
          <Image src={getImageUrl(post)} alt={post.title} fill style={{ objectFit: 'cover' }} />
        ) : (
          <div style={{ position: 'absolute', inset: 0, background: 'var(--border)' }} />
        )}
      </div>
      {post.categories?.nodes?.[0] && (
        <span className="cat-badge" style={{ marginBottom: '8px', display: 'inline-block' }}>{post.categories.nodes[0].name}</span>
      )}
      <h2 className="card-title" style={{ fontSize: '20px', marginBottom: '8px' }}>{post.title}</h2>
      <p style={{ fontSize: '14px', color: 'var(--gray)', lineHeight: 1.6, marginBottom: '10px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {truncate(post.excerpt, 160)}
      </p>
      <div style={{ display: 'flex', gap: '10px', fontSize: '12px', color: 'var(--gray-light)', fontFamily: 'var(--font-ui)' }}>
        {post.author?.node?.name && <span>{post.author.node.name}</span>}
        <span>•</span>
        <span>{timeAgo(post.date)}</span>
      </div>
    </Link>
  )
}

export function ArticleCardSmall({ post, showImage = true }) {
  return (
    <Link href={`/article/${post.slug}`} className="article-card"
      style={{ display: 'flex', gap: '14px', paddingBottom: '16px', borderBottom: '1px solid var(--border)' }}>
      {showImage && (
        <div style={{ position: 'relative', width: '90px', height: '65px', flexShrink: 0, overflow: 'hidden', background: 'var(--off-white)' }}>
          {post.featuredImage?.node?.sourceUrl ? (
            <Image src={getImageUrl(post)} alt={post.title} fill style={{ objectFit: 'cover' }} />
          ) : (
            <div style={{ width: '100%', height: '100%', background: 'var(--border)' }} />
          )}
        </div>
      )}
      <div style={{ flex: 1 }}>
        {post.categories?.nodes?.[0] && (
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: '9px', fontWeight: 800, color: 'var(--red)', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '5px' }}>
            {post.categories.nodes[0].name}
          </span>
        )}
        <h3 className="card-title" style={{ fontSize: '14px', lineHeight: 1.3, marginBottom: '6px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {post.title}
        </h3>
        <span style={{ fontSize: '11px', color: 'var(--gray-light)', fontFamily: 'var(--font-ui)' }}>{timeAgo(post.date)}</span>
      </div>
    </Link>
  )
}

export function ArticleCardHorizontal({ post, number }) {
  return (
    <Link href={`/article/${post.slug}`} className="article-card"
      style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', paddingBottom: '20px', borderBottom: '1px solid var(--border)' }}>
      {number && (
        <span style={{ fontFamily: 'var(--font-display)', fontSize: '36px', fontWeight: 900, color: 'var(--border)', lineHeight: 1, flexShrink: 0, width: '40px' }}>
          {String(number).padStart(2, '0')}
        </span>
      )}
      <div style={{ flex: 1 }}>
        {post.categories?.nodes?.[0] && (
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: '9px', fontWeight: 800, color: 'var(--red)', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '5px' }}>
            {post.categories.nodes[0].name}
          </span>
        )}
        <h3 className="card-title" style={{ fontSize: '15px', lineHeight: 1.3, marginBottom: '6px' }}>{post.title}</h3>
        <span style={{ fontSize: '11px', color: 'var(--gray-light)', fontFamily: 'var(--font-ui)' }}>{timeAgo(post.date)}</span>
      </div>
    </Link>
  )
}
