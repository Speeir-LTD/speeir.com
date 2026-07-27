import Link from "next/link";
import { Logo } from "./Logo";
import { TextHoverEffect } from "./ui/text-hover-effect";

const COLUMNS = [
  {
    title: "Services",
    links: [
      { href: "/services/web-development", label: "Web Development" },
      { href: "/services/mobile-development", label: "Mobile Apps" },
      { href: "/services/custom-software", label: "Custom Software" },
      { href: "/services/e-commerce", label: "E-Commerce" },
      { href: "/services/digital-marketing", label: "Digital Marketing" },
      { href: "/services/maintenance-support", label: "Maintenance" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/work", label: "Work" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Connect",
    links: [
      { href: "mailto:info@speeir.com", label: "info@speeir.com" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border/40">
      <div className="container pt-16">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Speeir designs and ships its own software before it ever touches a
              client&apos;s roadmap — then brings that same discipline to yours.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-semibold text-ink">{col.title}</p>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-border/40 pt-8">
          <p className="text-center text-sm text-muted">
            &copy; {new Date().getFullYear()} Speeir LTD. All rights reserved.
          </p>
        </div>

        <div className="mt-4 h-96 w-full">
          <TextHoverEffect text="Speeir" />
        </div>
      </div>
    </footer>
  );
}
