"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type DotSpec = {
  width: number;
  height: number;
  top: number;
  left: number;
  duration: number;
};

const Breadcrumb = ({
  pageName,
  description,
}: {
  pageName: string;
  description: string;
}) => {
  // Populated client-side only so SSR and the first client render both
  // start empty and stay hydration-safe.
  const [dots, setDots] = useState<DotSpec[]>([]);

  useEffect(() => {
    setDots(
      Array.from({ length: 8 }, () => ({
        width: Math.random() * 8 + 4,
        height: Math.random() * 8 + 4,
        top: Math.random() * 100,
        left: Math.random() * 100,
        duration: Math.random() * 8 + 8,
      }))
    );
  }, []);

  return (
    <section className="relative z-10 overflow-hidden pt-28 lg:pt-32 bg-white dark:bg-gray-900">
      <div className="container px-5 mx-auto">
        <div className="flex flex-col">
          {/* Simplified Breadcrumb Navigation */}
          <div className="flex items-center space-x-2 text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
            <Link href="/" className="hover:text-primary transition-colors duration-200">
              Home
            </Link>
            <span className="text-gray-400 dark:text-gray-500"></span>
            <span className="text-primary">{pageName}</span>
          </div>
          
          {/* Clean Page Title */}
          <div className="space-y-2">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
              {pageName}
            </h1>
            <div className="h-0.5 w-16 bg-gradient-to-r from-primary to-secondary"></div>
          </div>
        </div>
      </div>

      {/* Subtle Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden opacity-10 dark:opacity-5">
        {dots.map((dot, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-primary/10"
            style={{
              width: `${dot.width}px`,
              height: `${dot.height}px`,
              top: `${dot.top}%`,
              left: `${dot.left}%`,
              animation: `float ${dot.duration}s ease-in-out infinite alternate`,
              animationDelay: `${i * 0.3}s`
            }}
          ></div>
        ))}
      </div>
    </section>
  );
};

export default Breadcrumb;