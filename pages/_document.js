import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
      return (
        <Html>
          <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
          <Head>
            {/* add webfonts, favicon, stylesheets etc for all the document */}
            
            {/* <link rel="stylesheet" href="/styles.css" /> */}
          </Head>
          <body>
            <Main />
            <NextScript />
          </body>
        </Html>
      );
    }
  }
  
  export default MyDocument;