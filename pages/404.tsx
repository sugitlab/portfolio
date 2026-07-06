import type { NextPage } from "next";
import { useLocale } from "../hooks/locale";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

const PageNotFound: NextPage = () => {
  const { t } = useLocale();
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar noLink />
      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        <p className="font-display font-bold text-sg-5xl text-sg-green-200 dark:text-sg-dark-muted">404</p>
        <p className="font-body text-sg-base text-sg-gray-500 dark:text-sg-gray-300">{t.PAGENOTFOUND}</p>
      </div>
      <Footer />
    </div>
  );
};

export default PageNotFound;
