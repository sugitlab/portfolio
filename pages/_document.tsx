import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="viewport" property="og:title" />
      </Head>
      <body>
        <div className="bg-gray-100 dark:bg-gray-900 h-full w-full min-h-screen">
          <Main />
          <NextScript />
        </div>
      </body>
    </Html>
  );
}
