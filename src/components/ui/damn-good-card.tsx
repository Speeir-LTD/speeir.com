"use client";

import { motion } from "framer-motion";
import React from "react";
import { cn, GRAIN_STYLE } from "@/lib/utils";

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "group relative h-full w-full overflow-hidden rounded-2xl border border-white/80 bg-surface/90 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_12px_32px_-12px_rgba(20,24,28,0.18)] backdrop-blur-xl",
        className
      )}
    >
      {/* Faded grain, for a bit of glass texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.05] mix-blend-overlay"
        style={GRAIN_STYLE}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export const CardSkeleton = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden p-8">
      <motion.div
        animate={{ scale: [1, 1.08, 1], y: [0, -4, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 0.6 }}
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/[0.06] text-primary shadow-[0px_0px_8px_0px_rgba(161,95,220,0.15)_inset,0px_16px_24px_-16px_rgba(20,24,28,0.25)]">
          {children}
        </div>
      </motion.div>

      <div className="absolute top-1/2 z-0 h-32 w-px -translate-y-1/2 animate-move bg-gradient-to-b from-transparent via-primary/50 to-transparent">
        <Sparkles />
      </div>
    </div>
  );
};

const Sparkles = () => {
  // Positions are randomized client-side only, after mount — Math.random() during
  // render would produce different values on the server vs. client and break hydration.
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const random = () => Math.random();
  return (
    <div className="absolute inset-0">
      {[...Array(10)].map((_, i) => (
        <motion.span
          key={`spark-${i}`}
          initial={{
            top: `${random() * 100}%`,
            left: `${random() * 100}%`,
          }}
          animate={{
            top: `${random() * 100}%`,
            left: `${random() * 100}%`,
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: random() * 2 + 3,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute h-[3px] w-[3px] rounded-full bg-primary"
        />
      ))}
    </div>
  );
};
