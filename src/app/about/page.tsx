import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  SealCheck,
  ClipboardText,
  RocketLaunch,
  ArrowsClockwise,
} from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "About — Speeir",
  description:
    "Learn more about Speeir, our mission, values, and the team behind our innovative solutions.",
};

const PROCESS = [
  {
    title: "Consultation & Planning",
    description:
      "We take time to understand your goals, challenges, and vision to design a roadmap that fits your business.",
    icon: ClipboardText,
  },
  {
    title: "Agile Development",
    description:
      "Our cross-border teams work in sprints to deliver fast, iterative progress with ongoing feedback and transparency.",
    icon: ArrowsClockwise,
  },
  {
    title: "Quality & Compliance",
    description:
      "Rigorous testing, security practices, and adherence to international standards are baked into everything we do.",
    icon: SealCheck,
  },
  {
    title: "Support & Scaling",
    description:
      "After launch, we remain your technology partner — offering maintenance, enhancements, and scaling support as your needs grow.",
    icon: RocketLaunch,
  },
];

export default function AboutPage() {
  return (
    <div className="container py-20 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          About Speeir
        </p>
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
          {PROCESS.map((item) => (
            <div
              key={item.title}
              className="group relative rounded-2xl border border-border/40 bg-white p-6 shadow-md"
            >
              {/* Ambient glow on hover */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-px rounded-2xl bg-primary/10 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
              />
              <div className="relative z-10">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <item.icon size={18} weight="duotone" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
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
          className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
        >
          Start a project
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
