import type { Metadata } from "next";
import { pageMeta } from "@/lib/metadata";
import { CTA_CLASS } from "@/lib/utils";
import Link from "next/link";
import {
  ArrowRight,
  SealCheck,
  ClipboardText,
  RocketLaunch,
  ArrowsClockwise,
} from "@phosphor-icons/react/dist/ssr";
import { Eyebrow, Glow } from "@/components/ui/primitives";
import { process } from "@/data/process";

export const metadata: Metadata = pageMeta({
  title: "About",
  description:
    "Learn more about Speeir, our mission, values, and the team behind our innovative solutions.",
  path: "/about",
});

// Icons for `process`, by index.
const PROCESS_ICONS = [ClipboardText, ArrowsClockwise, SealCheck, RocketLaunch];

export default function AboutPage() {
  return (
    <div className="container py-20 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <Eyebrow>About Speeir</Eyebrow>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink md:text-5xl">
          Redefining digital innovation
        </h1>
      </div>

      <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-border/40 bg-white p-8 shadow-md md:p-10">
        <p className="text-lg leading-relaxed text-ink/80">
          At <span className="font-semibold text-primary">Speeir LTD</span>,
          we&apos;re passionate about building reliable, scalable, and
          innovative software solutions tailored to the unique needs of our
          clients. Headquartered in Ireland, we bring together a team of
          experienced professionals committed to delivering excellence.
        </p>
        <p className="mt-6 text-lg leading-relaxed text-ink/80">
          Our mission is to bridge the gap between business and technology,
          transforming ideas into powerful digital products that drive growth
          and create exceptional user experiences.
        </p>
      </div>

      <div className="mx-auto mt-20 max-w-3xl">
        <h2 className="text-2xl font-semibold tracking-tight text-ink">
          Our methodology
        </h2>
        <p className="mt-4 rounded-2xl bg-primary/5 p-6 text-base leading-relaxed text-ink/80">
          We operate with a{" "}
          <span className="font-semibold">flexible, client-first approach</span>{" "}
          that combines local expertise with global capabilities. Our extended
          development network ensures rapid scaling, around-the-clock
          progress, and cost-efficient development without compromising on
          quality.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {process.map((item, i) => {
            const Icon = PROCESS_ICONS[i];
            return (
            <div
              key={item.title}
              className="group relative rounded-2xl border border-border/40 bg-white p-6 shadow-md"
            >
              <Glow />
              <div className="relative z-10">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon size={18} weight="duotone" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </div>
            </div>
            );
          })}
        </div>

        <div className="mt-8 rounded-2xl bg-ink p-8 text-center">
          <p className="text-base leading-relaxed text-white">
            With our <span className="font-semibold">blended model</span>, you
            get the best of both worlds: local accountability with global
            reach.
          </p>
        </div>
      </div>

      <div className="mx-auto mt-20 max-w-2xl text-center">
        <Link
          href="/contact"
          className={CTA_CLASS}
        >
          Start a project
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
