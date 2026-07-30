import Link from "next/link";
import {
  ArrowRight,
  Code,
  DeviceMobile,
  Cube,
  ChartLineUp,
  Lightning,
  ShieldCheck,
  Clock,
  Globe,
  Stack,
  Database,
  CloudArrowUp,
  Monitor,
} from "@phosphor-icons/react/dist/ssr";
import { GlassHero } from "@/components/Hero/GlassHero";
import { ServiceSpotlightGrid } from "@/components/ServiceSpotlightGrid";
import { WobbleCards } from "@/components/WobbleCards";
import { Cover } from "@/components/ui/cover";
import { TestimonialsSlider } from "@/components/TestimonialsSlider";
import { testimonials } from "@/data/testimonials";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { StatsGrid } from "@/components/StatsGrid";
import { BackgroundLines } from "@/components/ui/background-lines";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";

const CLIENTS = [
  "Startups",
  "Scale-ups",
  "Enterprise",
  "SaaS",
  "FinTech",
  "HealthTech",
  "E-Commerce",
  "EdTech",
];

const STATS = [
  { end: 50, suffix: "+", label: "projects delivered" },
  { end: 6, suffix: "", label: "core disciplines" },
  { end: 24, suffix: "/7", label: "support & monitoring" },
  { end: 98, suffix: "%", label: "client retention" },
];

const TECH_STACK = [
  { icon: Code, label: "React" },
  { icon: Globe, label: "Next.js" },
  { icon: DeviceMobile, label: "React Native" },
  { icon: Database, label: "PostgreSQL" },
  { icon: CloudArrowUp, label: "AWS" },
  { icon: Monitor, label: "Node.js" },
  { icon: Stack, label: "TypeScript" },
  { icon: ShieldCheck, label: "Docker" },
  { icon: Cube, label: "GraphQL" },
  { icon: Lightning, label: "Redis" },
];

export default function Home() {
  return (
    <>
      <GlassHero />

      {/* ── Trust bar ── */}
      <section className="border-y border-border/40 bg-white/60">
        <div className="container py-6">
          <p className="mb-4 text-center text-xs font-medium uppercase tracking-widest text-muted">
            Trusted across industries
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {CLIENTS.map((name) => (
              <span key={name} className="text-sm font-semibold text-ink/30">
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Intro statement — like Arcade's "You're the storyteller" ── */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-ink md:text-5xl">
              We build what we pitch.
              <br />
              <span className="text-primary">
                Speeir makes every project{" "}
              </span>
              <Cover className="text-3xl font-semibold tracking-tight md:text-5xl">
                effortless.
              </Cover>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted">
              In a crowded market, finding a reliable tech partner matters more
              than ever. But building quality software is painfully slow. Until
              now.
            </p>
          </div>
        </div>
      </section>

      {/* ── Services grid ── */}
      <section className="p-4 md:p-6">
        <div className="rounded-3xl bg-white py-20 md:py-28">
          <div className="container">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  What we do
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink md:text-4xl">
                  Six disciplines, one team
                </h2>
                <p className="mt-3 max-w-lg text-base text-muted">
                  From first line of code to the support that keeps it running.
                  Here&apos;s what we build.
                </p>
              </div>
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
              >
                All services
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="mt-12">
              <ServiceSpotlightGrid />
            </div>
          </div>
        </div>
      </section>

      {/* ── How we work — wobble cards ── */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              How we work
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              The fastest way to ship your product.
            </h2>
            <p className="mt-4 text-base text-muted">
              On average, we go from kickoff to first deploy in under 6 weeks.
              Here&apos;s how it works.
            </p>
          </div>

          <div className="mt-14">
            <WobbleCards />
          </div>
        </div>
      </section>

      {/* ── Testimonial / social proof ── */}
      <section className="p-4 md:p-6">
        <div className="overflow-hidden rounded-3xl bg-white py-20 md:py-28">
          <div className="container">
            <TestimonialsSlider testimonials={testimonials} />
          </div>
        </div>
      </section>

      {/* ── Dark section — Tech stack (like Arcade's integrations) ── */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="relative overflow-hidden rounded-3xl bg-ink px-8 py-16 md:px-16 md:py-20">
            <BackgroundBeams />
            <div className="relative z-10 mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
                Built with the tools
                <br />
                you can rely on.
              </h2>
              <p className="mt-4 text-base text-white/60">
                We use industry-standard technologies to build reliable,
                scalable software that your team can maintain and grow.
              </p>
            </div>

            <div className="relative z-10 mx-auto mt-12 flex max-w-3xl flex-wrap items-center justify-center gap-6">
              {TECH_STACK.map((tech) => (
                <div
                  key={tech.label}
                  className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white/70 transition-colors hover:bg-white/20 hover:text-white"
                  title={tech.label}
                >
                  <tech.icon size={22} weight="duotone" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats — "What it's like working with Speeir" ── */}
      <section className="py-20 md:py-28">
        <div className="container">
          <h2 className="text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            What it&apos;s like
            <br />
            working with Speeir
          </h2>

          <StatsGrid stats={STATS} />
        </div>
      </section>

      {/* ── Why Speeir — value props ── */}
      <section className="p-4 md:p-6">
        <div className="relative overflow-hidden rounded-3xl bg-white py-20 md:py-28">
        <BackgroundLines className="absolute inset-0" />
        <div className="container relative z-10">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Why Speeir
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              A blended model that delivers.
            </h2>
            <p className="mt-4 text-base text-muted">
              Local accountability with global reach. You get the best of both
              worlds.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Clock size={22} weight="duotone" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-ink">
                Fast delivery
              </h3>
              <p className="mt-2 text-sm text-muted">
                Around-the-clock progress with our cross-border teams working in
                sprints.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <ShieldCheck size={22} weight="duotone" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-ink">
                Enterprise quality
              </h3>
              <p className="mt-2 text-sm text-muted">
                Security, testing, and compliance built into every line of code
                we ship.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <ChartLineUp size={22} weight="duotone" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-ink">
                Cost efficient
              </h3>
              <p className="mt-2 text-sm text-muted">
                Rapid scaling and cost-efficient development without
                compromising on quality.
              </p>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <TypewriterEffectSmooth
              className="my-0"
              words={[
                { text: "Build" },
                { text: "software" },
                { text: "that" },
                { text: "drives" },
                { text: "action.", className: "text-primary" },
              ]}
            />
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                Start a project
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-white px-7 py-3.5 text-sm font-semibold text-ink transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
              >
                Learn about us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
