const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://headlinesoftoday.com/graphql'

export async function fetchAPI(query, variables = {}) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 },
  })
  const json = await res.json()
  if (json.errors) {
    console.error('GraphQL Errors:', json.errors)
    throw new Error('Failed to fetch API')
  }
  return json.data
}
