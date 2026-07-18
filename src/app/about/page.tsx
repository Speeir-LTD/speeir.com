import AboutPage from "./AboutClient";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us | Speeir",
    description: "Learn more about Speeir, our mission, values, and the team behind our innovative solutions.",
    keywords: "about, company, Ireland, Speeir, web development, software solutions, application development",
    robots: "index, follow",
    openGraph: {
      title: "About Us | Speeir",
      description: "Learn more about Speeir, our mission, values, and the team behind our innovative solutions.",
      url: "https://speeir.com/about",
      siteName: "Speeir",
      images: [
        {
          url: "/images/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Speeir - Web & Mobile Development",
        },
      ],
      locale: "en_IE",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "About Us | Speeir",
      description: "Learn more about Speeir, our mission, values, and the team behind our innovative solutions.",
      images: ["/images/og-image.jpg"],
    },
    alternates: {
      canonical: "https://speeir.com/about",
    },
  };
  

export default async function About() {
  return <AboutPage />;
}