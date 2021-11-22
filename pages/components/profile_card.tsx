import Image from "next/image";
import { useLocale } from "../../hooks/locale";
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
  const size = "20";
  return (
    <div>
      <div className="flex flex-row flex-wrap items-center justify-center w-4/5 mx-auto py-2 gap-4">
        <SiFlutter size={size} className="text-gray-600 dark:text-white" />
        <SiReact size={size} className="text-gray-600 dark:text-white" />
        <SiDotnet size="30" className="text-gray-600 dark:text-white" />
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
        <p className="px-4 text-2xl font-semibold dark:text-gray-100">
          {t.PROFILE_NAME}
        </p>
      </div>
      <p className="text-sm dark:text-gray-100">{t.INTRODUCTION}</p>
      <SkillIcons />
    </div>
  );
};

export default Profile;
