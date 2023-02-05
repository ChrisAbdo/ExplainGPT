import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="ExplainerGPT. Explain anything like you are a 5 year old."
          />
          <meta property="og:site_name" content="chrisabdo.com" />
          <meta
            property="og:description"
            content="ExplainerGPT. Explain anything like you are a 5 year old."
          />
          <meta property="og:title" content="ExplainerGPT" />
          <meta name="twitter:title" content="ExplainerGPT" />
          <meta
            name="twitter:description"
            content="ExplainerGPT. Explain anything like you are a 5 year old."
          />
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
