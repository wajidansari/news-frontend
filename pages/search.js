import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { fetchAPI } from '../lib/graphql-client'
import { SEARCH_POSTS } from '../lib/queries'
import { ArticleCardSmall } from '../components/common/ArticleCard'
import { NextSeo } from 'next-seo'

export default function SearchPage() {
  const router = useRouter()
  const { q } = router.query
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [query, setQuery] = useState('')

  useEffect(() => {
    setQuery(q || '')
    if (q) doSearch(q)
  }, [q])

  const doSearch = async (term) => {
    setLoading(true)
    setSearched(false)
    try {
      const data = await fetchAPI(SEARCH_POSTS, { query: term })
      setResults(data?.posts?.nodes || [])
    } catch { setResults([]) }
    setLoading(false)
    setSearched(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) router.push(`/search?q=${encodeURIComponent(query)}`)
  }

  return (
    <>
      <NextSeo title={q ? `Search: "${q}"` : 'Search'} />

      <div style={{ background: 'var(--black)', borderBottom: '4px solid var(--red)' }}>
        <div className="container" style={{ padding: '32px 20px' }}>
          <div style={{ fontFamily: 'var(--font-ui)', fontSize: '10px', fontWeight: 800, letterSpacing: '0.2em', color: 'var(--red)', textTransform: 'uppercase', marginBottom: '12px' }}>Search</div>
          <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0', maxWidth: '600px' }}>
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search for news..."
              style={{ flex: 1, padding: '14px 18px', background: 'rgba(255,255,255,0.1)', border: '2px solid rgba(255,255,255,0.2)', borderRight: 'none', color: 'white', fontSize: '18px', fontFamily: 'var(--font-body)', outline: 'none' }}
            />
            <button type="submit"
              style={{ padding: '14px 28px', background: 'var(--red)', color: 'white', border: 'none', fontFamily: 'var(--font-ui)', fontSize: '13px', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Search
            </button>
          </form>
        </div>
      </div>

      <div style={{ background: 'var(--cream)', minHeight: '60vh', paddingTop: '32px', paddingBottom: '60px' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          {loading && (
            <div style={{ textAlign: 'center', padding: '60px', color: 'var(--gray)', fontFamily: 'var(--font-ui)' }}>
              Searching...
            </div>
          )}
          {!loading && searched && (
            <>
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: '13px', color: 'var(--gray)', marginBottom: '24px' }}>
                {results.length > 0 ? `${results.length} results for "${q}"` : `No results found for "${q}"`}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {results.map(post => <ArticleCardSmall key={post.id} post={post} />)}
              </div>
              {results.length === 0 && (
                <div style={{ textAlign: 'center', padding: '40px' }}>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '20px', marginBottom: '12px' }}>No stories found</p>
                  <p style={{ color: 'var(--gray)', fontSize: '14px' }}>Try different keywords or browse by category</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}
