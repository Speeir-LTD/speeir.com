// components/Seo/OrganizationSchema.tsx
"use client";

import { usePathname } from "next/navigation";

export const OrganizationSchema = () => {
  const pathname = usePathname();
  
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.speeir.com/#organization",
    "url": "https://www.speeir.com/",
    "name": "Speeir",
    "legalName": "Speeir LTD",
    "businessType": "Software Development, Web Development, Mobile App Development, custom software solutions, ecommerce solutions, wordpress development",
    "description": "Web & Mobile Solutions for Modern Businesses",
    "foundingDate": "2025", 
    "sameAs": [
      "https://linkedin.com/company/speeir",
      "https://instagram.com/speeir.ltd"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Athlone",
      "addressRegion": "Co. Westmeath",
      "addressCountry": "IE" 
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Enquiries",
      "areaServed": "IE",
      "availableLanguage": "English",
      "url": "https://www.speeir.com/contact",
      "email": "info@speeir.com",
      "telephone": "+353894917304"
    }
    
  };

  // Only render on the homepage
  if (pathname !== "/") return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
};