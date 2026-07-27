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
  { name: "Contact", link: "/contact" },
];

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
          {NAV_LINKS.map((item) => (
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
