"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import { Inter } from "next/font/google";
import "../styles/index.css";
import { Toaster } from 'sonner';
import { OrganizationSchema } from "@/components/Seo/OrganizationSchema";

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
      <head >
        <link rel="canonical" href="https://www.speeir.com" />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "url": "https://www.speeir.com",
            "name": "Speeir",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://www.speeir.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
      </head>
      {/* Google tag (gtag.js) */}
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-YGS9HVSMKE"
      ></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-YGS9HVSMKE');
        `,
        }}
      />
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
          <OrganizationSchema />
        </Providers>
      </body>
    </html>
  );
}

import { Providers } from "./providers"; import { usePathname } from "next/navigation";

