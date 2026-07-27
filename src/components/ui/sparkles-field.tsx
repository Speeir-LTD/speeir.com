"use client";

import { ParticlesProvider } from "@tsparticles/react";
import type { Engine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { SparklesCore } from "@/components/ui/sparkles";

const initParticles = async (engine: Engine) => {
  await loadSlim(engine);
};

export function SparklesField({ particleColor }: { particleColor: string }) {
  return (
    <ParticlesProvider init={initParticles}>
      <SparklesCore
        background="transparent"
        minSize={0.4}
        maxSize={1}
        particleDensity={500}
        className="h-full w-full"
        particleColor={particleColor}
      />
      <SparklesCore
        background="transparent"
        minSize={0.4}
        maxSize={1}
        particleDensity={500}
        className="h-full w-full"
        particleColor={particleColor}
      />
    </ParticlesProvider>
  );
}
