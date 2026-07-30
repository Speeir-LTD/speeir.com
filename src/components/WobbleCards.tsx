"use client";

import { WobbleCard } from "@/components/ui/wobble-card";

export function WobbleCards() {
  return (
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 lg:grid-cols-3">
      <WobbleCard
        containerClassName="col-span-1 lg:col-span-2 h-full min-h-[500px] lg:min-h-[300px]"
        className="bg-[#7B3FA0]"
      >
        <div className="max-w-xs">
          <h2 className="text-left text-balance text-base font-semibold tracking-[-0.015em] text-white md:text-xl lg:text-3xl">
            Consultation &amp; Planning
          </h2>
          <p className="mt-4 text-left text-base/6 text-white/80">
            We take time to understand your goals, challenges, and vision to
            design a roadmap that fits your business.
          </p>
        </div>
      </WobbleCard>

      <WobbleCard containerClassName="col-span-1 min-h-[300px] bg-[#A15FDC]">
        <h2 className="max-w-80 text-left text-balance text-base font-semibold tracking-[-0.015em] text-white md:text-xl lg:text-3xl">
          Agile Development
        </h2>
        <p className="mt-4 max-w-[26rem] text-left text-base/6 text-white/80">
          Our teams work in sprints to deliver fast, iterative progress with
          ongoing feedback and transparency.
        </p>
      </WobbleCard>

      <WobbleCard containerClassName="col-span-1 min-h-[300px] bg-[#14181C]">
        <h2 className="max-w-80 text-left text-balance text-base font-semibold tracking-[-0.015em] text-white md:text-xl lg:text-3xl">
          Quality &amp; Compliance
        </h2>
        <p className="mt-4 max-w-[26rem] text-left text-base/6 text-white/80">
          Rigorous testing, security practices, and adherence to international
          standards are baked into everything we do.
        </p>
      </WobbleCard>

      <WobbleCard containerClassName="col-span-1 lg:col-span-2 min-h-[500px] lg:min-h-[300px] bg-[#5B2D8E]">
        <div className="max-w-sm">
          <h2 className="max-w-sm text-left text-balance text-base font-semibold tracking-[-0.015em] text-white md:text-xl lg:text-3xl">
            Launch &amp; Scale
          </h2>
          <p className="mt-4 max-w-[26rem] text-left text-base/6 text-white/80">
            After launch, we remain your technology partner, offering
            maintenance, enhancements, and scaling support as your needs grow.
          </p>
        </div>
      </WobbleCard>
    </div>
  );
}
