require('es6-promise').polyfill();
require('isomorphic-fetch');
import Unsplash, {toJson} from 'unsplash-js';
const getColors = require('get-image-colors');

const unsplash = new Unsplash({
  applicationId: process.env.ACCESS_KEY,
  secret: process.env.SECRET_KEY
});

export default ({ query: { q, load } }, res) => {
  let results = []
  let toLoad = load ? Number(load) : 1
  unsplash.search.photos(q, 1, toLoad)
    .then(toJson)
    .then(response => {
      response.results.map((photo, index) => {
        getColors(photo.urls.thumb)
          .then(colors => {
            let colorArray = []
            colors.map(color => {
              colorArray.push({
                hsl: color.hsl(),
                hex: color.hex(),
                _initial: color
              })
            })

            colorArray.sort((a, b) => b.hsl[2] - a.hsl[2])
            let objectForArray = {
              _index: index,
              colors: colorArray,
              photo: photo
            }

            results.push(objectForArray)

            if(results.length === toLoad) {
              let sortedResults = results.sort((a, b) => a._index - b._index)
              res.status(200).json(sortedResults)
            }

          })
          .catch(err => console.log(err))
      })
    })
}