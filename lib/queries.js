// ─── HOME PAGE ───────────────────────────────────────────────────────────────
export const GET_HOME_POSTS = `
  query GetHomePosts {
    featuredPost: posts(first: 1, where: { categoryName: "featured" }) {
      nodes {
        id
        title
        slug
        excerpt
        date
        featuredImage { node { sourceUrl altText } }
        categories { nodes { name slug } }
        author { node { name } }
      }
    }
    latestPosts: posts(first: 12) {
      nodes {
        id
        title
        slug
        excerpt
        date
        featuredImage { node { sourceUrl altText } }
        categories { nodes { name slug } }
        author { node { name } }
      }
    }
    categories(first: 10, where: { hideEmpty: true }) {
      nodes { id name slug count }
    }
  }
`

// ─── SINGLE POST ─────────────────────────────────────────────────────────────
export const GET_POST_BY_SLUG = `
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      title
      content
      excerpt
      date
      modified
      slug
      featuredImage { node { sourceUrl altText mediaDetails { width height } } }
      categories { nodes { name slug } }
      tags { nodes { name slug } }
      author { node { name avatar { url } } }
      seo { title description }
    }
  }
`

// ─── ALL POST SLUGS (for static generation) ──────────────────────────────────
export const GET_ALL_POST_SLUGS = `
  query GetAllPostSlugs {
    posts(first: 1000) {
      nodes { slug }
    }
  }
`

// ─── CATEGORY PAGE ───────────────────────────────────────────────────────────
export const GET_POSTS_BY_CATEGORY = `
  query GetPostsByCategory($slug: String!, $after: String) {
    posts(first: 12, after: $after, where: { categoryName: $slug }) {
      pageInfo { hasNextPage endCursor }
      nodes {
        id
        title
        slug
        excerpt
        date
        featuredImage { node { sourceUrl altText } }
        categories { nodes { name slug } }
        author { node { name } }
      }
    }
    category(id: $slug, idType: SLUG) {
      name
      description
      count
    }
  }
`

// ─── SEARCH ──────────────────────────────────────────────────────────────────
export const SEARCH_POSTS = `
  query SearchPosts($query: String!) {
    posts(where: { search: $query }, first: 20) {
      nodes {
        id
        title
        slug
        excerpt
        date
        featuredImage { node { sourceUrl altText } }
        categories { nodes { name slug } }
      }
    }
  }
`

// ─── MENU / NAV ──────────────────────────────────────────────────────────────
export const GET_MENU = `
  query GetMenu {
    categories(first: 8, where: { hideEmpty: true, orderby: COUNT, order: DESC }) {
      nodes { id name slug }
    }
  }
`
