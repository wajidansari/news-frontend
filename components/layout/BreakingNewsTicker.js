import { useState, useEffect } from 'react'
import { fetchAPI } from '../../lib/graphql-client'
import Link from 'next/link'

const TICKER_QUERY = `
  query TickerPosts {
    posts(first: 8, where: { categoryName: "breaking" }) {
      nodes { id title slug }
    }
  }
`

export default function BreakingNewsTicker() {
  const [posts, setPosts] = useState([])
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    fetchAPI(TICKER_QUERY)
      .then(d => { if (d?.posts?.nodes?.length) setPosts(d.posts.nodes) })
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (!posts.length) return
    const timer = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIndex(i => (i + 1) % posts.length)
        setVisible(true)
      }, 400)
    }, 5000)
    return () => clearInterval(timer)
  }, [posts])

  if (!posts.length) return null

  return (
    <div style={{
      background: 'var(--red)', color: 'white',
      height: '36px', display: 'flex', alignItems: 'center', overflow: 'hidden',
    }}>
      <div style={{
        background: 'var(--dark)', padding: '0 16px', height: '100%',
        display: 'flex', alignItems: 'center', flexShrink: 0,
        fontFamily: 'var(--font-ui)', fontSize: '11px', fontWeight: 800,
        letterSpacing: '0.12em', textTransform: 'uppercase', whiteSpace: 'nowrap',
      }}>
        <span style={{ marginRight: '8px', fontSize: '8px', color: 'var(--red)' }}>●</span>
        Breaking
      </div>
      <div style={{ flex: 1, overflow: 'hidden', padding: '0 20px' }}>
        <Link href={`/article/${posts[index]?.slug}`}
          style={{
            fontFamily: 'var(--font-ui)', fontSize: '13px', fontWeight: 600,
            color: 'white', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            display: 'block', opacity: visible ? 1 : 0, transition: 'opacity 0.4s',
            letterSpacing: '0.02em',
          }}>
          {posts[index]?.title}
        </Link>
      </div>
      <div style={{ display: 'flex', gap: '4px', padding: '0 16px' }}>
        {posts.map((_, i) => (
          <button key={i} onClick={() => setIndex(i)}
            style={{
              width: '6px', height: '6px', borderRadius: '50%', border: 'none',
              background: i === index ? 'white' : 'rgba(255,255,255,0.4)',
              padding: 0, transition: 'background 0.2s',
            }} />
        ))}
      </div>
    </div>
  )
}
