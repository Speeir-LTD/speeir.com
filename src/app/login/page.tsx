"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Envelope, LockKey, Eye, EyeSlash } from "@phosphor-icons/react";
import { Logo } from "@/components/Logo";
import { cn, CTA_CLASS, INPUT_CLASS } from "@/lib/utils";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password");
      setIsLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-surface px-4 py-20">
      <div className="w-full max-w-md rounded-2xl border border-border/40 bg-white p-8 shadow-md">
        <div className="text-center">
          <div className="mx-auto w-fit">
            <Logo />
          </div>
          <h1 className="mt-6 text-2xl font-semibold text-ink">Admin sign in</h1>
          <p className="mt-2 text-sm text-muted">Sign in to manage the blog.</p>
        </div>

        <form onSubmit={handleLogin} className="mt-8 space-y-4">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
              Email
            </label>
            <div className="relative">
              <Envelope
                size={18}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
              />
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@speeir.com"
                className={cn(INPUT_CLASS, "bg-white pl-10 pr-4 transition-colors")}
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-ink">
              Password
            </label>
            <div className="relative">
              <LockKey
                size={18}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
              />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={cn(INPUT_CLASS, "bg-white pl-10 pr-10 transition-colors")}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-ink"
              >
                {showPassword ? <EyeSlash size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className={cn(CTA_CLASS, "mt-2 w-full justify-center px-6 py-3 disabled:cursor-not-allowed disabled:opacity-60")}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
