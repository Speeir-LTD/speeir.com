"use client";
import React, { useEffect, useId, useState, useRef } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

// Fixed positions rather than Math.random(), so server and client render the
// same markup. Percentages of the (200%-wide) scrolling field.
const SPARKS = [
  [4, 18], [11, 62], [17, 34], [23, 81], [29, 9], [35, 47],
  [41, 72], [47, 21], [53, 58], [59, 88], [65, 13], [71, 41],
  [77, 67], [83, 28], [89, 76], [95, 52],
] as const;

const SparklesField = () => (
  <div aria-hidden="true" className="relative h-full w-full">
    {SPARKS.map(([left, top], i) => (
      <span
        key={i}
        className="absolute h-[2px] w-[2px] animate-twinkle rounded-full bg-[#EDE9FE]"
        style={{ left: `${left}%`, top: `${top}%`, animationDelay: `${(i % 8) * 0.35}s` }}
      />
    ))}
  </div>
);

export const Cover = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  const [hovered, setHovered] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  // Plays the same animation once the user scrolls it into view, so it
  // doesn't depend on a mouse hover to ever be seen (e.g. on touch devices).
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const active = hovered || inView;

  const [containerWidth, setContainerWidth] = useState(0);
  const [beamPositions, setBeamPositions] = useState<number[]>([]);

  useEffect(() => {
    if (ref.current) {
      setContainerWidth(ref.current?.clientWidth ?? 0);

      const height = ref.current?.clientHeight ?? 0;
      const numberOfBeams = Math.floor(height / 10); // Adjust the divisor to control the spacing
      const positions = Array.from(
        { length: numberOfBeams },
        (_, i) => (i + 1) * (height / (numberOfBeams + 1))
      );
      setBeamPositions(positions);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current]);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      ref={ref}
      className={cn(
        "group/cover relative inline-block rounded-sm bg-primary/10 px-2 py-2 transition duration-200 hover:bg-ink",
        active && "bg-ink"
      )}
    >
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: {
                duration: 0.2,
              },
            }}
            className="absolute inset-0 h-full w-full overflow-hidden"
          >
            <motion.div
              animate={{
                translateX: ["-50%", "0%"],
              }}
              transition={{
                translateX: {
                  duration: 10,
                  ease: "linear",
                  repeat: Infinity,
                },
              }}
              className="flex h-full w-[200%]"
            >
              <SparklesField />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {beamPositions.map((position, index) => (
        <Beam
          key={index}
          hovered={active}
          duration={Math.random() * 2 + 1}
          delay={Math.random() * 2 + 1}
          width={containerWidth}
          style={{
            top: `${position}px`,
          }}
        />
      ))}
      <motion.span
        key={String(active)}
        animate={{
          scale: active ? 1.04 : 1,
          y: active ? -2 : 0,
        }}
        exit={{
          scale: 1,
          y: 0,
        }}
        transition={{
          duration: 0.4,
          ease: [0.16, 1, 0.3, 1],
        }}
        className={cn(
          "relative z-20 inline-block text-primary transition duration-200 group-hover/cover:text-white",
          active && "text-white",
          className
        )}
      >
        {children}
      </motion.span>
      <CircleIcon className="absolute -right-[2px] -top-[2px]" />
      <CircleIcon className="absolute -bottom-[2px] -right-[2px]" delay={0.4} />
      <CircleIcon className="absolute -left-[2px] -top-[2px]" delay={0.8} />
      <CircleIcon className="absolute -bottom-[2px] -left-[2px]" delay={1.6} />
    </div>
  );
};

const Beam = ({
  className,
  delay,
  duration,
  hovered,
  width = 600,
  ...svgProps
}: {
  className?: string;
  delay?: number;
  duration?: number;
  hovered?: boolean;
  width?: number;
} & React.ComponentProps<typeof motion.svg>) => {
  const id = useId();

  return (
    <motion.svg
      width={width ?? "600"}
      height="1"
      viewBox={`0 0 ${width ?? "600"} 1`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("absolute inset-x-0 w-full", className)}
      {...svgProps}
    >
      <motion.path d={`M0 0.5H${width ?? "600"}`} stroke={`url(#svgGradient-${id})`} />

      <defs>
        <motion.linearGradient
          id={`svgGradient-${id}`}
          key={String(hovered)}
          gradientUnits="userSpaceOnUse"
          initial={{
            x1: "0%",
            x2: hovered ? "-10%" : "-5%",
            y1: 0,
            y2: 0,
          }}
          animate={{
            x1: "110%",
            x2: hovered ? "100%" : "105%",
            y1: 0,
            y2: 0,
          }}
          transition={{
            duration: hovered ? 0.5 : duration ?? 2,
            ease: "linear",
            repeat: Infinity,
            delay: hovered ? Math.random() * (1 - 0.2) + 0.2 : 0,
            repeatDelay: hovered ? Math.random() * (2 - 1) + 1 : delay ?? 1,
          }}
        >
          <stop stopColor="#A15FDC" stopOpacity="0" />
          <stop stopColor="#A15FDC" />
          <stop offset="1" stopColor="#A15FDC" stopOpacity="0" />
        </motion.linearGradient>
      </defs>
    </motion.svg>
  );
};

const CircleIcon = ({
  className,
  delay,
}: {
  className?: string;
  delay?: number;
}) => {
  return (
    <div
      className={cn(
        "group pointer-events-none h-2 w-2 animate-pulse rounded-full bg-ink opacity-20 group-hover/cover:hidden group-hover/cover:bg-white group-hover/cover:opacity-100",
        className
      )}
      style={{ animationDelay: `${delay ?? 0}s` }}
    ></div>
  );
};
