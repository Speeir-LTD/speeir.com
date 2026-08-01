import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { AdminShell } from "./AdminShell";

// Already disallowed in robots.txt — this is a belt-and-suspenders noindex
// in case the URL is ever discovered some other way (a link, a bookmark).
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  return <AdminShell email={session.user.email ?? "Admin"}>{children}</AdminShell>;
}
