import { GRAIN_STYLE } from "@/lib/utils";

// Deterministic per-post variant so a post's fallback gradient never
// reshuffles between renders, without needing a stored/fetched image.
function variantFor(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) | 0;
  return Math.abs(hash) % 3;
}

const VARIANTS = ["bg-cover-1", "bg-cover-2", "bg-cover-3"];

export function PostCover({
  seed,
  title,
  image,
  fill = false,
}: {
  seed: string;
  title: string;
  image?: string | null;
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
        <img
          src={image}
          alt={title}
          className="h-full w-full scale-100 object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-ink/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
      </div>
    );
  }

  const initial = title.trim().charAt(0).toUpperCase() || "S";

  return (
    <div
      className={`${sizing} overflow-hidden transition-transform duration-500 ease-out group-hover:scale-110 ${VARIANTS[variantFor(seed)]}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-overlay"
        style={GRAIN_STYLE}
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
