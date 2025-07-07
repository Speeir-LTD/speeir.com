"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import CustomCursor from "@/components/Common/CustomCursor";
import ErrorBoundary from "@/components/Common/ErrorBoundary";
import PerformanceOptimizer from "@/components/Common/PerformanceOptimizer";
import { Toaster } from 'sonner';
import { OrganizationSchema } from "@/components/Seo/OrganizationSchema";
import { Providers } from "@/app/providers";
import Script from "next/script";

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout = ({ children }: ClientLayoutProps) => {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');
  const [isCursorEnabled, setIsCursorEnabled] = useState(false);

  useEffect(() => {
    // Check if device supports hover (desktop-like devices)
    const supportsHover = window.matchMedia('(hover: hover)').matches;
    setIsCursorEnabled(supportsHover);
    
    // Add cursor-hidden class to body when custom cursor is enabled
    if (supportsHover) {
      document.body.classList.add('cursor-hidden');
    }
    
    return () => {
      document.body.classList.remove('cursor-hidden');
    };
  }, []);

  return (
    <>
      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe 
          src="https://www.googletagmanager.com/ns.html?id=GTM-53277NPC"
          height="0" 
          width="0" 
          style={{display: "none", visibility: "hidden"}}
        />
      </noscript>
      
      {/* Google Tag Manager and Analytics - defer for performance */}
      <Script
        id="gtm"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-53277NPC');`
        }}
      />
      <Script
        id="ga"
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-YGS9HVSMKE"
      />
      <Script
        id="ga-config"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YGS9HVSMKE');
          `,
        }}
      />
      
      <ErrorBoundary>
        <Providers>
          <PerformanceOptimizer />
          <Toaster position="top-right" />
          {!isAdminRoute && <Header />}
          {children}
          {!isAdminRoute && (
            <>
              <Footer />
              <ScrollToTop />
            </>
          )}
          {/* Render custom cursor only on devices that support hover */}
          {isCursorEnabled && <CustomCursor />}
          <OrganizationSchema />
        </Providers>
      </ErrorBoundary>
    </>
  );
};

export default ClientLayout;
