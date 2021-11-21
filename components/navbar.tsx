import React from "react";
import Link from "next/link";
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
    <div className="px-2">
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
  return (
    <Popover className="relative px-2">
      <Popover.Button>
        <TranslateIcon className="block h-6 w-6 dark:text-gray-100" />
      </Popover.Button>
      <Popover.Panel className="origin-top-right absolute right-0 filter drop-shadow-md">
        {({ close }) => (
          <div className="w-24 rounded-lg bg-white dark:bg-gray-600">
            <div className="grid grid-col-2">
              <Popover.Button as={Link} href="/" locale="en">
                <a
                  onClick={() => close()}
                  className="p-2 rounded-lg dark:text-white hover:bg-indigo-500"
                >
                  English
                </a>
              </Popover.Button>
              <Popover.Button as={Link} href="/" locale="ja">
                <a
                  onClick={() => close()}
                  className="p-2 rounded-lg dark:text-white hover:bg-indigo-500"
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

const MenuButton = () => {
  return (
    <Popover className="relative px-2">
      {({ open }) => (
        <>
          <Popover.Button>
            {open ? (
              <XIcon className="block h-6 w-6 dark:text-gray-100" />
            ) : (
              <MenuIcon className="block h-6 w-6 dark:text-gray-100" />
            )}
          </Popover.Button>
          <Popover.Panel className="origin-top-right absolute right-0 filter drop-shadow-md">
            {({ close }) => (
              <div className="w-24 rounded-lg bg-white dark:bg-gray-600">
                <div className="grid grid-col-2">
                  <Popover.Button as={Link} href="/">
                    <a
                      onClick={() => close()}
                      className="p-2 rounded-lg dark:text-white hover:bg-indigo-500"
                    >
                      Home
                    </a>
                  </Popover.Button>
                  <Popover.Button as={Link} href="/test">
                    <a
                      onClick={() => close()}
                      className="p-2 rounded-lg dark:text-white hover:bg-indigo-500"
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
  );
};

export default function Navbar() {
  return (
    <nav className="flex flex-rows p-2 sticky top-0 backdrop-blur-sm bg-gray-100 dark:bg-gray-900 bg-opacity-60 dark:bg-opacity-60">
      <div className="flex flex-1 font-bold dark:text-gray-100">SugitLab.</div>
      <DarkModeButton />
      <TranslateButton />
      <MenuButton />
    </nav>
  );
}
