"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeToggler from "./ThemeToggler";
import { services } from "@/data/services";

const Header = () => {
  // Navbar toggle
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen);
  };

  // Sticky Navbar
  const [sticky, setSticky] = useState(false);
  const handleStickyNavbar = () => {
    if (window.scrollY >= 80) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
    return () => window.removeEventListener("scroll", handleStickyNavbar);
  }, []);

  // Submenu handler
  const [openIndex, setOpenIndex] = useState(-1);
  const handleSubmenu = (index) => {
    if (openIndex === index) {
      setOpenIndex(-1);
    } else {
      setOpenIndex(index);
    }
  };

  const pathname = usePathname();

  // Menu data with Home, Services dropdown, and Blog
  const menuData = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "Services",
      submenu: services.map(service => ({
        title: service.title,
        path: `/services/${service.slug}`,
      })),
    },
    {
      title: "Blog",
      path: "/blog",
    },
  ];

  return (
    <>
      <header
        className={`header left-0 top-0 z-50 flex w-full items-center ${sticky
          ? "fixed bg-white/95 shadow-2xl backdrop-blur-xl transition-all duration-500 dark:bg-gray-900/95 dark:shadow-gray-800/30"
          : "absolute bg-transparent"
          }`}
      >
        {/* Animated background elements */}
        {!sticky && (
          <div className="absolute inset-0 overflow-hidden opacity-15 dark:opacity-25">
            <div className="absolute left-1/4 top-1/4 h-40 w-40 rounded-full bg-gradient-to-r from-blue-500/30 to-purple-500/30 animate-[float_10s_ease-in-out_infinite]"></div>
            <div className="absolute bottom-1/3 right-1/4 h-48 w-48 rounded-full bg-gradient-to-r from-purple-500/30 to-indigo-500/30 animate-[float_12s_ease-in-out_infinite_reverse]"></div>
          </div>
        )}

        <div className="container relative mx-auto px-4">
          <div className="relative flex items-center justify-between">
            {/* Logo - Left aligned */}
            <div className="flex items-center">
              <Link
                href="/"
                className={`header-logo block transition-all duration-500 ${sticky ? "py-4" : "py-6"
                  }`}
              >
                <Image
                  src="/images/logo/logo.svg"
                  alt="logo"
                  width={160}
                  height={40}
                  className="hidden w-full dark:block hover:opacity-90"
                  style={{ width: 100, height: 60 }}
                />
              </Link>
            </div>

            {/* Centered Navigation */}
            <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2">
              <nav className="flex items-center justify-center">
                <ul className="flex space-x-10">
                  {menuData.map((menuItem, index) => (
                    <li key={index} className="group relative">
                      {menuItem.path ? (
                        <Link
                          href={menuItem.path}
                          className={`relative flex items-center py-6 text-lg font-medium transition-all duration-300 ${pathname === menuItem.path
                            ? "text-primary dark:text-white"
                            : "text-gray-800 hover:text-primary dark:text-gray-200 dark:hover:text-white"
                            }`}
                        >
                          {menuItem.title}
                          {pathname === menuItem.path && (
                            <span className="absolute -bottom-2 left-0 h-1 w-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></span>
                          )}
                        </Link>
                      ) : (
                        <div className="relative">
                          <button
                            onClick={() => handleSubmenu(index)}
                            className="flex items-center py-6 text-lg font-medium text-gray-800 transition-all duration-300 hover:text-primary dark:text-gray-200 dark:hover:text-white"
                          >
                            {menuItem.title}
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              className={`ml-1.5 transform transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""
                                }`}
                            >
                              <path
                                fill="currentColor"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              />
                            </svg>
                          </button>
                          <div
                            className={`absolute left-1/2 transform -translate-x-1/2 mt-1 w-56 rounded-xl bg-white/95 shadow-2xl backdrop-blur-xl transition-all duration-300 dark:bg-gray-900/95 ${openIndex === index
                              ? "visible opacity-100 translate-y-0"
                              : "invisible opacity-0 -translate-y-2"
                              }`}
                            style={{
                              transitionProperty: 'opacity, transform',
                              transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                            }}
                          >
                            {menuItem.submenu?.map((submenuItem, idx) => (
                              <Link
                                href={submenuItem.path}
                                key={idx}
                                className={`block px-5 py-3 text-sm font-medium transition-all duration-300 transform hover:translate-x-1 ${pathname === submenuItem.path
                                    ? "bg-gray-100 text-primary dark:bg-gray-800 dark:text-white"
                                    : "text-gray-700 hover:bg-gray-100 hover:text-primary dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                                  }`}
                              >
                                {submenuItem.title}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Right side - CTA and Theme Toggler */}
            <div className="flex items-center space-x-6">
              {/* <ThemeToggler /> */}
              <Link
                href="/contact"
                className="hidden rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 text-sm font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-500 hover:from-blue-700 hover:to-purple-700 md:inline-flex items-center group"
              >
                <span>Get Started</span>
                <svg
                  className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={navbarToggleHandler}
                id="navbarToggler"
                aria-label="Mobile Menu"
                className="rounded-lg p-2 ring-primary focus:ring-2 lg:hidden"
              >
                <span
                  className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-500 dark:bg-white ${navbarOpen ? "top-[7px] rotate-45" : ""
                    }`}
                />
                <span
                  className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-500 dark:bg-white ${navbarOpen ? "opacity-0" : ""
                    }`}
                />
                <span
                  className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-500 dark:bg-white ${navbarOpen ? "top-[-8px] -rotate-45" : ""
                    }`}
                />
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          <nav
            className={`lg:hidden absolute left-0 right-0 top-full z-40 bg-white/95 shadow-2xl backdrop-blur-xl transition-all duration-500 dark:bg-gray-900/95 ${navbarOpen
              ? "visible opacity-100 translate-y-0"
              : "invisible opacity-0 -translate-y-4"
              }`}
          >
            <ul className="px-6 py-4">
              {menuData.map((menuItem, index) => (
                <li key={index} className="mb-1">
                  {menuItem.path ? (
                    <Link
                      href={menuItem.path}
                      className={`block py-3 text-lg font-medium ${pathname === menuItem.path
                        ? "text-primary dark:text-white"
                        : "text-gray-800 dark:text-gray-200"
                        }`}
                      onClick={() => setNavbarOpen(false)}
                    >
                      {menuItem.title}
                    </Link>
                  ) : (
                    <>
                      <button
                        onClick={() => handleSubmenu(index)}
                        className="flex w-full items-center justify-between py-3 text-lg font-medium text-gray-800 dark:text-gray-200"
                      >
                        {menuItem.title}
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          className={`ml-1.5 transform transition-transform duration-300 ${openIndex === index ? "rotate-180 text-primary" : "text-gray-800 group-hover:text-primary dark:text-gray-200 dark:group-hover:text-white"
                            }`}
                        >
                          <path
                            fill="currentColor"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          />
                        </svg>
                      </button>
                      {openIndex === index && (
                        <div className="pl-4">
                          {menuItem.submenu?.map((submenuItem, idx) => (
                            <Link
                              href={submenuItem.path}
                              key={idx}
                              className={`block py-2.5 text-base ${pathname === submenuItem.path
                                ? "text-primary dark:text-white"
                                : "text-gray-600 dark:text-gray-300"
                                }`}
                              onClick={() => setNavbarOpen(false)}
                            >
                              {submenuItem.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </li>
              ))}
              <li className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Link
                  href="/contact"
                  className="block w-full rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-center font-medium text-white"
                  onClick={() => setNavbarOpen(false)}
                >
                  Get Started
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;