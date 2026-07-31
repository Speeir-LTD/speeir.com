"use client";

import Link from "next/link";
import { Toaster } from "sonner";
import { signOut } from "next-auth/react";
import { SignOut } from "@phosphor-icons/react";
import { Logo } from "@/components/Logo";

export function AdminShell({
  email,
  children,
}: {
  email: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-surface">
      <header className="border-b border-border/40 bg-white">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-6">
            <Link href="/admin/blog">
              <Logo />
            </Link>
            <nav className="flex items-center gap-4 text-sm font-medium text-muted">
              <Link href="/admin/blog" className="hover:text-primary">
                Blog
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted">{email}</span>
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="inline-flex items-center gap-1.5 rounded-full border border-border/60 px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-primary/40 hover:text-primary"
            >
              <SignOut size={16} />
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="container py-10">{children}</main>
      <Toaster position="top-right" />
    </div>
  );
}
