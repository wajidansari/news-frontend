import { fetchAPI } from '../../lib/graphql-client'
import { GET_ALL_POST_SLUGS } from '../../lib/queries'

export default async function handler(req, res) {
  try {
    const data = await fetchAPI(GET_ALL_POST_SLUGS)
    const posts = data?.posts?.nodes || []
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://headlinesoftoday.com'
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${baseUrl}</loc><changefreq>hourly</changefreq><priority>1.0</priority></url>
  ${posts.map(p => `<url><loc>${baseUrl}/article/${p.slug}</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`).join('\n  ')}
</urlset>`
    res.setHeader('Content-Type', 'application/xml')
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate')
    res.write(sitemap)
    res.end()
  } catch(e) {
    res.status(500).end()
  }
}
