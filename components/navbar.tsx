import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Bars3Icon,
  XMarkIcon,
  MoonIcon,
  SunIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";
import { useDarkMode } from "../hooks/dark_mode";
import { useLocale } from "../hooks/locale";

const DarkModeButton = () => {
  const { isDarkMode, toggle } = useDarkMode();
  return (
    <div className="px-2">
      <button aria-label="darkmode button" onClick={() => toggle(!isDarkMode)}>
        {isDarkMode ? (
          <SunIcon className="block h-6 w-6 dark:text-gray-100" />
        ) : (
          <MoonIcon className="block h-6 w-6" />
        )}
      </button>
    </div>
  );
};



const MenuList = () => {
  const { t } = useLocale();
  const router = useRouter();

  return (
    <div className="hidden md:flex">
      <Link href="/" passHref>
        <div className="px-2 font-bold text-base dark:text-gray-100">
          {router.pathname === "/" ? (
            <p className="bg-indigo-500 rounded-md py-1 px-2 text-gray-100 dark:text-base ">
              {t.ARTICLES}
            </p>
          ) : (
            <p className="rounded-md py-1 px-2 text-base dark:text-gray-100">
              {t.ARTICLES}
            </p>
          )}
        </div>
      </Link>
      <Link href="/blog" passHref>
        <div className="px-2 font-bold">
          {router.pathname === "/blog" ? (
            <p className="bg-indigo-500 rounded-md py-1 px-2 text-gray-100 dark:text-base ">
              {t.BLOG}
            </p>
          ) : (
            <p className="rounded-md py-1 px-2 text-base dark:text-gray-100">
              {t.BLOG}
            </p>
          )}
        </div>
      </Link>
      <Link href="/profile" passHref>
        <div className="px-2 font-bold text-base dark:text-gray-100">
          {router.pathname === "/profile" ? (
            <p className="bg-indigo-500 rounded-md py-1 px-2 text-gray-100 dark:text-base ">
              {t.PROFILE}
            </p>
          ) : (
            <p className="rounded-md py-1 px-2 text-base dark:text-gray-100">
              {t.PROFILE}
            </p>
          )}
        </div>
      </Link>
      <a href="https://sugitlab.github.io/slide-deck/" target="_blank" rel="noopener noreferrer">
        <div className="px-2 font-bold text-base dark:text-gray-100">
          <p className="rounded-md py-1 px-2 text-base dark:text-gray-100 flex items-center gap-1">
            {t.SLIDE_DECK}
            <ArrowTopRightOnSquareIcon className="h-4 w-4" />
          </p>
        </div>
      </a>
    </div>
  );
};

const MenuButton = () => {
  const { t } = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative px-2 md:hidden" ref={dropdownRef}>
      <button 
        aria-label="menu button"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <XMarkIcon className="block h-6 w-6 dark:text-gray-100" />
        ) : (
          <Bars3Icon className="block h-6 w-6 dark:text-gray-100" />
        )}
      </button>
      {isOpen && (
        <div className="origin-top-right absolute right-0 filter drop-shadow-md">
          <div className="w-32 rounded-lg bg-white dark:bg-gray-600">
            <div className="grid grid-col-2">
              <Link href="/">
                <div
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg dark:text-white hover:bg-indigo-300 dark:hover:bg-indigo-500"
                >
                  {t.ARTICLES}
                </div>
              </Link>
              <Link href="/blog">
                <div
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg dark:text-white hover:bg-indigo-300 dark:hover:bg-indigo-500"
                >
                  {t.BLOG}
                </div>
              </Link>
              <Link href="/profile">
                <div
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg dark:text-white hover:bg-indigo-300 dark:hover:bg-indigo-500"
                >
                  {t.PROFILE}
                </div>
              </Link>
              <a href="https://sugitlab.github.io/slide-deck/" target="_blank" rel="noopener noreferrer">
                <div
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg dark:text-white hover:bg-indigo-300 dark:hover:bg-indigo-500 flex items-center gap-1"
                >
                  {t.SLIDE_DECK}
                  <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                </div>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

type NavbarProps = {
  noLink?: boolean;
};
export default function Navbar(props: NavbarProps) {
  return (
    <nav className="z-50 flex flex-rows py-4 px-4 sticky top-0 backdrop-blur-sm bg-gray-100 dark:bg-gray-900 bg-opacity-60 dark:bg-opacity-60">
      <Link href="/" passHref>
        <div className="flex flex-1 font-bold text-xl dark:text-gray-100">
          SugitLab.
        </div>
      </Link>
      {props.noLink ? (
        <div className="flex flex-1" />
      ) : (
        <>
          <div className="flex flex-1" />
          <MenuList />
          <div className="flex flex-1" />
        </>
      )}
      <DarkModeButton />
      {props.noLink ? (
        <></>
      ) : (
        <>
          <MenuButton />
        </>
      )}
    </nav>
  );
}
