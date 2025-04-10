"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import { Inter } from "next/font/google";
import "../styles/index.css";
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  return (
    <html suppressHydrationWarning lang="en">
      <head />

      <body className={`bg-[#FCFCFC] dark:bg-black ${inter.className}`}>
        <Providers>
        <Toaster position="top-right" />
        {!isAdminRoute && <Header />}
          {children}
          {!isAdminRoute && (
            <>
              <Footer />
              <ScrollToTop />
            </>
          )}
        </Providers>
      </body>
    </html>
  );
}

import { Providers } from "./providers";import { usePathname } from "next/navigation";

