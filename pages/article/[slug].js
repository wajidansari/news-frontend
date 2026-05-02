import Image from 'next/image'
import Link from 'next/link'
import { fetchAPI } from '../../lib/graphql-client'
import { GET_POST_BY_SLUG, GET_ALL_POST_SLUGS, GET_HOME_POSTS } from '../../lib/queries'
import { formatDate, timeAgo, getImageUrl } from '../../lib/helpers'
import Sidebar from '../../components/common/Sidebar'
import { ArticleCardSmall } from '../../components/common/ArticleCard'
import { NextSeo, ArticleJsonLd } from 'next-seo'

export default function ArticlePage({ post, relatedPosts, categories }) {
  if (!post) return (
    <div style={{ textAlign: 'center', padding: '80px 20px' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', marginBottom: '16px' }}>Article Not Found</h1>
      <Link href="/" style={{ color: 'var(--red)', fontFamily: 'var(--font-ui)', fontWeight: 700 }}>← Back to Home</Link>
    </div>
  )

  const category = post.categories?.nodes?.[0]

  return (
    <>
      <NextSeo
        title={post.seo?.title || post.title}
        description={post.seo?.description || ''}
        openGraph={{
          title: post.title,
          images: post.featuredImage?.node?.sourceUrl ? [{ url: post.featuredImage.node.sourceUrl }] : [],
          type: 'article',
          article: { publishedTime: post.date, modifiedTime: post.modified },
        }}
      />
      <ArticleJsonLd
        url={`${process.env.NEXT_PUBLIC_SITE_URL}/article/${post.slug}`}
        title={post.title}
        images={post.featuredImage?.node?.sourceUrl ? [post.featuredImage.node.sourceUrl] : []}
        datePublished={post.date}
        dateModified={post.modified}
        authorName={post.author?.node?.name || 'Headlines Of Today'}
        description={post.seo?.description || ''}
      />

      {/* Article hero */}
      <div style={{ background: 'var(--black)', paddingBottom: '0' }}>
        <div className="container" style={{ paddingTop: '24px', maxWidth: '960px' }}>
          {/* Breadcrumb */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', fontFamily: 'var(--font-ui)', fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginBottom: '16px' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.5)', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--red)'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}>Home</Link>
            <span>/</span>
            {category && (
              <>
                <Link href={`/category/${category.slug}`} style={{ color: 'rgba(255,255,255,0.5)', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--red)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}>{category.name}</Link>
                <span>/</span>
              </>
            )}
            <span style={{ color: 'rgba(255,255,255,0.3)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '300px' }}>{post.title}</span>
          </div>

          {category && <span className="cat-badge" style={{ marginBottom: '16px', display: 'inline-block' }}>{category.name}</span>}

          <h1 style={{
            fontFamily: 'var(--font-display)', fontWeight: 900, color: 'white',
            fontSize: 'clamp(26px, 4vw, 48px)', lineHeight: 1.1, marginBottom: '20px',
          }}>
            {post.title}
          </h1>

          {/* Byline */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            {post.author?.node?.avatar?.url && (
              <Image src={post.author.node.avatar.url} alt={post.author.node.name} width={40} height={40} style={{ borderRadius: '50%' }} />
            )}
            <div>
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: '13px', fontWeight: 700, color: 'white', letterSpacing: '0.02em' }}>
                {post.author?.node?.name || 'Headlines Of Today'}
              </div>
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>
                {formatDate(post.date)}
                {post.modified !== post.date && ` · Updated ${timeAgo(post.modified)}`}
              </div>
            </div>
            {/* Share buttons */}
            <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
              {['Share', 'Tweet', 'Copy'].map(action => (
                <button key={action} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', padding: '6px 14px', fontFamily: 'var(--font-ui)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.06em', transition: 'background 0.2s', cursor: 'pointer' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--red)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}>
                  {action}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Featured image */}
      {post.featuredImage?.node?.sourceUrl && (
        <div style={{ background: 'var(--black)' }}>
          <div style={{ maxWidth: '960px', margin: '0 auto', position: 'relative' }}>
            <Image
              src={getImageUrl(post)}
              alt={post.featuredImage.node.altText || post.title}
              width={960}
              height={540}
              style={{ width: '100%', height: 'auto', display: 'block' }}
              priority
            />
            {post.featuredImage.node.altText && (
              <p style={{ background: 'rgba(0,0,0,0.7)', color: 'rgba(255,255,255,0.6)', fontSize: '11px', padding: '6px 12px', fontFamily: 'var(--font-ui)', fontStyle: 'italic' }}>
                {post.featuredImage.node.altText}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Article body */}
      <div style={{ background: 'var(--cream)', paddingTop: '40px', paddingBottom: '60px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '48px', maxWidth: '1100px', margin: '0 auto' }} className="article-layout">
            <article>
              <div
                className="article-content"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Tags */}
              {post.tags?.nodes?.length > 0 && (
                <div style={{ marginTop: '40px', paddingTop: '24px', borderTop: '1px solid var(--border)' }}>
                  <span style={{ fontFamily: 'var(--font-ui)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--gray)', marginRight: '12px' }}>Tags:</span>
                  {post.tags.nodes.map(tag => (
                    <Link key={tag.slug} href={`/tag/${tag.slug}`}
                      style={{ display: 'inline-block', border: '1px solid var(--border)', padding: '4px 10px', fontSize: '12px', fontFamily: 'var(--font-ui)', marginRight: '8px', marginBottom: '8px', color: 'var(--gray)', transition: 'all 0.2s' }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'var(--red)'; e.currentTarget.style.borderColor = 'var(--red)'; e.currentTarget.style.color = 'white' }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--gray)' }}>
                      #{tag.name}
                    </Link>
                  ))}
                </div>
              )}
            </article>
            <Sidebar trendingPosts={relatedPosts} categories={categories} />
          </div>
        </div>
      </div>

      {/* Related articles */}
      {relatedPosts.length > 0 && (
        <div style={{ background: 'var(--white)', borderTop: '3px solid var(--black)', paddingTop: '32px', paddingBottom: '48px' }}>
          <div className="container">
            <div className="section-header">
              <div className="accent" />
              <h2>Related Stories</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px' }}>
              {relatedPosts.slice(0, 5).map(p => (
                <ArticleCardSmall key={p.id} post={p} />
              ))}
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .article-content { font-family: var(--font-body); font-size: 18px; line-height: 1.8; color: var(--dark); }
        .article-content p { margin-bottom: 1.5em; }
        .article-content h2 { font-family: var(--font-display); font-size: 26px; font-weight: 700; margin: 2em 0 0.8em; border-left: 4px solid var(--red); padding-left: 16px; }
        .article-content h3 { font-family: var(--font-display); font-size: 20px; font-weight: 700; margin: 1.5em 0 0.6em; }
        .article-content a { color: var(--red); text-decoration: underline; }
        .article-content blockquote { border-left: 4px solid var(--red); margin: 2em 0; padding: 16px 24px; background: var(--off-white); font-style: italic; font-size: 20px; color: var(--dark-2); }
        .article-content img { max-width: 100%; height: auto; margin: 2em 0; }
        .article-content ul, .article-content ol { margin: 1.2em 0 1.2em 1.5em; }
        .article-content li { margin-bottom: 0.5em; }
        @media (max-width: 900px) { .article-layout { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  )
}

export async function getStaticPaths() {
  try {
    const data = await fetchAPI(GET_ALL_POST_SLUGS)
    const paths = (data?.posts?.nodes || []).map(p => ({ params: { slug: p.slug } }))
    return { paths, fallback: 'blocking' }
  } catch {
    return { paths: [], fallback: 'blocking' }
  }
}

export async function getStaticProps({ params }) {
  try {
    const [postData, homeData] = await Promise.all([
      fetchAPI(GET_POST_BY_SLUG, { slug: params.slug }),
      fetchAPI(GET_HOME_POSTS),
    ])
    if (!postData?.post) return { notFound: true }
    return {
      props: {
        post: postData.post,
        relatedPosts: homeData?.latestPosts?.nodes || [],
        categories: homeData?.categories?.nodes || [],
      },
      revalidate: 300,
    }
  } catch {
    return { notFound: true }
  }
}
