import { NextSeo } from 'next-seo'

export default function About() {
  return (
    <>
      <NextSeo title="About Us" description="About Headlines Of Today - trusted news source." />
      <div style={{ background: 'var(--black)', borderBottom: '4px solid var(--red)' }}>
        <div className="container" style={{ padding: '48px 20px' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(32px, 5vw, 64px)', color: 'white', lineHeight: 1 }}>About Us</h1>
        </div>
      </div>
      <div style={{ background: 'var(--cream)', padding: '60px 0' }}>
        <div className="container" style={{ maxWidth: '720px' }}>
          <div style={{ fontSize: '18px', fontFamily: 'var(--font-body)', lineHeight: 1.8, color: 'var(--dark)' }}>
            <p style={{ fontSize: '22px', fontWeight: 600, marginBottom: '24px' }}>
              Headlines Of Today is your trusted source for breaking news, in-depth analysis, and opinion on world events.
            </p>
            <p style={{ marginBottom: '20px' }}>
              We believe in journalism that informs, empowers and holds power to account. Our team of reporters and editors works around the clock to bring you the stories that matter.
            </p>
            <p style={{ marginBottom: '20px' }}>
              Founded with a commitment to accuracy, fairness, and independence, Headlines Of Today covers politics, business, technology, sports, health and more — from India and around the world.
            </p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 700, marginTop: '40px', marginBottom: '16px', borderLeft: '4px solid var(--red)', paddingLeft: '16px' }}>Our Principles</h2>
            <ul style={{ marginLeft: '20px' }}>
              {['Accuracy above speed', 'Independence from political influence', 'Transparency with our readers', 'Fair representation of all voices', 'Rigorous fact-checking on every story'].map(p => (
                <li key={p} style={{ marginBottom: '10px' }}>{p}</li>
              ))}
            </ul>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 700, marginTop: '40px', marginBottom: '16px', borderLeft: '4px solid var(--red)', paddingLeft: '16px' }}>Contact Us</h2>
            <p>For editorial enquiries: <a href="mailto:editor@headlinesoftoday.com" style={{ color: 'var(--red)' }}>editor@headlinesoftoday.com</a></p>
            <p style={{ marginTop: '8px' }}>For advertising: <a href="mailto:ads@headlinesoftoday.com" style={{ color: 'var(--red)' }}>ads@headlinesoftoday.com</a></p>
          </div>
        </div>
      </div>
    </>
  )
}
