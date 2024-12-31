import React from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";
import "../styles/globals.css";
import 'zenn-content-css';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  React.useEffect(() => {
    import("zenn-embed-elements");
  }, []);

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      {/** 
      <script dangerouslySetInnerHTML={{ __html: initTwitterScriptInner }} />
      */}
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="viewport" property="og:title" />
      </Head>
      {getLayout(<Component {...pageProps} />)}
    </>
  );
}
export default MyApp;
