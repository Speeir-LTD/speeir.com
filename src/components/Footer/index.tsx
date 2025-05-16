"use client";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const partners = [
    {
      name: "fortaxe",
      logo: "/images/Partner/fortaxe.png",
      url: "https://www.fortaxe.com/"
    },
    
  ];

  return (
    <footer
      // ref={footerRef}
      className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50/50 pt-20 dark:from-gray-900 dark:to-gray-900/90"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10 dark:opacity-20">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-blue-400 animate-[float_8s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-1/3 right-1/4 w-40 h-40 rounded-full bg-purple-400 animate-[float_10s_ease-in-out_infinite_reverse]"></div>
      </div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo and description (left side) */}
          <div className="lg:col-span-2">
            <div className="mb-8 max-w-sm">
              <Link href="/" className="inline-block">
                <Image
                  src="/images/logo/logo.svg"
                  alt="logo"
                  className="hidden w-full dark:block"
                  width={160}
                  height={40}
                />
              </Link>
              <p className="mt-6 text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                Your Success. Our Code.
              </p>
            </div>

            {/* Social links */}
            <div className="flex items-center space-x-6">
              {[
                { name: "Instagram", icon:"M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.227-1.664 4.771-4.919 4.919-1.266.057-1.645.069-4.849.069-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.069-1.644-.069-4.849 0-3.204.012-3.584.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
                  url: "https://www.instagram.com/speeir.ltd/" },
                { name: "LinkedIn", icon: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
                  url: "https://www.linkedin.com/company/speeir/" },
                ].map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  aria-label={social.name}
                  className="text-gray-600 transition-colors duration-300 hover:text-primary dark:text-gray-300 dark:hover:text-primary"
                >
                  <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Company links (right side) */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-black dark:text-white">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-gray-600 transition-colors duration-300 hover:text-primary dark:text-gray-300 dark:hover:text-primary"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-gray-600 transition-colors duration-300 hover:text-primary dark:text-gray-300 dark:hover:text-primary"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-600 transition-colors duration-300 hover:text-primary dark:text-gray-300 dark:hover:text-primary"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 transition-colors duration-300 hover:text-primary dark:text-gray-300 dark:hover:text-primary"
                >
                  Contact Us
                </Link>
              </li>

            </ul>
          </div>

          {/* Our Partners section */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-black dark:text-white">
              Our Partner
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {partners.map((partner) => (
                <a
                  key={partner.name}
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center rounded-lg bg-white p-3 transition-all hover:scale-105 hover:shadow-md dark:bg-white"
                >
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={80}
                    height={40}
                    className="h-auto w-full object-contain opacity-80 transition-opacity hover:opacity-100"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-12 h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-gray-700"></div>

        {/* Copyright */}
        <div className="flex flex-col items-center justify-between pb-8 md:flex-row">
          <p className="text-gray-600 dark:text-gray-300">
            © {new Date().getFullYear()} Speeir LTD. All rights reserved.
          </p>
          <div className="mt-4 flex space-x-6 md:mt-0">
            <Link href="/privacy-policy" className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute bottom-0 left-0 right-0 hidden h-40 md:block">
        <div className="relative h-full w-full">
          <div className="absolute left-[10%] bottom-0 h-24 w-24 animate-[float_6s_ease-in-out_infinite] rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 shadow-lg backdrop-blur-sm"></div>
          <div className="absolute right-[10%] bottom-10 h-16 w-16 animate-[float_8s_ease-in-out_infinite_reverse] rounded-xl bg-gradient-to-br from-pink-500/20 to-rose-500/20 shadow-lg backdrop-blur-sm"></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;