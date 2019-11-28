import { sanitizeHtml } from './sanitizer'

export function getHtml(data) {
  const {
    colors,
    photo
  } = data[0]

  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>Generated Image</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style>
      * {
        margin: 0;
        box-sizing: border-box;
      }
      .pin {
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        position: absolute;
        width: 100%;
        height: 100%;
      }
      img {
        object-fit: cover;
      }
      .colors {
        display: flex;
        flex-direction: column;
        padding: 2rem 1.5rem;
        z-index: 1;
      }
      .colors > * ~ * { margin-top: 0.5rem; }
      .color {
        box-shadow: 0px 10px 40px rgba(42, 82, 160, 0.25), 0px 3px 4px rgba(0, 0, 0, 0.1);
        flex-grow: 1;
        margin-left: auto;
        width: 40vw;
      }
      </style>
    </head>
    <body>
      <div class="pin colors">
      ${
        colors.map(color => `<div class="color" style="background-color: ${sanitizeHtml(color.hex)}"></div>`).join('')
      }
      </div>
      <img class="pin" src="${sanitizeHtml(photo.urls.regular)}" />
    </body>
  </html>`
}
