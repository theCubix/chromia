import React, { Component } from 'react'
import App from 'next/app'
import Router from 'next/router'
import NProgress from 'nprogress'
import Head from 'next/head'

import '../styles/main.css'
import Link from 'next/link'

Router.events.on('routeChangeStart', url => {
  console.log(`Loading: ${url}`)
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

class Layout extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.input = React.createRef();
  }
  
  handleSubmit(event) {
    Router.push({
      pathname: '/palettes',
      query: {
        q: this.input.current.value
      }
    })
    event.preventDefault();
  }

  render () {
    const { children } = this.props
    return (
      <div>
        <header className="container">
          <Link href="/"><a><h1>Chromia.io</h1></a></Link>
          <form
            role="search"
            acceptCharset="utf-8"
            onSubmit={this.handleSubmit}
          >
            <input
              type="text"
              name="q"
              placeholder="Search for images. Like llamas for example…"
              className="focus-outline"
              ref={this.input}
            />
            <button type="submit" value="Submit" className="focus-outline">Search</button>
          </form>
        </header>
        {children}
      </div>
    )
  }
}

export default class MyApp extends App {
  render () {
    const { Component, pageProps } = this.props
    return (
      <>
        <Head>
          {/* Import CSS for nprogress */}
          <link rel='stylesheet' type='text/css' href='/static/nprogress.css' />
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </>
    )
  }
}