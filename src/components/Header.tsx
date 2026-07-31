"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "./ui/resizable-navbar";
import { Logo } from "./Logo";

const NAV_LINKS = [
  { name: "About", link: "/about" },
  { name: "Services", link: "/services" },
  {
    name: "Work",
    link: "/work",
    children: [
      { name: "Products", link: "/work" },
      { name: "Case Studies", link: "/case-studies" },
    ],
  },
  { name: "Blog", link: "/blog" },
  { name: "Contact", link: "/contact" },
];

// MobileNavMenu renders a flat vertical list — plenty of room there, so
// unlike the desktop bar it doesn't need the Work/Case Studies grouping.
const MOBILE_NAV_LINKS = NAV_LINKS.flatMap((item) => item.children ?? [item]);

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <Navbar>
      <NavBody>
        <Logo />
        <NavItems items={NAV_LINKS} />
        <div className="flex items-center gap-4">
          <NavbarButton href="/contact" variant="dark">
            Start a project
          </NavbarButton>
        </div>
      </NavBody>

      <MobileNav>
        <MobileNavHeader>
          <Logo />
          <MobileNavToggle isOpen={open} onClick={() => setOpen((v) => !v)} />
        </MobileNavHeader>

        <MobileNavMenu isOpen={open} onClose={() => setOpen(false)}>
          {MOBILE_NAV_LINKS.map((item) => (
            <Link
              key={item.link}
              href={item.link}
              onClick={() => setOpen(false)}
              className="relative text-sm font-medium text-ink/80"
            >
              <span className="block">{item.name}</span>
            </Link>
          ))}
          <NavbarButton
            href="/contact"
            onClick={() => setOpen(false)}
            variant="dark"
            className="w-full"
          >
            Start a project
          </NavbarButton>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
