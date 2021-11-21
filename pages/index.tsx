import type { NextPage } from "next";
import Image from "next/image";
import { useLocale } from "../hooks/locale";
import { useDarkMode } from "../hooks/dark_mode";
// ICONS
import {
  SiDotnet,
  SiReact,
  SiFlutter,
  SiCsharp,
  SiCplusplus,
  SiDart,
  SiTypescript,
  SiJavascript,
  SiPython,
} from "react-icons/si";

const SkillIcons = () => {
  const { isDarkMode, toggle } = useDarkMode();
  const color = isDarkMode ? "white" : "gray";
  const size = "20";
  return (
    <div>
      <div className="flex flex-row flex-wrap items-center justify-center w-4/5 mx-auto py-2 gap-4">
        <SiFlutter size={size} color={color} />
        <SiReact size={size} color={color} />
        <SiDotnet size="30" color={color} />
        <SiDart size={size} color={color} />
        <SiTypescript size={size} color={color} />
        <SiJavascript size={size} color={color} />
        <SiCsharp size={size} color={color} />
        <SiCplusplus size={size} color={color} />
        <SiPython size={size} color={color} />
      </div>
    </div>
  );
};

const Profile = () => {
  const { t } = useLocale();
  return (
    <div className="container w-4/5 md:w-1/3 h-full px-8 py-4 rounded-3xl bg-gray-200 mx-auto dark:bg-gray-600">
      <div className="flex items-center pb-4">
        <Image
          className="block mx-auto rounded-full bg-gray-100"
          height={80}
          width={80}
          src="/avatar.png"
          alt="Icon"
        />
        <p className="px-4 text-2xl font-semibold dark:text-gray-100">
          {t.PROFILE_NAME}
        </p>
      </div>
      <p className="text-sm dark:text-gray-100">{t.INTRODUCTION}</p>
      <SkillIcons />
    </div>
  );
};

const Chips = () => {
  return (
    <div className="flex flex-row">
      <p className="w-auto text-xs px-2 text-gray-100 text-center rounded-full bg-blue-500">
        Zenn
      </p>
    </div>
  );
};

const ArticleCard = () => {
  return (
    <div>
      <div className="flex flex-row container h-28 rounded-xl p-2">
        <div className="flex flex-none justify-center item-center filter rounded-2xl">
          <Image
            className="block m-auto"
            height={50}
            width={50}
            src="/zenn.svg"
            alt="Icon"
          />
        </div>
        <div className="flex flex-col px-4">
          <p className="flex-1 line-clamp-2 text-lg font-bold dark:text-gray-200">
            Article title is hoge fuga piyopiyo fuga fuga fuga hoge
          </p>
          <p className="text-sm text-gray-500">20xx/xx/xx</p>
          <Chips />
        </div>
      </div>
    </div>
  );
};

const Articles = () => {
  return (
    <div className="container w-4/5 md:w-1/2 mx-auto">
      <div className="divide-solid divide-gray-200 divide-y-2 dark:divide-gray-800 flex flex-col">
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
      </div>
    </div>
  );
};

const Home: NextPage = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <p className="text-center text-xl font-bold text-indigo-700 dark:text-indigo-400">
        {" "}
        Articles{" "}
      </p>
      <Articles />
      <div className="h-10" />
      <Profile />
    </div>
  );
};

export default Home;
