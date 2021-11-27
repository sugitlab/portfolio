import type { AppProps } from "next/app";
import Head from "next/head";
import "../styles/globals.css";
import Layout from "../components/layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="viewport" property="og:title" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
export default MyApp;
