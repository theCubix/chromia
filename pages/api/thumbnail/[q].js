import { getHtml } from '../_lib/template'
import { writeTempFile, pathToFileURL } from '../_lib/file'
import { getScreenshot } from '../_lib/chromium'
import fetch from 'isomorphic-unfetch'

const isDev = process.env.NOW_REGION === 'dev1'
const debugHtml = false

async function getData(query) {
  let response = await fetch(`${
    process.env.NODE_ENV === 'production'
    ? 'https://chromia.timonforrer.now.sh'
    : 'http://localhost:3001' }/api/palettes?q=${query}`)
  let data = await response.json()
  return data
}

export default async function handler(req, res) {
  const {
    query: { q }
  } = req
  try {
    let data = await getData(q)
    const html = getHtml(data)
    if (debugHtml) {
      res.setHeader('Content-Type', 'text/html')
      res.end(html)
      return
    }
    const text = decodeURIComponent(q)
    const filePath = await writeTempFile(text, html)
    const fileUrl = pathToFileURL(filePath)
    const file = await getScreenshot(fileUrl, isDev)
    res.statusCode = 200
    res.setHeader('Content-Type', 'image/png')
    res.setHeader('Cache-Control', `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`)
    res.end(file)
  } catch(e) {
    res.statusCode = 500
    res.setHeader('Content-Type', 'text/html')
    res.end(`<h1>Internal Error</h1><p>Sorry, there was an error.</p><pre>${e}</pre>`)
    console.error(e)
  }
}