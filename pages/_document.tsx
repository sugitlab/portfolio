import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <meta
          name="viewport"
          property="og:title"
          content="initial-scale=1.0, width=device-width"
        />
      </Head>
      <body>
        <div className="bg-gray-200 dark:bg-gray-600 h-screen w-screen">
          <Main />
          <NextScript />
        </div>
      </body>
    </Html>
  );
}
