import { fetchAPI } from '../lib/graphql-client'
import { GET_HOME_POSTS } from '../lib/queries'
import HeroSection from '../components/home/HeroSection'
import Sidebar from '../components/common/Sidebar'
import { ArticleCardLarge, ArticleCardSmall, ArticleCardHorizontal } from '../components/common/ArticleCard'
import { NextSeo } from 'next-seo'

export default function Home({ latestPosts, categories }) {
  const heroPosts = latestPosts.slice(0, 5)
  const gridPosts = latestPosts.slice(5, 9)
  const listPosts = latestPosts.slice(9, 15)
  const trendingPosts = latestPosts.slice(0, 5)

  return (
    <>
      <NextSeo title="Breaking News, Latest Headlines" />

      {/* Hero */}
      <HeroSection posts={heroPosts} />

      {/* Main content */}
      <div style={{ background: 'var(--cream)' }}>
        <div className="container" style={{ paddingTop: '32px', paddingBottom: '48px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '40px', alignItems: 'start' }} className="content-grid">

            {/* Left main column */}
            <div>
              {/* Latest news grid */}
              <div className="section-header">
                <div className="accent" />
                <h2>Latest News</h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px', marginBottom: '40px' }} className="article-grid">
                {gridPosts.map(post => (
                  <ArticleCardLarge key={post.id} post={post} />
                ))}
              </div>

              {/* Ad banner */}
              <div style={{ background: 'var(--off-white)', border: '2px dashed var(--border)', height: '90px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '40px', color: 'var(--gray-light)', fontSize: '12px', fontFamily: 'var(--font-ui)', letterSpacing: '0.1em' }}>
                Advertisement
              </div>

              {/* More stories */}
              <div className="section-header">
                <div className="accent" />
                <h2>More Stories</h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {listPosts.map((post, i) => (
                  <ArticleCardHorizontal key={post.id} post={post} number={i + 1} />
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <Sidebar trendingPosts={trendingPosts} categories={categories} />
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .content-grid { grid-template-columns: 1fr !important; }
          .article-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .article-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}

export async function getStaticProps() {
  try {
    const data = await fetchAPI(GET_HOME_POSTS)
    return {
      props: {
        latestPosts: data?.latestPosts?.nodes || [],
        categories: data?.categories?.nodes || [],
      },
      revalidate: 60,
    }
  } catch (err) {
    return { props: { latestPosts: [], categories: [] }, revalidate: 30 }
  }
}
