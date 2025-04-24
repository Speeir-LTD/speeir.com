import AboutPage from "./AboutClient";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us | Speeir",
    description: "Learn more about Speeir, our mission, values, and the team behind our innovative solutions.",
    keywords: "about, company, Ireland, Speeir, web development, software solutions, application development",
    robots: "index, follow",
  };
  

export default async function About() {
  return <AboutPage />;
}