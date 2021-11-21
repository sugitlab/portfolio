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

const DarkModeButton = () => {
  const { isDarkMode, toggle } = useDarkMode();
  return (
    <div className="pr-4">
      <button onClick={() => toggle(!isDarkMode)}>
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
  const { locale } = useRouter();
  return (
    <div className="pr-4">
      <Link href="/" locale={locale == "en" ? "ja" : "en"} passHref>
        <a>
          <TranslateIcon className="block h-6 w-6 dark:text-gray-100" />
        </a>
      </Link>
    </div>
  );
};

export default function Navbar() {
  return (
    <nav className="flex flex-rows p-2">
      <div className="flex flex-1 font-bold dark:text-gray-100">SugitLab.</div>
      <DarkModeButton />
      <TranslateButton />
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button>
              {open ? (
                <XIcon className="block h-6 w-6 dark:text-gray-100" />
              ) : (
                <MenuIcon className="block h-6 w-6 dark:text-gray-100" />
              )}
            </Popover.Button>
            <Popover.Panel className="origin-top-right absolute right-0">
              {({ close }) => (
                <div className="w-24 rounded-lg bg-white dark:bg-gray-300">
                  <div className="grid grid-col-2">
                    <Popover.Button as={Link} href="/">
                      <a
                        onClick={() => close()}
                        className="p-2 rounded-lg dark:text-black hover:bg-indigo-100"
                      >
                        Home
                      </a>
                    </Popover.Button>
                    <Popover.Button as={Link} href="/test">
                      <a
                        onClick={() => close()}
                        className="p-2 rounded-lg dark:text-black hover:bg-indigo-100"
                      >
                        Test
                      </a>
                    </Popover.Button>
                  </div>
                </div>
              )}
            </Popover.Panel>
          </>
        )}
      </Popover>
    </nav>
  );
}
