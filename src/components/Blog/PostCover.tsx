import type { CoverImageCredit } from "@/types/post";

const GRAIN_URL =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E\")";

// Deterministic per-post variant so a post's fallback gradient never
// reshuffles between renders, without needing a stored/fetched image.
function variantFor(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) | 0;
  return Math.abs(hash) % 3;
}

const VARIANTS = [
  "bg-void bg-blob-a bg-[length:160%_160%] bg-[position:20%_10%]",
  "bg-void bg-blob-b bg-[length:150%_150%] bg-[position:80%_30%]",
  "bg-ink bg-blob-a bg-[length:180%_180%] bg-[position:60%_70%]",
];

export function PostCover({
  seed,
  title,
  image,
  credit,
  showCredit = false,
  fill = false,
}: {
  seed: string;
  title: string;
  image?: string | null;
  credit?: CoverImageCredit | null;
  // Attribution only makes sense where the photo is shown large and on its
  // own (the post banner) — repeating it on every small grid thumbnail is
  // just clutter.
  showCredit?: boolean;
  // Fill the parent instead of imposing its own 16:10 box — for use as an
  // absolutely-positioned background layer behind card content.
  fill?: boolean;
}) {
  const sizing = fill ? "absolute inset-0" : "relative aspect-[16/10] w-full";

  if (image) {
    return (
      <div className={`${sizing} overflow-hidden bg-surface`}>
        {/* eslint-disable-next-line @next/next/no-img-element -- covers can be
            data: URLs (uploaded) or arbitrary remote hosts (Unsplash), which
            next/image can't handle without per-source config */}
        <img src={image} alt={title} className="h-full w-full object-cover" />
        {showCredit && credit && (
          <a
            href={credit.url}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-2 right-2 rounded-full bg-ink/60 px-2 py-0.5 text-[10px] text-white/80 backdrop-blur-sm hover:text-white"
          >
            Photo: {credit.name}
          </a>
        )}
      </div>
    );
  }

  const initial = title.trim().charAt(0).toUpperCase() || "S";

  return (
    <div className={`${sizing} overflow-hidden ${VARIANTS[variantFor(seed)]}`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-overlay"
        style={{ backgroundImage: GRAIN_URL, backgroundRepeat: "repeat", backgroundSize: "180px 180px" }}
      />
      <span
        aria-hidden="true"
        className="absolute bottom-3 right-4 select-none font-semibold text-white/10"
        style={{ fontSize: "5rem", lineHeight: 1 }}
      >
        {initial}
      </span>
    </div>
  );
}
