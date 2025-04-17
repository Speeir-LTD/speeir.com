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
    },
    "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Services",
        "itemListElement": [
          {
            "@type": "OfferCatalog",
            "name": "Software Development",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Custom Software Solutions"
                }
              }
            ]
          },
          {
            "@type": "OfferCatalog",
            "name": "Web Development",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Ecommerce Solutions"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "WordPress Development"
                }
              }
            ]
          },
          {
            "@type": "OfferCatalog",
            "name": "Mobile App Development"
          }
        ]
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