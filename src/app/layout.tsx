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
        <title>Speeir | Software Development | Ireland</title>
        <meta 
          name="description" 
          content="Speeir Limited - Professional web & mobile app development company based in Westmeath, Ireland. Established 2025." 
        />
        {/* Open Graph */}
        <meta property="og:title" content="Speeir | Web & Mobile Development" />
        <meta property="og:description" content="Irish software development company since 2025" />
        <meta property="og:url" content="https://www.speeir.com" />
        <meta property="og:site_name" content="Speeir" />
        <meta property="og:image" content="https://speeir.com/images/logo/logo.svg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Speeir - Web & Mobile Development" />
        <meta property="og:locale" content="en_IE" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "url": "https://www.speeir.com",
            "name": "Speeir",
            "alternateName": ["software company ireland", "software agency", "speeir agency"],
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

