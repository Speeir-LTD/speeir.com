import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { cn, CTA_SM_CLASS } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <div className="container flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
      <Eyebrow>404</Eyebrow>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-ink md:text-4xl">
        This page could not be found
      </h1>
      <p className="mt-3 text-sm text-muted">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <Link
        href="/"
        className={cn(CTA_SM_CLASS, "mt-8 px-6 py-2.5")}
      >
        Back home
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}
