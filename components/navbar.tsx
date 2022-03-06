import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Popover } from "@headlessui/react";
import {
  MenuIcon,
  XIcon,
  MoonIcon,
  SunIcon,
  TranslateIcon,
} from "@heroicons/react/outline";
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

const TranslateButton = () => {
  return (
    <Popover className="relative px-2">
      <Popover.Button aria-label="translate button">
        <TranslateIcon className="block h-6 w-6 dark:text-gray-100" />
      </Popover.Button>
      <Popover.Panel className="origin-top-right absolute right-0 filter drop-shadow-md">
        {({ close }) => (
          <div className="w-24 rounded-lg bg-white dark:bg-gray-600">
            <div className="grid grid-col-2">
              <Popover.Button as={Link} href="" locale="en">
                <a
                  onClick={() => close()}
                  className="p-2 rounded-lg dark:text-white hover:bg-indigo-300 dark:hover:bg-indigo-500"
                >
                  English
                </a>
              </Popover.Button>
              <Popover.Button as={Link} href="" locale="ja">
                <a
                  onClick={() => close()}
                  className="p-2 rounded-lg dark:text-white hover:bg-indigo-300 dark:hover:bg-indigo-500"
                >
                  日本語
                </a>
              </Popover.Button>
            </div>
          </div>
        )}
      </Popover.Panel>
    </Popover>
  );
};

const MenuList = () => {
  const { t } = useLocale();
  const router = useRouter();

  return (
    <div className="hidden md:flex">
      <Link href="/" passHref>
        <a className="px-2 font-bold text-base dark:text-gray-100">
          {router.pathname === "/" ? (
            <p className="bg-indigo-500 rounded-md py-1 px-2 text-gray-100 dark:text-base ">
              {t.ARTICLES}
            </p>
          ) : (
            <p className="rounded-md py-1 px-2 text-base dark:text-gray-100">
              {t.ARTICLES}
            </p>
          )}
        </a>
      </Link>
      <Link href="/blog" passHref>
        <a className="px-2 font-bold">
          {router.pathname === "/blog" ? (
            <p className="bg-indigo-500 rounded-md py-1 px-2 text-gray-100 dark:text-base ">
              {t.BLOG}
            </p>
          ) : (
            <p className="rounded-md py-1 px-2 text-base dark:text-gray-100">
              {t.BLOG}
            </p>
          )}
        </a>
      </Link>
      <Link href="/profile" passHref>
        <a className="px-2 font-bold text-base dark:text-gray-100">
          {router.pathname === "/profile" ? (
            <p className="bg-indigo-500 rounded-md py-1 px-2 text-gray-100 dark:text-base ">
              {t.PROFILE}
            </p>
          ) : (
            <p className="rounded-md py-1 px-2 text-base dark:text-gray-100">
              {t.PROFILE}
            </p>
          )}
        </a>
      </Link>
    </div>
  );
};

const MenuButton = () => {
  // Menu button willl hide when the media query is wider than "md" by the tailwind css 'md:hidden'
  const { t } = useLocale();
  return (
    <Popover className="relative px-2 md:hidden">
      {({ open }) => (
        <>
          <Popover.Button aria-label="menu button">
            {open ? (
              <XIcon className="block h-6 w-6 dark:text-gray-100" />
            ) : (
              <MenuIcon className="block h-6 w-6 dark:text-gray-100" />
            )}
          </Popover.Button>
          <Popover.Panel className="origin-top-right absolute right-0 filter drop-shadow-md">
            {({ close }) => (
              <div className="w-32 rounded-lg bg-white dark:bg-gray-600">
                <div className="grid grid-col-2">
                  <Popover.Button as={Link} href="/">
                    <a
                      onClick={() => close()}
                      className="p-2 rounded-lg dark:text-white hover:bg-indigo-300 dark:hover:bg-indigo-500"
                    >
                      {t.ARTICLES}
                    </a>
                  </Popover.Button>
                  <Popover.Button as={Link} href="/blog">
                    <a
                      onClick={() => close()}
                      className="p-2 rounded-lg dark:text-white hover:bg-indigo-300 dark:hover:bg-indigo-500"
                    >
                      {t.BLOG}
                    </a>
                  </Popover.Button>
                  <Popover.Button as={Link} href="/profile">
                    <a
                      onClick={() => close()}
                      className="p-2 rounded-lg dark:text-white hover:bg-indigo-300 dark:hover:bg-indigo-500"
                    >
                      {t.PROFILE}
                    </a>
                  </Popover.Button>
                </div>
              </div>
            )}
          </Popover.Panel>
        </>
      )}
    </Popover>
  );
};

export default function Navbar() {
  return (
    <nav className="z-50 flex flex-rows py-4 px-4 sticky top-0 backdrop-blur-sm bg-gray-100 dark:bg-gray-900 bg-opacity-60 dark:bg-opacity-60">
      <Link href="/" passHref>
        <a className="flex flex-1 font-bold text-xl dark:text-gray-100">
          SugitLab.
        </a>
      </Link>
      <MenuList />
      <div className="flex flex-1" />
      <DarkModeButton />
      <TranslateButton />
      <MenuButton />
    </nav>
  );
}
