import Link from "next/link";
import Image from "next/image";

export function Logo() {
  return (
    <Link href="/" className="relative z-20 flex items-center">
      <Image
        src="/logo.svg"
        alt="Speeir"
        width={132}
        height={73}
        priority
        className="h-9 w-auto"
      />
    </Link>
  );
}
