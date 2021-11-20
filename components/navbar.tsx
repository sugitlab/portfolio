import React from "react";
import Link from "next/link";
import { Popover } from "@headlessui/react";
import { MenuIcon } from "@heroicons/react/outline";

export default function Navbar() {
  return (
    <nav className="flex flex-rows p-2">
      <div className="flex flex-1 font-bold dark:text-gray-100">SugitLab.</div>
      <Popover className="relative">
        <Popover.Button>
          <MenuIcon className="block h-6 w-6 dark:text-gray-100" />
        </Popover.Button>
        <Popover.Panel className="origin-top-right absolute right-0">
          <div className="w-24 rounded-lg bg-white dark:bg-gray-400">
            <div className="grid grid-col-2">
              <Link href="/">
                <a className="p-2 rounded-lg dark:text-black hover:bg-indigo-100">
                  Home
                </a>
              </Link>
              <Link href="/test">
                <a className="p-2 rounded-lg dark:text-black hover:bg-indigo-100">
                  Test
                </a>
              </Link>
            </div>
          </div>
        </Popover.Panel>
      </Popover>
    </nav>
  );
}
