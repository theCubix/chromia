import React, { Component } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import {Snackbar} from '@material/react-snackbar'

import "@material/react-button/dist/button.min.css"
import "@material/react-snackbar/dist/snackbar.min.css"

class Swatch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      copied: false,
      snackbarOpen: false
    }
  }

  render () {
    const {
      photo,
      colors
    } = this.props

    return (
      <li>
        <div className="square-image">
          <img
            style={{backgroundColor: photo.color}}
            className="square-image__canvas" src={photo.urls.small}
          />
        </div>
        <div className="boxes">
          {
            colors.map((color, index) => (
              <div key={index} className="swatch">
                <CopyToClipboard text={color.hex} onCopy={() => this.setState({snackbarOpen: true})}>
                  <button
                    className="box focus-outline"
                    style={{backgroundColor: color.hex}}>
                  </button>
                </CopyToClipboard>
                <CopyToClipboard text={color.hex} onCopy={() => this.setState({snackbarOpen: true})}>
                  <div className="swatch__code">
                    {color.hex}
                  </div>
                </CopyToClipboard>
              </div>
            ))
          }
          <Snackbar
            open={this.state.snackbarOpen}
            message="Copied to clipboard"
            onClose={() => this.setState({snackbarOpen: false})}
            actionText="Okay"
          />
        </div>
      </li>
    )
  }
}

export default Swatch


// class Swatche extends Component {
  
//   render () {
//     let {
//       colors
//     } = this.props
//     return (
//       <div>
//         {
//           colors.map((color, index) => <div key={`swatch-${index}`} style={{ backgroundColor: color.hex }} />)
//         }
//       </div>
//     )
//   }
// }