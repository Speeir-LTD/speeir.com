"use client";
import { cn } from "@/lib/utils";
import { List, X } from "@phosphor-icons/react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

import React, { useRef, useState } from "react";

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
    children?: { name: string; link: string }[];
  }[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [visible, setVisible] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <motion.div
      ref={ref}
      className={cn(
        "fixed inset-x-0 top-0 z-40 w-full px-4 pb-2 pt-8 md:px-6",
        className
      )}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean }>,
              { visible }
            )
          : child
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible
          ? "0 0 24px rgba(20, 24, 28, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(20, 24, 28, 0.04), 0 0 4px rgba(20, 24, 28, 0.08), 0 16px 68px rgba(20, 24, 28, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "none",
        // 800px, not 40% — minWidth used to clamp it on every realistic viewport.
        width: visible ? 800 : "100%",
        y: visible ? 12 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      className={cn(
        "relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full bg-transparent px-4 py-2 lg:flex",
        visible && "bg-white/80",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium text-ink/80 transition duration-200 hover:text-ink lg:flex lg:space-x-2",
        className
      )}
    >
      {items.map((item, idx) => (
        <div key={`link-${idx}`} className="relative" onMouseEnter={() => setHovered(idx)}>
          <a onClick={onItemClick} className="relative block px-4 py-2 text-ink/80" href={item.link}>
            {hovered === idx && (
              <motion.div
                layoutId="hovered"
                className="absolute inset-0 h-full w-full rounded-full bg-primary/10"
              />
            )}
            <span className="relative z-20">{item.name}</span>
          </a>

          {item.children && hovered === idx && (
            <div className="absolute left-1/2 top-full z-30 w-48 -translate-x-1/2 pt-1">
              <div className="rounded-2xl border border-border/40 bg-white p-2 shadow-md">
                {item.children.map((child) => (
                  <a
                    key={child.link}
                    href={child.link}
                    onClick={onItemClick}
                    className="block rounded-lg px-3 py-2 text-sm text-ink/80 hover:bg-primary/10 hover:text-ink"
                  >
                    {child.name}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </motion.div>
  );
};

export const MobileNav = ({
  children,
  className,
  visible,
}: MobileNavProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible
          ? "0 0 24px rgba(20, 24, 28, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(20, 24, 28, 0.04), 0 0 4px rgba(20, 24, 28, 0.08), 0 16px 68px rgba(20, 24, 28, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "none",
        width: visible ? "90%" : "100%",
        borderRadius: visible ? "1rem" : "2rem",
        y: visible ? 12 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between bg-transparent px-3 py-2 lg:hidden",
        visible && "bg-white/80",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between",
        className
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
}: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn(
            "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-2xl bg-white px-4 py-8 shadow-[0_0_24px_rgba(20,_24,_28,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(20,_24,_28,_0.04),_0_0_4px_rgba(20,_24,_28,_0.08),_0_16px_68px_rgba(20,_24,_28,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
            className
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  const Icon = isOpen ? X : List;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      // -mr-2 keeps the icon optically aligned with the edge while the
      // padding gives it a 44px tap target.
      className="-mr-2 flex h-11 w-11 items-center justify-center rounded-full text-ink transition-colors hover:text-primary"
    >
      <Icon size={22} />
    </button>
  );
};

export const NavbarButton = ({
  href,
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"a">) => {
  return (
    <a
      href={href}
      className={cn(
        "px-5 py-2 rounded-full bg-ink text-white text-sm font-semibold relative cursor-pointer hover:-translate-y-0.5 hover:shadow-lg shadow-sm transition duration-200 inline-block text-center",
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
};
