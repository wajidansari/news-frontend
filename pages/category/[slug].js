import { fetchAPI } from '../../lib/graphql-client'
import { GET_POSTS_BY_CATEGORY, GET_MENU, GET_HOME_POSTS } from '../../lib/queries'
import { ArticleCardLarge, ArticleCardSmall } from '../../components/common/ArticleCard'
import Sidebar from '../../components/common/Sidebar'
import { NextSeo } from 'next-seo'
import { useState } from 'react'

export default function CategoryPage({ posts, category, categories, slug, hasNextPage, endCursor }) {
  const [allPosts, setAllPosts] = useState(posts)
  const [loading, setLoading] = useState(false)
  const [cursor, setCursor] = useState(endCursor)
  const [hasMore, setHasMore] = useState(hasNextPage)

  const loadMore = async () => {
    setLoading(true)
    try {
      const data = await fetchAPI(`
        query LoadMore($slug: String!, $after: String) {
          posts(first: 12, after: $after, where: { categoryName: $slug }) {
            pageInfo { hasNextPage endCursor }
            nodes {
              id title slug excerpt date
              featuredImage { node { sourceUrl altText } }
              categories { nodes { name slug } }
              author { node { name } }
            }
          }
        }
      `, { slug, after: cursor })
      setAllPosts(p => [...p, ...(data?.posts?.nodes || [])])
      setHasMore(data?.posts?.pageInfo?.hasNextPage || false)
      setCursor(data?.posts?.pageInfo?.endCursor || null)
    } catch (e) {}
    setLoading(false)
  }

  return (
    <>
      <NextSeo title={`${category?.name || slug} - Latest News`} description={category?.description || ''} />

      {/* Category header */}
      <div style={{ background: 'var(--black)', borderBottom: '4px solid var(--red)' }}>
        <div className="container" style={{ padding: '32px 20px' }}>
          <div style={{ fontFamily: 'var(--font-ui)', fontSize: '10px', fontWeight: 800, letterSpacing: '0.2em', color: 'var(--red)', textTransform: 'uppercase', marginBottom: '8px' }}>
            Section
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(32px, 5vw, 56px)', color: 'white', textTransform: 'capitalize', lineHeight: 1 }}>
            {category?.name || slug}
          </h1>
          {category?.description && (
            <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: '12px', fontSize: '15px', maxWidth: '500px' }}>{category.description}</p>
          )}
          {category?.count && (
            <p style={{ color: 'rgba(255,255,255,0.4)', marginTop: '8px', fontFamily: 'var(--font-ui)', fontSize: '12px' }}>{category.count} articles</p>
          )}
        </div>
      </div>

      {/* Content */}
      <div style={{ background: 'var(--cream)', paddingTop: '32px', paddingBottom: '60px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '40px', alignItems: 'start' }} className="cat-layout">
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px', marginBottom: '32px' }} className="cat-grid">
                {allPosts.map(post => (
                  <ArticleCardLarge key={post.id} post={post} />
                ))}
              </div>
              {hasMore && (
                <div style={{ textAlign: 'center' }}>
                  <button onClick={loadMore} disabled={loading}
                    style={{ background: 'var(--red)', color: 'white', border: 'none', padding: '14px 40px', fontFamily: 'var(--font-ui)', fontSize: '13px', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: loading ? 'wait' : 'pointer', opacity: loading ? 0.7 : 1, transition: 'opacity 0.2s' }}>
                    {loading ? 'Loading...' : 'Load More Stories'}
                  </button>
                </div>
              )}
            </div>
            <Sidebar trendingPosts={allPosts.slice(0, 5)} categories={categories} />
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) { .cat-layout { grid-template-columns: 1fr !important; } }
        @media (max-width: 600px) { .cat-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  )
}

export async function getServerSideProps({ params }) {
  try {
    const [catData, homeData] = await Promise.all([
      fetchAPI(GET_POSTS_BY_CATEGORY, { slug: params.slug }),
      fetchAPI(GET_HOME_POSTS),
    ])
    return {
      props: {
        posts: catData?.posts?.nodes || [],
        category: catData?.category || null,
        categories: homeData?.categories?.nodes || [],
        slug: params.slug,
        hasNextPage: catData?.posts?.pageInfo?.hasNextPage || false,
        endCursor: catData?.posts?.pageInfo?.endCursor || null,
      },
    }
  } catch {
    return { props: { posts: [], category: null, categories: [], slug: params.slug, hasNextPage: false, endCursor: null } }
  }
}
