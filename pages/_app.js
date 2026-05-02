import '../styles/globals.css'
import Layout from '../components/layout/Layout'
import { DefaultSeo } from 'next-seo'

export default function App({ Component, pageProps }) {
  return (
    <>
      <DefaultSeo
        titleTemplate="%s | Headlines Of Today"
        defaultTitle="Headlines Of Today - Breaking News"
        description="Breaking news, analysis and opinion on world events. Stay informed with Headlines Of Today."
        openGraph={{
          type: 'website',
          locale: 'en_US',
          url: process.env.NEXT_PUBLIC_SITE_URL,
          siteName: 'Headlines Of Today',
        }}
        twitter={{ cardType: 'summary_large_image' }}
      />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
