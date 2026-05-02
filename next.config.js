/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'headlinesoftoday.com',
      'secure.gravatar.com',
      'i0.wp.com',
      'i1.wp.com',
      'i2.wp.com',
    ],
  },
}

module.exports = nextConfig
