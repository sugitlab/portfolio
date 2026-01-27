import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Portfolio and tech blog by sugitlab. / Sugitのポートフォリオ兼技術ブログ"
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS Feed for sugitlab blog"
          href="/api/rss.xml"
        />
      </Head>
      <body>
        <div className="bg-gray-100 dark:bg-gray-900 h-full w-full min-h-screen min-w-[375px]">
          <Main />
          <NextScript />
        </div>
      </body>
    </Html>
  );
}
