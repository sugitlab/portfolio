import { Html, Head, Main, NextScript, DocumentProps } from "next/document";
import { CssBaseline } from "@nextui-org/react";

export default function Document(props: DocumentProps) {
  return (
    <Html>
      <Head>
        <title>SugitLab.</title>
        <meta
          name="viewport"
          property="og:title"
          content="initial-scale=1.0, width=device-width"
        />
      </Head>
      <CssBaseline />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
