import Link from 'next/link'
import Head from 'next/head'

import terms from '../terms'


const Index = () => (
  <div>
    <Head>
      <title>Chromia.io &ndash; Generate beautiful color palettes from photos</title>
    </Head>
    <div className="container">
      <p className="hero-text">
        Chromia is a tool that helps you find the right color palette. Simply search by a term to get a variety of color palettes.
      </p>
      <ul className="grid">
      {
        terms.map(item => (
          <li key={item.uid}>
            <Link href={{ pathname: '/palettes', query: { q: item } }}>
              <a>
                <img src={`
                  ${process.env.NODE_ENV === 'production'
                  ? 'https://chromia.timonforrer.now.sh'
                  : 'http://localhost:3001'
                  }/api/thumbnail/${item.query}`
                } />
              </a>
            </Link>
            <Link href={{ pathname: '/palettes', query: { q: item.query } }}><a className="link__title">Search for "{item.query}"</a></Link>
          </li>
        ))
      }
      </ul>
    </div>
  </div>
);

export default Index;
