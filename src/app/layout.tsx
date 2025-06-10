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
          content="Speeir Limited - Your Success Our Code" 
        />
        {/* Open Graph */}
        <meta property="og:title" content="Speeir | Web & Mobile Development" />
        <meta property="og:description" content="Speeir LTD Web & Mobile Solutions for Modern Businesses, We craft fast, beautiful websites and powerful mobile apps that put your customers first. Whether you need a startup launchpad or enterprise-grade SaaS, we build digital experiences that convert and grow." />
        <meta property="og:url" content="https://www.speeir.com" />
        <meta property="og:site_name" content="Speeir" />
        <meta property="og:image" content="https://speeir.com/images/logo/logo.svg" />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="300" />
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
          {/* <!-- Google Tag Manager --> */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){
              w[l]=w[l]||[];
              w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
              var f = d.getElementsByTagName(s)[0],
                  j = d.createElement(s),
                  dl = l!='dataLayer'?'&l='+l:'';
              j.async = true;
              j.src = 'https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j, f);
            })(window,document,'script','dataLayer','GTM-53277NPC');`
          }}
        />
        {/* <!-- End Google Tag Manager --> */}
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
        {/* <!-- Google Tag Manager (noscript) --> */}
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-53277NPC"
        height="0" width="0" style={{display: "none", visibility: "hidden"}}></iframe></noscript>
        {/* <!-- End Google Tag Manager (noscript) --> */}
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

