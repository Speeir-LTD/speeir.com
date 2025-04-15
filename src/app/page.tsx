import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Speeir - Home",
  description: "We craft fast, beautiful websites and powerful mobile apps that put your customers first.",
  keywords: "home, software solutions, Ireland, Speeir",
  robots: "index, follow",
};

export default function Home() {
  return (
    <>
      <ScrollUp />
      <Hero />
      <Features />
      <Contact />
    </>
  );
}
