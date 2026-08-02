import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// The dark pill CTA, in the only two sizes the site actually uses. Import
// these instead of retyping the chain — it had drifted into six near-variants.
export const CTA_CLASS =
  "inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5";
export const CTA_SM_CLASS =
  "inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5";

// Bordered form control. Compose sizing/extras through cn().
export const INPUT_CLASS =
  "w-full rounded-lg border border-border/60 px-4 py-2.5 text-sm text-ink outline-none focus:border-primary";

// Long-form body copy (legal pages, rendered markdown).
export const PROSE_CLASS =
  "prose prose-neutral prose-headings:font-semibold prose-headings:text-ink prose-p:text-muted prose-a:text-primary prose-strong:text-ink prose-li:text-muted";

// Tiled fractal-noise grain, used as a texture overlay on glass/gradient surfaces.
export const GRAIN_STYLE = {
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E\")",
  backgroundRepeat: "repeat",
  backgroundSize: "180px 180px",
} as const;
