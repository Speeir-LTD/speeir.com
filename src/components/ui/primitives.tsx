import Link from "next/link";
import { ArrowLeft, ArrowRight, Sparkle } from "@phosphor-icons/react/dist/ssr";
import { cn, CTA_CLASS, CTA_SM_CLASS } from "@/lib/utils";

/** Small uppercase label that sits above a section heading. */
export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-xs font-semibold uppercase tracking-[0.2em] text-primary",
        className
      )}
    >
      {children}
    </p>
  );
}

/** "← All posts" style link back to a listing page. */
export function BackLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-primary"
    >
      <ArrowLeft size={14} />
      {children}
    </Link>
  );
}

/** The closing "Start a project" card every detail page ends with. */
export function CTACard({ heading, className }: { heading: string; className?: string }) {
  return (
    <div
      className={cn(
        "mx-auto mt-20 max-w-2xl rounded-2xl border border-border/40 bg-white p-8 text-center shadow-md",
        className
      )}
    >
      <h2 className="text-xl font-semibold text-ink">{heading}</h2>
      <Link href="/contact" className={cn("mt-5", CTA_CLASS)}>
        Start a project
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}

/** Soft brand halo that fades in on hover of the parent `group`. */
export function Glow() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -inset-px rounded-2xl bg-primary/10 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
    />
  );
}

/** Placeholder card for a listing with nothing in it yet. */
export function EmptyState({ heading, body }: { heading: string; body: string }) {
  return (
    <div className="group relative mx-auto mt-16 flex max-w-lg flex-col items-center rounded-2xl border border-dashed border-border/40 bg-white p-14 text-center shadow-md">
      <Glow />
      <div className="relative z-10 flex flex-col items-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Sparkle size={20} weight="duotone" />
        </div>
        <h2 className="mt-5 text-lg font-semibold text-ink">{heading}</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
        <Link href="/contact" className={cn(CTA_SM_CLASS, "mt-6")}>
          Start a project
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
