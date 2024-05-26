import { SEALS } from "@/constants/SEALS";
import Image from "next/image";
import Link from "next/link";

export default function Seals() {
  return (
    <div className="mb-[50px] flex max-w-[257px] flex-col gap-y-6 md:flex-1 lg:items-center">
      {SEALS.map((seal) => (
        <Link key={seal.href} href={seal.href}>
          <Image
            src={seal.src}
            alt={seal.alt}
            width={seal.width}
            height={seal.height}
            sizes="(min-width: 1560px) 257px, (min-width: 1280px) calc(12.69vw + 62px), (min-width: 1100px) 257px, (min-width: 360px) 259px, calc(52.5vw + 79px)"
          />
        </Link>
      ))}
    </div>
  );
}
