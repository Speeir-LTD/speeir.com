"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";
import { MeshGradient } from "@/components/MeshGradient";
import { cn, CTA_CLASS, GRAIN_STYLE } from "@/lib/utils";

export function GlassHero() {
  const reduceMotion = useReducedMotion();

  const fade = reduceMotion
    ? {}
    : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };

  return (
    <section className="p-4 md:p-4">
      <div className="relative flex min-h-[calc(100dvh-3rem)] items-center overflow-hidden rounded-3xl py-20 md:py-28 lg:min-h-[100dvh]">
        {/* Animated mesh gradient background */}
        <MeshGradient />

        {/* Grain texture overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] opacity-[0.04] mix-blend-overlay"
          style={GRAIN_STYLE}
        />

        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <motion.p
              {...fade}
              transition={{ duration: 0.5, delay: 0 }}
              className="text-sm font-semibold uppercase tracking-[0.2em] text-primary"
            >
              Speeir
            </motion.p>

            <motion.h1
              {...fade}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-6 text-balance text-4xl font-semibold leading-[1.1] tracking-tight text-ink md:text-6xl"
            >
              Every product here, we built{" "}
              <em className="font-medium not-italic text-primary">
                ourselves
              </em>{" "}
              first.
            </motion.h1>

            <motion.p
              {...fade}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-ink/70"
            >
              Speeir designs and ships its own software before it ever
              touches a client&apos;s roadmap, then brings that same
              discipline to yours.
            </motion.p>

            <motion.div
              {...fade}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-10 flex flex-wrap items-center justify-center gap-4"
            >
              <Link
                href="/contact"
                className={cn(CTA_CLASS, "px-7 py-3.5 transition-all hover:shadow-lg")}
              >
                Start a project
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-white/80 px-7 py-3.5 text-sm font-semibold text-ink backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
              >
                Explore services
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
