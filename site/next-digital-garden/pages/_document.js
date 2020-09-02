import { Global } from '@emotion/core'
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  /* Uncomment below if you need to change the initial props */
  // static async getInitialProps(ctx) {
  //   const initialProps = await Document.getInitialProps(ctx)
  //   return { ...initialProps }
  // }

  render() {
    return (
      <Html lang="en">
        <Global
          styles={{
            html: {
              boxSizing: 'border-box',
            },
            '*, *::before, *::after': {
              boxSizing: 'inherit',
              margin: 0,
              padding: 0,
            },
            body: {
              margin: 0,
              padding: 0,
            },
          }}
        />
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
