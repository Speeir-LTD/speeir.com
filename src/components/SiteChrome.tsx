"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";

const NO_CHROME_PREFIXES = ["/admin", "/login"];

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideChrome = NO_CHROME_PREFIXES.some((prefix) => pathname?.startsWith(prefix));

  if (hideChrome) return <>{children}</>;

  return (
    <>
      <Header />
      {/* Header is `fixed`, so it takes no flow space. Pages clear it with
          their own py-28 on desktop; on mobile py-20 (80px) is shorter than
          the 96px bar, so main makes up the difference. */}
      <main className="flex-1 pt-12 lg:pt-0">{children}</main>
      <Footer />
    </>
  );
}
