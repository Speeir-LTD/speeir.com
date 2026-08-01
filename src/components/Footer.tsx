import Link from "next/link";
import { InstagramLogo, FacebookLogo, LinkedinLogo } from "@phosphor-icons/react/dist/ssr";
import { Logo } from "./Logo";
import { TextHoverEffect } from "./ui/text-hover-effect";

const SOCIAL_LINKS = [
  { href: "https://ie.linkedin.com/company/speeir", label: "LinkedIn", icon: LinkedinLogo },
  { href: "https://www.instagram.com/speeir.ltd/", label: "Instagram", icon: InstagramLogo },
  {
    href: "https://www.facebook.com/people/Speeir/61576228562819/",
    label: "Facebook",
    icon: FacebookLogo,
  },
];

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
      // Hidden for now, re-enable when ready (matches Header.tsx).
      // { href: "/work", label: "Work" },
      { href: "/case-studies", label: "Case Studies" },
      { href: "/blog", label: "Blog" },
      { href: "/faq", label: "FAQ" },
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
              client&apos;s roadmap, then brings that same discipline to yours.
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

              {col.title === "Connect" && (
                <ul className="mt-4 flex items-center gap-3">
                  {SOCIAL_LINKS.map((social) => (
                    <li key={social.href}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary/20"
                      >
                        <social.icon size={20} weight="fill" />
                      </a>
                    </li>
                  ))}
                </ul>
              )}
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
