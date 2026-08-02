"use client";

import { WobbleCard } from "@/components/ui/wobble-card";
import { process } from "@/data/process";

// Per-card layout, zipped onto `process` by index.
const CARD_STYLES = [
  {
    containerClassName: "col-span-1 lg:col-span-2 h-full min-h-[500px] lg:min-h-[300px]",
    className: "bg-[#7B3FA0]",
    contentClassName: "max-w-xs",
  },
  {
    containerClassName: "col-span-1 min-h-[300px] bg-[#A15FDC]",
    contentClassName: "max-w-[26rem]",
  },
  {
    containerClassName: "col-span-1 min-h-[300px] bg-[#14181C]",
    contentClassName: "max-w-[26rem]",
  },
  {
    containerClassName: "col-span-1 lg:col-span-2 min-h-[500px] lg:min-h-[300px] bg-[#5B2D8E]",
    contentClassName: "max-w-sm",
  },
];

export function WobbleCards() {
  return (
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 lg:grid-cols-3">
      {process.map((step, i) => (
        <WobbleCard
          key={step.title}
          containerClassName={CARD_STYLES[i].containerClassName}
          className={CARD_STYLES[i].className}
        >
          <div className={CARD_STYLES[i].contentClassName}>
            <h2 className="text-left text-balance text-base font-semibold tracking-[-0.015em] text-white md:text-xl lg:text-3xl">
              {step.title}
            </h2>
            <p className="mt-4 text-left text-base/6 text-white/80">{step.description}</p>
          </div>
        </WobbleCard>
      ))}
    </div>
  );
}
