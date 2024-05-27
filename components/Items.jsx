import { ITEMS } from "@/constants/ITEMS";
import Image from "next/image";
import Link from "next/link";

export default function Items({ fontSize }) {
  return (
    <ul className="mb-[50px] space-y-2">
      {ITEMS.map((item, index) => (
        <li
          key={index}
          className={`text-[#6a6a6a] text-[${fontSize}px] flex items-center gap-3`}
        >
          <Image
            src={item.icon}
            alt={item.text}
            className="h-[13.6px] w-[14px]"
          />
          {item.link ? (
            <Link href={`mailto:${item.text}`} className="text-[#8a1538]">
              {item.text}
            </Link>
          ) : (
            <span>{item.text}</span>
          )}
        </li>
      ))}
    </ul>
  );
}
