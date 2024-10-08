import { UP_SYSTEMS } from "@/constants/UP_SYSTEMS";
import Link from "next/link";

export default function UPSystems() {
  return (
    <ul className="space-y-2">
      {UP_SYSTEMS.map((system) => (
        <li
          key={system.name}
          className={`text-[#8a1538] text-[15px] `}
        >
          <Link target="_blank" href={system.link}>
            {system.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
