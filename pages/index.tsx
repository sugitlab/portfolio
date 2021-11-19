import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { useLocale } from "./utils/hooks/locale";

const Home: NextPage = () => {
  const { t } = useLocale();
  return (
    <div className={styles.container}>
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
      <main className={styles.main}>
        <p className={styles.description}>{t.PROFILE_NAME}</p>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://twitter.com/sugitlab"
          target="_blank"
          rel="noopener noreferrer"
        >
          Designed by <span className={styles.logo}>SugitLab.</span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
