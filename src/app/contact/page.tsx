import type { Metadata } from "next";
import { pageMeta } from "@/lib/metadata";
import { EnvelopeSimple, MapPin } from "@phosphor-icons/react/dist/ssr";
import { ContactForm } from "@/components/ContactForm";
import { Eyebrow } from "@/components/ui/primitives";
import { SOCIAL_LINKS } from "@/data/social";

export const metadata: Metadata = pageMeta({
  title: "Contact",
  description:
    "Tell us what you're building.",
  path: "/contact",
});

// Product pages link here with ?subject=… so the enquiry arrives pre-labelled.
export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ subject?: string | string[] }>;
}) {
  const { subject } = await searchParams;
  const topic = typeof subject === "string" ? subject.slice(0, 120) : undefined;

  return (
    <div className="container py-20 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <Eyebrow>Contact</Eyebrow>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink md:text-5xl">
          Let&apos;s build something
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted">
          Tell us what you&apos;re building. We&apos;ll tell you how we&apos;d build it.
        </p>
      </div>

      <div className="mx-auto mt-16 grid max-w-5xl gap-6 lg:grid-cols-[1fr_22rem] lg:items-start">
        <ContactForm defaultMessage={topic && `${topic}\n\n`} />

        <aside className="rounded-2xl border border-border/40 bg-white p-8 shadow-md transition-shadow duration-300 hover:shadow-lg">
          <h2 className="text-lg font-semibold text-ink">Get in touch</h2>

          <div className="mt-6 space-y-5">
            <a href="mailto:info@speeir.com" className="group flex items-center gap-3.5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <EnvelopeSimple size={18} weight="duotone" />
              </span>
              <span>
                <span className="block text-xs text-muted">Email</span>
                <span className="block text-sm font-medium text-ink group-hover:text-primary">
                  info@speeir.com
                </span>
              </span>
            </a>

            <div className="flex items-center gap-3.5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <MapPin size={18} weight="duotone" />
              </span>
              <span>
                <span className="block text-xs text-muted">Location</span>
                <span className="block text-sm font-medium text-ink">
                  Dublin, Ireland
                </span>
              </span>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3 border-t border-border/40 pt-6">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary/20"
              >
                <social.icon size={20} weight="fill" />
              </a>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
