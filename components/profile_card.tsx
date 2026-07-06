import Image from "next/image";
import Link from "next/link";
import {
  SiDotnet,
  SiReact,
  SiFlutter,
  SiCplusplus,
  SiDart,
  SiTypescript,
  SiJavascript,
  SiPython,
  SiLinkedin,
  SiGithub,
  SiX,
} from "react-icons/si";
import { useLocale } from "../hooks/locale";

const SkillIcons = () => {
  const size = "14";
  return (
    <div className="flex flex-row flex-wrap items-center justify-center gap-3 pt-3">
      <SiFlutter size={size} className="text-sg-green-600 dark:text-sg-green-300" />
      <SiReact size={size} className="text-sg-blue-600 dark:text-sg-blue-300" />
      <SiDotnet size="22" className="text-sg-gray-500 dark:text-sg-gray-300" />
      <SiDart size={size} className="text-sg-blue-600 dark:text-sg-blue-300" />
      <SiTypescript size={size} className="text-sg-green-600 dark:text-sg-green-300" />
      <SiJavascript size={size} className="text-sg-gray-500 dark:text-sg-gray-300" />
      <SiCplusplus size={size} className="text-sg-gray-500 dark:text-sg-gray-300" />
      <SiPython size={size} className="text-sg-green-600 dark:text-sg-green-300" />
    </div>
  );
};

const TechLinks = () => {
  const { t } = useLocale();
  const size = "18";
  const github = "https://github.com/sugitlab";
  const linkedin = "https://www.linkedin.com/in/shinjisugimoto";
  return (
    <div className="flex flex-row gap-3">
      <Link href={github} passHref>
        <SiGithub
          size={size}
          className="text-sg-gray-500 dark:text-sg-gray-400 hover:text-sg-green-600 dark:hover:text-sg-green-200 transition-colors duration-200 cursor-pointer"
        />
      </Link>
      <Link href={t.TWITTER} passHref>
        <SiX
          size={size}
          className="text-sg-gray-500 dark:text-sg-gray-400 hover:text-sg-green-600 dark:hover:text-sg-green-200 transition-colors duration-200 cursor-pointer"
        />
      </Link>
      <Link href={linkedin} passHref>
        <SiLinkedin
          size={size}
          className="text-sg-gray-500 dark:text-sg-gray-400 hover:text-sg-blue-600 dark:hover:text-sg-blue-300 transition-colors duration-200 cursor-pointer"
        />
      </Link>
    </div>
  );
};

const Profile = () => {
  const { t } = useLocale();
  return (
    <div className="w-full md:w-72 flex-shrink-0">
      <div className="bg-white/80 dark:bg-sg-dark-surface/80 border border-white/80 dark:border-white/10 rounded-sg-lg p-6 shadow-sg-md backdrop-blur-sm">
        {/* Avatar + Name */}
        <div className="flex items-center gap-3 pb-4 border-b border-sg-green-100 dark:border-white/10">
          <div className="relative w-14 h-14 rounded-full overflow-hidden ring-4 ring-sg-green-100 dark:ring-sg-dark-subtle flex-shrink-0">
            <Image
              className="block"
              fill
              sizes="56px"
              src="/avatar.png"
              alt="Avatar"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="flex flex-col">
            <p className="font-display font-bold text-sg-base text-sg-gray-800 dark:text-sg-gray-100 tracking-tight">
              {t.PROFILE_NAME}
            </p>
            <p className="font-body text-sg-xs text-sg-gray-500 mt-0.5">
              Creative Technologist
            </p>
          </div>
        </div>

        {/* Bio */}
        <p className="font-body text-sg-sm text-sg-gray-600 dark:text-sg-gray-400 leading-relaxed pt-4 pb-3">
          {t.INTRODUCTION}
        </p>

        {/* Social links */}
        <div className="pb-3 border-b border-sg-green-100 dark:border-white/10">
          <TechLinks />
        </div>

        {/* Skills */}
        <SkillIcons />
      </div>
    </div>
  );
};

export default Profile;
