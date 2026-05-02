import { formatDistanceToNow, format, parseISO } from 'date-fns'

export function formatDate(dateString) {
  try {
    const date = parseISO(dateString)
    return format(date, 'MMMM d, yyyy')
  } catch {
    return dateString
  }
}

export function timeAgo(dateString) {
  try {
    const date = parseISO(dateString)
    return formatDistanceToNow(date, { addSuffix: true })
  } catch {
    return dateString
  }
}

export function stripHtml(html) {
  return html?.replace(/<[^>]*>/g, '') || ''
}

export function truncate(str, length = 120) {
  const stripped = stripHtml(str)
  return stripped.length > length ? stripped.substring(0, length) + '...' : stripped
}

export function getImageUrl(post) {
  return post?.featuredImage?.node?.sourceUrl || '/images/placeholder.jpg'
}

export function getCategoryColor(slug) {
  const colors = {
    politics: '#cc0000',
    world: '#0056a6',
    business: '#00704a',
    technology: '#7b2d8b',
    sports: '#e8760a',
    entertainment: '#c4007a',
    health: '#006d6d',
    science: '#1a4f8a',
  }
  return colors[slug] || '#cc0000'
}
