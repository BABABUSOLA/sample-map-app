import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Add meta tags, links, or any head-specific configurations */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        {/* Customize the <body> here */}
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
