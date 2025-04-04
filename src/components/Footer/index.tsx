"use client";
import Image from "next/image";
import Link from "next/link";


const Footer = () => {



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
          <div className="lg:col-span-3">
            <div className="mb-8 max-w-sm">
              <Link href="/" className="inline-block">
                <Image
                  src="/images/logo/logo-2.svg"
                  alt="logo"
                  className="w-full dark:hidden"
                  width={160}
                  height={40}
                />
                <Image
                  src="/images/logo/logo.svg"
                  alt="logo"
                  className="hidden w-full dark:block"
                  width={160}
                  height={40}
                />
              </Link>
              <p className="mt-6 text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                Building the future with innovative solutions that transform businesses and empower users.
              </p>
            </div>

            {/* Social links */}
            <div className="flex items-center space-x-6">
              {[
                { name: "Twitter", icon: "M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" },
                { name: "GitHub", icon: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" },
                { name: "LinkedIn", icon: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" },
                { name: "YouTube", icon: "M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" }
              ].map((social) => (
                <a
                  key={social.name}
                  href="#"
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
                  href="/about"
                  className="text-gray-600 transition-colors duration-300 hover:text-primary dark:text-gray-300 dark:hover:text-primary"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-gray-600 transition-colors duration-300 hover:text-primary dark:text-gray-300 dark:hover:text-primary"
                >
                  Careers
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
                  href="/press"
                  className="text-gray-600 transition-colors duration-300 hover:text-primary dark:text-gray-300 dark:hover:text-primary"
                >
                  Press
                </Link>
              </li>
            </ul>
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
            <Link href="#" className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary">
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