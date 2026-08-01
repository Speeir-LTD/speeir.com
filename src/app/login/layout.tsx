import type { Metadata } from "next";

// page.tsx here is a client component, so metadata can't live there directly
// — same noindex reasoning as admin/layout.tsx.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
