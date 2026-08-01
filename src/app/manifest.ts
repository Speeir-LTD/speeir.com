import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Speeir",
    short_name: "Speeir",
    description:
      "Speeir designs and ships web, mobile, and custom software, building its own products first.",
    start_url: "/",
    display: "standalone",
    background_color: "#F3F4F8",
    theme_color: "#A15FDC",
    icons: [{ src: "/logo.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
