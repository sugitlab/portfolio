import type { NextPage } from "next";
import { useLocale } from "../hooks/locale";
import Link from "next/link";

const Home: NextPage = () => {
  const { t } = useLocale();
  return (
    <>
      <Link href="/test" passHref>
        <a>test</a>
      </Link>
      <p>{t.PROFILE_NAME}</p>
    </>
  );
};

export default Home;
