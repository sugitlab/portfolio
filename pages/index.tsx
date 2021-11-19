import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useLocale } from "../hooks/locale";

const Home: NextPage = () => {
  const { t } = useLocale();
  return (
    <>
      <Head>
        <title>Sugitlab.</title>
        <meta
          name="description"
          content="Portfolio site. Designed by Sugitlab."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav>
        <Link href="/" locale="en" passHref>
          <a>EN</a>
        </Link>
        <Link href="/" locale="ja" passHref>
          <a>JA</a>
        </Link>
      </nav>
      <main>
        <p>{t.PROFILE_NAME}</p>
      </main>

      <footer>
        <a
          href="https://twitter.com/sugitlab"
          target="_blank"
          rel="noopener noreferrer"
        >
          Designed by <span>SugitLab.</span>
        </a>
      </footer>
    </>
  );
};

export default Home;
