import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        {/* <link rel="icon" type="image/x-icon" href="/favicon.ico"></link> */}
        {/* <link rel="sitemap" type="application/xml" title="sitemap" href="/sitemap.xml" /> */}
        <meta name="robots" content="index, archive" />
        <meta charSet="UTF-8" />
        
        <meta property="og:site_name" content="IMPC" />
        <meta property="og:type" content="website" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
