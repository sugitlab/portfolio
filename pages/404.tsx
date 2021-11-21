import type { NextPage } from "next";
import { useLocale } from "../hooks/locale";

const PageNotFound: NextPage = () => {
  const { t } = useLocale();
  return (
    <div className="h-screen w-screen">
      <p className="pt-20 text-center dark:text-white">{t.PAGENOTFOUND}</p>
    </div>
  );
};

export default PageNotFound;
