import fetch from 'isomorphic-unfetch'

import Swatch from '../components/swatch'

const Palettes = ({ data, query }) => (
  <div className="container">
    <ul className="grid">
      {
        data.map((item, index) => <Swatch key={index} {...item} />
        )
      }
    </ul>
  </div>
)

Palettes.getInitialProps = async ({ query }) => {
  const response = await fetch(
    `${process.env.NODE_ENV === 'production'
    ? 'https://chromia.timonforrer.now.sh'
    : 'http://localhost:3001'
    }/api/palettes?q=${query.q}&load=12`
  )

  const data = await response.json()
  return { data, query }
}

export default Palettes
