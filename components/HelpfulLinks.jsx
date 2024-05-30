import { HELPFUL_LINKS } from "@/constants/HELPFUL_LINKS";
import Link from "next/link";

export default function HelpfulLinks() {
  return (
    <ul className="space-y-2">
      {HELPFUL_LINKS.map((link) => (
        <li key={link.name} className={`text-[#8a1538] text-[15px] `}>
          <Link target="_blank" href={link.link}>
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
