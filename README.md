# Headlines Of Today — Next.js Headless Frontend

A production-ready headless Next.js frontend for headlinesoftoday.com, powered by WordPress + WPGraphQL.

## Prerequisites

- Node.js 18+
- WordPress site with **WPGraphQL plugin** installed and activated
- WPGraphQL endpoint: `https://headlinesoftoday.com/graphql`

## Setup

```bash
npm install
cp .env.local.example .env.local
# Edit .env.local with your WordPress GraphQL URL
npm run dev
```

## WordPress Plugins Required

1. **WPGraphQL** (free) — https://www.wpgraphql.com/
2. **WPGraphQL for ACF** (optional, for custom fields)
3. **Yoast SEO + WPGraphQL for Yoast SEO** (optional, for SEO meta)

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with hero + latest news |
| `/article/[slug]` | Single article page |
| `/category/[slug]` | Category listing with load more |
| `/search?q=query` | Search results |
| `/about` | About page |
| `/contact` | Contact form |
| `/api/sitemap` | Dynamic XML sitemap |

## Deployment

### Vercel (recommended)
```bash
npm install -g vercel
vercel
```
Set environment variables in Vercel dashboard.

### Self-hosted (your server)
```bash
npm run build
npm start
# Run on port 3000, proxy via Nginx
```

### Nginx reverse proxy config
```nginx
server {
    server_name headlinesoftoday.com;
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Customization

- **Colors**: Edit CSS variables in `styles/globals.css`
- **GraphQL URL**: Update `NEXT_PUBLIC_WORDPRESS_API_URL` in `.env.local`
- **Navigation**: Categories are auto-pulled from WordPress
- **Breaking news ticker**: Tag posts with "breaking" category in WordPress
- **Featured hero**: Tag posts with "featured" category in WordPress

## Performance

- Static generation (ISR) for article pages — revalidates every 5 minutes
- Homepage revalidates every 60 seconds
- Images optimized via Next.js Image component
- Sitemap auto-generated from all posts
