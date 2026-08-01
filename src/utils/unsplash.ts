import type { CoverImageCredit } from "@/types/post";

export type UnsplashPhoto = {
  url: string;
  credit: CoverImageCredit;
};

// Unsplash's API guidelines require hotlinking (not re-hosting) their photos
// and crediting the photographer, which is why we only ever store the
// `regular` URL + attribution — never download/persist the image ourselves.
export async function searchUnsplash(query: string, perPage = 10): Promise<UnsplashPhoto[]> {
  if (!process.env.UNSPLASH_ACCESS_KEY) return [];

  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=${perPage}&orientation=landscape`,
      {
        headers: { Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}` },
        next: { revalidate: 60 * 60 * 24 },
      }
    );
    if (!res.ok) return [];

    const data = await res.json();
    return (data.results || []).map(
      (photo: {
        urls: { regular: string };
        alt_description?: string;
        user: { name: string; links: { html: string } };
      }) => ({
        url: photo.urls.regular,
        credit: { name: photo.user.name, url: photo.user.links.html },
      })
    );
  } catch (error) {
    console.error("Unsplash search error:", error);
    return [];
  }
}

// Deterministic pick so a given post's auto-cover doesn't reshuffle on
// every page load.
export async function getUnsplashCover(query: string, seed: string): Promise<UnsplashPhoto | null> {
  const photos = await searchUnsplash(query, 15);
  if (photos.length === 0) return null;

  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) | 0;

  return photos[Math.abs(hash) % photos.length];
}
