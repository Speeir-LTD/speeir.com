import Link from "next/link";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { cn, CTA_CLASS } from "@/lib/utils";

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
