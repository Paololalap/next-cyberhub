import { SOCIAL_LINKS } from "@/constants/SOCIAL_LINKS";
import Image from "next/image";
import Link from "next/link";

export default function SocialLinks() {
  return (
    <>
      {SOCIAL_LINKS.map((link) => (
        <li key={link.name}>
          <Link href={link.link} className="group relative">
            <Image
              src={link.icon}
              alt={link.name}
              className="h-[16.8px] w-[16px] invert transition-all hover:opacity-80"
            />

            {/* Tooltip */}
            <span className="invisible absolute -top-2 left-1/2 z-20 -translate-x-1/2 -translate-y-full rounded-[4px] bg-black px-2 py-1 text-xs text-white opacity-0 transition-all group-hover:visible group-hover:opacity-80">
              {link.name}
            </span>
            <span className=" invisible absolute -top-3 left-1/2 z-10 size-3 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-black text-white opacity-0 transition-all group-hover:visible group-hover:opacity-80"></span>
          </Link>
        </li>
      ))}
    </>
  );
}
