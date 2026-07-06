import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Bars3Icon,
  XMarkIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import { useDarkMode } from "../hooks/dark_mode";
import { useLocale } from "../hooks/locale";

const DarkModeButton = () => {
  const { isDarkMode, toggle } = useDarkMode();
  return (
    <div className="px-2">
      <button
        aria-label="darkmode button"
        onClick={() => toggle(!isDarkMode)}
        className="rounded-full p-2 text-sg-gray-500 hover:bg-sg-green-100 hover:text-sg-green-600 dark:text-sg-gray-300 dark:hover:bg-sg-dark-subtle dark:hover:text-sg-green-200 transition-colors duration-200"
      >
        {isDarkMode ? (
          <SunIcon className="block h-5 w-5" />
        ) : (
          <MoonIcon className="block h-5 w-5" />
        )}
      </button>
    </div>
  );
};

const NavLink = ({
  href,
  active,
  children,
}: {
  href: string;
  active?: boolean;
  children: React.ReactNode;
}) => {
  const base =
    "font-display font-bold text-sg-xs tracking-wider uppercase px-3 py-1.5 rounded-full transition-all duration-200 flex items-center gap-1";
  const activeClass = "text-sg-gray-950 bg-sg-green-200 shadow-sg-sm";
  const inactiveClass =
    "text-sg-gray-500 hover:bg-sg-green-100 hover:text-sg-gray-950 dark:text-sg-gray-300 dark:hover:bg-sg-dark-subtle dark:hover:text-sg-gray-100";

  return (
    <Link href={href} passHref>
      <span className={`${base} ${active ? activeClass : inactiveClass} cursor-pointer`}>
        {children}
      </span>
    </Link>
  );
};

const MenuList = () => {
  const { t } = useLocale();
  const router = useRouter();

  return (
    <div className="hidden md:flex items-center gap-1">
      <NavLink href="/" active={router.pathname === "/"}>
        {t.ARTICLES}
      </NavLink>
      <NavLink href="/blog" active={router.pathname === "/blog"}>
        {t.BLOG}
      </NavLink>
      <NavLink href="/profile" active={router.pathname === "/profile"}>
        {t.PROFILE}
      </NavLink>
      <NavLink href="/slides" active={router.pathname === "/slides"}>
        {t.SLIDE_DECK}
      </NavLink>
    </div>
  );
};

const MenuButton = () => {
  const { t } = useLocale();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative px-2 md:hidden" ref={dropdownRef}>
      <button
        aria-label="menu button"
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full p-2 text-sg-gray-500 hover:bg-sg-green-100 hover:text-sg-green-600 dark:text-sg-gray-300 dark:hover:bg-sg-dark-subtle dark:hover:text-sg-green-200 transition-colors duration-200"
      >
        {isOpen ? (
          <XMarkIcon className="block h-5 w-5" />
        ) : (
          <Bars3Icon className="block h-5 w-5" />
        )}
      </button>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 z-50">
          <div className="w-44 rounded-sg-lg bg-white/95 dark:bg-sg-dark-surface/95 border border-white/70 dark:border-white/10 shadow-sg-md overflow-hidden backdrop-blur-md">
            <div className="flex flex-col py-1">
              {[
                { href: "/", label: t.ARTICLES },
                { href: "/blog", label: t.BLOG },
                { href: "/profile", label: t.PROFILE },
                { href: "/slides", label: t.SLIDE_DECK },
              ].map(({ href, label }) => (
                <Link key={href} href={href}>
                  <div
                    onClick={() => setIsOpen(false)}
                    className={`px-4 py-2 font-display text-sg-xs tracking-wider uppercase transition-colors duration-150 cursor-pointer ${
                      router.pathname === href
                        ? "text-sg-gray-950 bg-sg-green-200"
                        : "text-sg-gray-600 dark:text-sg-gray-300 hover:text-sg-gray-950 dark:hover:text-sg-green-200 hover:bg-sg-green-100 dark:hover:bg-sg-dark-subtle"
                    }`}
                  >
                    {label}
                  </div>
                </Link>
              ))}
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
    <nav className="z-50 flex flex-row items-center py-3 px-6 sticky top-0 backdrop-blur-md bg-white/75 dark:bg-sg-dark-base/75 border-b border-white/70 dark:border-white/10">
      <Link href="/" passHref>
        <span className="flex-shrink-0 font-display font-bold text-sg-md tracking-tight text-sg-gray-950 dark:text-sg-gray-100 hover:text-sg-green-600 dark:hover:text-sg-green-200 transition-colors duration-200 cursor-pointer">
          sugitlab<span className="text-sg-green-500 dark:text-sg-green-200">.</span>
        </span>
      </Link>

      {props.noLink ? (
        <div className="flex-1" />
      ) : (
        <>
          <div className="flex-1" />
          <MenuList />
          <div className="flex-1" />
        </>
      )}

      <DarkModeButton />
      {!props.noLink && <MenuButton />}
    </nav>
  );
}
