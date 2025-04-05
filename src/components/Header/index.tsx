"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeToggler from "./ThemeToggler";
import menuData from "./menuData";

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

  return (
    <>
      <header
        className={`header left-0 top-0 z-50 flex w-full items-center ${
          sticky
            ? "fixed bg-white/90 shadow-lg backdrop-blur-md transition-all duration-300 dark:bg-gray-900/90 dark:shadow-gray-800/10"
            : "absolute bg-transparent"
        }`}
      >
        {/* Animated background elements */}
        {!sticky && (
          <div className="absolute inset-0 overflow-hidden opacity-10 dark:opacity-20">
            <div className="absolute left-1/4 top-1/4 h-32 w-32 rounded-full bg-blue-400 animate-[float_8s_ease-in-out_infinite]"></div>
            <div className="absolute bottom-1/3 right-1/4 h-40 w-40 rounded-full bg-purple-400 animate-[float_10s_ease-in-out_infinite_reverse]"></div>
          </div>
        )}

        <div className="container relative">
          <div className="relative -mx-4 flex items-center justify-between">
            <div className="w-60 max-w-full px-4 xl:mr-12">
              <Link
                href="/"
                className={`header-logo block w-full transition-all duration-300 ${
                  sticky ? "py-5 lg:py-3" : "py-8"
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
            
            <div className="flex w-full items-center justify-between px-4">
              <div>
                {/* Mobile menu button */}
                <button
                  onClick={navbarToggleHandler}
                  id="navbarToggler"
                  aria-label="Mobile Menu"
                  className="absolute right-4 top-1/2 block translate-y-[-50%] rounded-lg p-2 ring-primary focus:ring-2 lg:hidden"
                >
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                      navbarOpen ? "top-[7px] rotate-45" : ""
                    }`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                      navbarOpen ? "opacity-0" : ""
                    }`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                      navbarOpen ? "top-[-8px] -rotate-45" : ""
                    }`}
                  />
                </button>

                {/* Desktop menu */}
                <nav
                  id="navbarCollapse"
                  className={`navbar absolute right-0 z-30 w-[280px] rounded-xl border border-gray-200 bg-white/95 px-6 py-4 shadow-xl backdrop-blur-lg transition-all duration-300 dark:border-gray-700 dark:bg-gray-900/95 lg:visible lg:static lg:w-auto lg:border-none lg:bg-transparent lg:px-0 lg:py-0 lg:shadow-none lg:backdrop-blur-none dark:lg:bg-transparent ${
                    navbarOpen
                      ? "visible top-full opacity-100"
                      : "invisible top-[120%] opacity-0"
                  }`}
                >
                  <ul className="block lg:flex lg:space-x-8">
                    {menuData.map((menuItem, index) => (
                      <li key={index} className="group relative">
                        {menuItem.path ? (
                          <Link
                            href={menuItem.path}
                            className={`relative flex items-center py-2 text-base font-medium transition-colors duration-300 lg:px-0 lg:py-6 ${
                              pathname === menuItem.path
                                ? "text-primary dark:text-white"
                                : "text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-white"
                            }`}
                          >
                            {menuItem.title}
                            {pathname === menuItem.path && (
                              <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-gradient-to-r from-blue-500 to-purple-600"></span>
                            )}
                          </Link>
                        ) : (
                          <>
                            <button
                              onClick={() => handleSubmenu(index)}
                              className="flex w-full items-center justify-between py-2 text-base font-medium text-gray-700 transition-colors duration-300 hover:text-primary dark:text-gray-300 dark:hover:text-white lg:px-0 lg:py-6"
                            >
                              {menuItem.title}
                              <span className="pl-2">
                                <svg
                                  width="20"
                                  height="20"
                                  viewBox="0 0 20 20"
                                  className={`transform transition-transform duration-200 ${
                                    openIndex === index ? "rotate-180" : ""
                                  }`}
                                >
                                  <path
                                    fill="currentColor"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                  />
                                </svg>
                              </span>
                            </button>
                            <div
                              className={`submenu relative left-0 rounded-lg bg-white/95 px-4 py-3 shadow-xl backdrop-blur-lg transition-all duration-300 group-hover:opacity-100 dark:bg-gray-900/95 dark:shadow-gray-800/30 lg:invisible lg:absolute lg:top-[120%] lg:min-w-[220px] lg:opacity-0 lg:shadow-lg lg:group-hover:visible lg:group-hover:top-full lg:group-hover:opacity-100 ${
                                openIndex === index ? "block" : "hidden"
                              }`}
                            >
                              {menuItem.submenu.map((submenuItem, index) => (
                                <Link
                                  href={submenuItem.path}
                                  key={index}
                                  className={`block rounded-md px-3 py-2.5 text-sm font-medium transition-colors duration-200 ${
                                    pathname === submenuItem.path
                                      ? "bg-gray-100 text-primary dark:bg-gray-800 dark:text-white"
                                      : "text-gray-700 hover:bg-gray-100 hover:text-primary dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                                  }`}
                                >
                                  {submenuItem.title}
                                </Link>
                              ))}
                            </div>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              {/* Theme toggler and CTA button */}
              <div className="flex items-center gap-4">
                {/* <ThemeToggler /> */}
                <Link
                  href="/contact"
                  className="hidden rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-purple-500 md:inline-flex"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;