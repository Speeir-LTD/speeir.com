import { Metadata } from 'next';
import { Inter } from "next/font/google";
import "../styles/index.css";
import ClientLayout from "@/components/ClientLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://speeir.com'),
  title: {
    default: 'Speeir | Software Development | Ireland',
    template: '%s | Speeir'
  },
  description: 'Speeir Limited - Your Success Our Code. Professional web & mobile development services in Ireland.',
  keywords: [
    'software development',
    'web development', 
    'mobile development',
    'speeir',
    'ireland',
    'software company',
    'web design',
    'app development',
    'technology solutions'
  ],
  authors: [{ name: 'Speeir Limited' }],
  creator: 'Speeir Limited',
  publisher: 'Speeir Limited',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://speeir.com',
    title: 'Speeir | Web & Mobile Development',
    description: 'Speeir LTD Web & Mobile Solutions for Modern Businesses. We craft fast, beautiful websites and powerful mobile apps that put your customers first.',
    siteName: 'Speeir',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Speeir - Web & Mobile Development',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Speeir | Web & Mobile Development', 
    description: 'Professional web & mobile development services in Ireland.',
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://speeir.com',
  },
  verification: {
    google: 'your-google-verification-code', // Replace with actual verification code
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html suppressHydrationWarning lang="en">
      <head>
        {/* Preconnect for Google Fonts to improve FCP/LCP */}
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Preconnect for Google Tag Manager to improve LCP */}
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        
        {/* Schema.org JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "url": "https://speeir.com",
            "name": "Speeir",
            "alternateName": ["software company ireland", "software agency", "speeir agency"],
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://speeir.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
      </head>
      <body className={`bg-[#FCFCFC] dark:bg-black ${inter.className}`}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}


