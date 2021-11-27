import Image from "next/image";
import Link from "next/link";
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
  SiGithub,
  SiTwitter,
  SiLinkedin,
} from "react-icons/si";
import { useLocale } from "../hooks/locale";

const SkillIcons = () => {
  const size = "15";
  return (
    <div>
      <div className="flex flex-row flex-wrap items-center justify-center mx-auto py-2 gap-4">
        <SiFlutter size={size} className="text-gray-600 dark:text-white" />
        <SiReact size={size} className="text-gray-600 dark:text-white" />
        <SiDotnet size="25" className="text-gray-600 dark:text-white" />
        <SiDart size={size} className="text-gray-600 dark:text-white" />
        <SiTypescript size={size} className="text-gray-600 dark:text-white" />
        <SiJavascript size={size} className="text-gray-600 dark:text-white" />
        <SiCsharp size={size} className="text-gray-600 dark:text-white" />
        <SiCplusplus size={size} className="text-gray-600 dark:text-white" />
        <SiPython size={size} className="text-gray-600 dark:text-white" />
      </div>
    </div>
  );
};

const TechLinks = () => {
  const { t } = useLocale();
  const size = "20";
  const github = "https://github.com/sugitlab";
  const linkedin = "https://www.linkedin.com/in/shinjisugimoto";
  return (
    <div className="flex flex-row gap-2">
      <Link href={github} passHref>
        <SiGithub
          size={size}
          className="text-gray-600 dark:text-white hover:text-indigo-500 dark:hover:text-indigo-500"
        />
      </Link>
      <Link href={t.TWITTER} passHref>
        <SiTwitter
          size={size}
          className="text-gray-600 dark:text-white hover:text-indigo-500 dark:hover:text-indigo-500"
        />
      </Link>
      <Link href={linkedin} passHref>
        <SiLinkedin
          size={size}
          className="text-gray-600 dark:text-white hover:text-indigo-500 dark:hover:text-indigo-500"
        />
      </Link>
    </div>
  );
};

const Profile = () => {
  const { t } = useLocale();
  return (
    <div className="container max-w-sm w-4/5 md:w-1/3 h-full px-8 py-4 rounded-3xl bg-gray-200 mx-auto dark:bg-gray-600">
      <div className="flex items-center pb-4">
        <Image
          className="block mx-auto rounded-full bg-gray-100"
          height={80}
          width={80}
          src="/avatar.png"
          alt="Icon"
        />
        <div className="flex flex-col px-4">
          <p className="py-2 text-2xl font-semibold dark:text-gray-100">
            {t.PROFILE_NAME}
          </p>
          <TechLinks />
        </div>
      </div>
      <p className="text-sm dark:text-gray-100">{t.INTRODUCTION}</p>
      <SkillIcons />
    </div>
  );
};

export default Profile;
