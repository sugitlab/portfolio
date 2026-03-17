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
      <button
        aria-label="darkmode button"
        onClick={() => toggle(!isDarkMode)}
        className="text-sg-gray-400 hover:text-sg-lime-200 transition-colors duration-200"
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
  external,
}: {
  href: string;
  active?: boolean;
  children: React.ReactNode;
  external?: boolean;
}) => {
  const base =
    "font-display text-sg-xs tracking-wider uppercase px-3 py-1 rounded-sg-sm transition-all duration-200 flex items-center gap-1";
  const activeClass = "text-sg-gray-950 bg-sg-lime-200";
  const inactiveClass =
    "text-sg-gray-400 hover:text-sg-gray-100 dark:text-sg-gray-300 dark:hover:text-sg-gray-100";

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} ${inactiveClass}`}
      >
        {children}
        <ArrowTopRightOnSquareIcon className="h-3 w-3" />
      </a>
    );
  }

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
      <NavLink
        href="https://sugitlab.github.io/slide-deck/"
        external
      >
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
        className="text-sg-gray-300 hover:text-sg-lime-200 transition-colors duration-200"
      >
        {isOpen ? (
          <XMarkIcon className="block h-5 w-5" />
        ) : (
          <Bars3Icon className="block h-5 w-5" />
        )}
      </button>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 z-50">
          <div className="w-40 rounded-sg-md bg-[#171F24] border border-[#2A3740] shadow-sg-md overflow-hidden">{/* Solid opaque background — no transparency */}
            <div className="flex flex-col py-1">
              {[
                { href: "/", label: t.ARTICLES },
                { href: "/blog", label: t.BLOG },
                { href: "/profile", label: t.PROFILE },
              ].map(({ href, label }) => (
                <Link key={href} href={href}>
                  <div
                    onClick={() => setIsOpen(false)}
                    className={`px-4 py-2 font-display text-sg-xs tracking-wider uppercase transition-colors duration-150 cursor-pointer ${
                      router.pathname === href
                        ? "text-sg-gray-950 bg-sg-lime-200"
                        : "text-sg-gray-300 hover:text-sg-lime-200 hover:bg-sg-dark-subtle"
                    }`}
                  >
                    {label}
                  </div>
                </Link>
              ))}
              <a
                href="https://sugitlab.github.io/slide-deck/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 font-display text-sg-xs tracking-wider uppercase text-sg-gray-300 hover:text-sg-lime-200 hover:bg-sg-dark-subtle transition-colors duration-150 flex items-center gap-1 cursor-pointer"
                >
                  {t.SLIDE_DECK}
                  <ArrowTopRightOnSquareIcon className="h-3 w-3" />
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
    <nav className="z-50 flex flex-row items-center py-3 px-6 sticky top-0 backdrop-blur-sm bg-sg-gray-950/90 border-b border-sg-dark-muted">
      <Link href="/" passHref>
        <span className="flex-shrink-0 font-display font-bold text-sg-base tracking-tight text-sg-gray-100 hover:text-sg-lime-200 transition-colors duration-200 cursor-pointer">
          sugitlab<span className="text-sg-lime-200">.</span>
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
