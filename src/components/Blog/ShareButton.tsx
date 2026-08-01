"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ShareNetwork,
  XLogo,
  LinkedinLogo,
  FacebookLogo,
  InstagramLogo,
  LinkSimple,
  Check,
} from "@phosphor-icons/react";

const iconVariants = {
  hidden: { opacity: 0, scale: 0.4, y: 6 },
  visible: { opacity: 1, scale: 1, y: 0 },
};

export function ShareButton({ title, url }: { title: string; url: string }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [instagramCopied, setInstagramCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClickOutside = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // Instagram has no web share-intent URL like the others (no way to
  // pre-fill a post/DM from a link) — the closest honest equivalent is
  // copying the link and opening Instagram so the user can paste it in
  // themselves (DM, story, bio).
  const shareInstagram = async () => {
    await navigator.clipboard.writeText(url);
    setInstagramCopied(true);
    setTimeout(() => setInstagramCopied(false), 2000);
    window.open("https://www.instagram.com/", "_blank", "noopener,noreferrer");
  };

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div ref={containerRef} className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-full border border-border/60 px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-primary/40 hover:text-primary"
      >
        <ShareNetwork size={16} />
        Share
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ staggerChildren: 0.05, delayChildren: 0.03 }}
            className="absolute left-1/2 top-full z-20 mt-2 flex -translate-x-1/2 items-center gap-1 rounded-full border border-border/40 bg-white p-1.5 shadow-md"
          >
            <motion.a
              variants={iconVariants}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on X"
              className="flex h-8 w-8 items-center justify-center rounded-full text-muted hover:bg-primary/10 hover:text-primary"
            >
              <XLogo size={15} />
            </motion.a>
            <motion.a
              variants={iconVariants}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on LinkedIn"
              className="flex h-8 w-8 items-center justify-center rounded-full text-muted hover:bg-primary/10 hover:text-primary"
            >
              <LinkedinLogo size={15} />
            </motion.a>
            <motion.a
              variants={iconVariants}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on Facebook"
              className="flex h-8 w-8 items-center justify-center rounded-full text-muted hover:bg-primary/10 hover:text-primary"
            >
              <FacebookLogo size={15} />
            </motion.a>
            <motion.button
              variants={iconVariants}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              type="button"
              onClick={shareInstagram}
              aria-label="Copy link and open Instagram"
              title="Instagram doesn't support direct link sharing — this copies the link and opens Instagram"
              className="flex h-8 w-8 items-center justify-center rounded-full text-muted hover:bg-primary/10 hover:text-primary"
            >
              {instagramCopied ? <Check size={15} className="text-primary" /> : <InstagramLogo size={15} />}
            </motion.button>
            <motion.button
              variants={iconVariants}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              type="button"
              onClick={copyLink}
              aria-label="Copy link"
              className="flex h-8 w-8 items-center justify-center rounded-full text-muted hover:bg-primary/10 hover:text-primary"
            >
              {copied ? <Check size={15} className="text-primary" /> : <LinkSimple size={15} />}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
