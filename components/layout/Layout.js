import Header from './Header'
import Footer from './Footer'
import BreakingNewsTicker from './BreakingNewsTicker'

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <BreakingNewsTicker />
      <main style={{ minHeight: '60vh' }}>{children}</main>
      <Footer />
    </>
  )
}
