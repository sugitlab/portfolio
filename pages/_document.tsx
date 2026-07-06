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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Grape+Nuts&family=Space+Mono:wght@400;700&family=Zen+Kaku+Gothic+New:wght@300;400;500;700&family=Zen+Maru+Gothic:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <div className="h-full w-full min-h-screen min-w-[375px]">
          <Main />
          <NextScript />
        </div>
      </body>
    </Html>
  );
}
