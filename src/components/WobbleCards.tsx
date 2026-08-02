"use client";

import { WobbleCard } from "@/components/ui/wobble-card";

const CARDS = [
  {
    containerClassName: "col-span-1 lg:col-span-2 h-full min-h-[500px] lg:min-h-[300px]",
    className: "bg-[#7B3FA0]",
    contentClassName: "max-w-xs",
    title: "Consultation & Planning",
    body: "We take time to understand your goals, challenges, and vision to design a roadmap that fits your business.",
  },
  {
    containerClassName: "col-span-1 min-h-[300px] bg-[#A15FDC]",
    contentClassName: "max-w-[26rem]",
    title: "Agile Development",
    body: "Our teams work in sprints to deliver fast, iterative progress with ongoing feedback and transparency.",
  },
  {
    containerClassName: "col-span-1 min-h-[300px] bg-[#14181C]",
    contentClassName: "max-w-[26rem]",
    title: "Quality & Compliance",
    body: "Rigorous testing, security practices, and adherence to international standards are baked into everything we do.",
  },
  {
    containerClassName: "col-span-1 lg:col-span-2 min-h-[500px] lg:min-h-[300px] bg-[#5B2D8E]",
    contentClassName: "max-w-sm",
    title: "Launch & Scale",
    body: "After launch, we remain your technology partner, offering maintenance, enhancements, and scaling support as your needs grow.",
  },
];

export function WobbleCards() {
  return (
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 lg:grid-cols-3">
      {CARDS.map((card) => (
        <WobbleCard
          key={card.title}
          containerClassName={card.containerClassName}
          className={card.className}
        >
          <div className={card.contentClassName}>
            <h2 className="text-left text-balance text-base font-semibold tracking-[-0.015em] text-white md:text-xl lg:text-3xl">
              {card.title}
            </h2>
            <p className="mt-4 text-left text-base/6 text-white/80">{card.body}</p>
          </div>
        </WobbleCard>
      ))}
    </div>
  );
}
