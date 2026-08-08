"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

// All three layers sit in the same place; only the paint differs.
const TEXT_PROPS = {
  x: "50%",
  y: "50%",
  textAnchor: "middle",
  dominantBaseline: "middle",
  strokeWidth: "0.3",
} as const;

const TEXT_CLASS = "font-[helvetica] text-7xl font-bold";

export const TextHoverEffect = ({ text }: { text: string }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  }, [cursor]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 300 100"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className="select-none"
    >
      <defs>
        <linearGradient
          id="textGradient"
          gradientUnits="userSpaceOnUse"
          cx="50%"
          cy="50%"
          r="25%"
        >
          {hovered && (
            <>
              <stop offset="0%" stopColor="#EDE9FE" />
              <stop offset="25%" stopColor="#C4B5FD" />
              <stop offset="50%" stopColor="#A15FDC" />
              <stop offset="75%" stopColor="#7B3FA0" />
              <stop offset="100%" stopColor="#5B2D8E" />
            </>
          )}
        </linearGradient>

        <motion.radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="20%"
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPosition}
          transition={{ duration: 0, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id="textMask">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#revealMask)"
          />
        </mask>
      </defs>
      <text
        {...TEXT_PROPS}
        className={`fill-ink/[0.04] stroke-border ${TEXT_CLASS}`}
        style={{ opacity: hovered ? 0.7 : 0 }}
      >
        {text}
      </text>
      <motion.text
        {...TEXT_PROPS}
        className={`fill-ink/[0.04] stroke-border ${TEXT_CLASS}`}
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{
          strokeDashoffset: 0,
          strokeDasharray: 1000,
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
        }}
      >
        {text}
      </motion.text>
      <text
        {...TEXT_PROPS}
        stroke="url(#textGradient)"
        mask="url(#textMask)"
        className={`fill-transparent ${TEXT_CLASS}`}
      >
        {text}
      </text>
    </svg>
  );
};
