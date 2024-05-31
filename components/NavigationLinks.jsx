import { NAVIGATION_LINKS } from '@/constants/NAVIGATION_LINKS';
import Link from 'next/link';

export default function NavigationLinks() {
  return (
    <>
      {NAVIGATION_LINKS.map((link, index) => (
        <div key={link.href}>
          {index !== 0 && "| "}
          <Link className="transition-all hover:opacity-80" href={link.href}>
            &nbsp;
            {link.text}
          </Link>
        </div>
      ))}
    </>
  );
}
