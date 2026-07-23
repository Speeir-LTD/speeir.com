// src/app/api/blog/image/route.ts
// Proxies Pexels' image search server-side — the API key can't be exposed
// in the client bundle, and SingleBlog (which needs a topic-relevant cover
// photo) renders inside a "use client" tree.
import { NextResponse } from 'next/server';

const FALLBACK_IMAGE = '/images/placeholder.png';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') || 'technology';
  const seed = Number(searchParams.get('seed')) || 0;

  if (!process.env.PEXELS_API_KEY) {
    return NextResponse.json({ url: FALLBACK_IMAGE });
  }

  try {
    const res = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=15`,
      {
        headers: { Authorization: process.env.PEXELS_API_KEY },
        next: { revalidate: 60 * 60 * 24 }, // photos for a given tag barely change; cache a day
      }
    );

    if (!res.ok) {
      return NextResponse.json({ url: FALLBACK_IMAGE });
    }

    const data = await res.json();
    const photos = data.photos || [];
    if (photos.length === 0) {
      return NextResponse.json({ url: FALLBACK_IMAGE });
    }

    // Deterministic pick so the same post always shows the same photo
    // instead of reshuffling on every page load.
    const photo = photos[seed % photos.length];
    return NextResponse.json({ url: photo.src.landscape });
  } catch (error) {
    console.error('Pexels image search error:', error);
    return NextResponse.json({ url: FALLBACK_IMAGE });
  }
}
