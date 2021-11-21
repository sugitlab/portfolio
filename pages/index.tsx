import type { NextPage } from "next";
import Image from "next/image";
import { useLocale } from "../hooks/locale";

const Profile = () => {
  const { t } = useLocale();
  return (
    <>
      <div className="container p-4 text-center mx-auto">
        <Image
          className="block mx-auto  rounded-full bg-white"
          height={120}
          width={120}
          src="/avatar.png"
          alt="Icon"
        />
        <p className="text-lg font-semibold dark:text-gray-100">
          {t.PROFILE_NAME}
        </p>
        <p className="text-gray-500 dark:text-gray-300">{t.INTRODUCTION}</p>
      </div>
    </>
  );
};

const Home: NextPage = () => {
  return (
    <>
      <Profile />
    </>
  );
};

export default Home;
