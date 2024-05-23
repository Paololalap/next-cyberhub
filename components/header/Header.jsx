"use client";
import { useState } from "react";
import Image from "next/image";
import Logo from "@/public/logo.png";
import Burger from "@/public/burger.svg";
import Cross from "@/public/cross.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LINK_STYLES } from "@/constants/LINK_STYLES";
import { ACTIVE_STYLE } from "@/constants/ACTIVE_STYLE";
import { LINKS } from "@/constants/LINKS";
import SignOutGoogle from "@/components/button/SignOutGoogle";
import { useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();
  const [mainMenuOpen, setMainMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMainMenu = () => {
    setMainMenuOpen(!mainMenuOpen);
  };

  return (
    <header className="bg-[#8A1538]">
      <section className="mx-auto flex w-fit flex-wrap items-center justify-between p-4 sm:flex-col">
        <div className="mx-auto flex flex-nowrap">
          <Link href="/" className="mx-auto">
            <Image
              src={Logo}
              alt="UPOU Logo"
              className="h-auto w-full"
              priority
              width={465}
              height={122}
              sizes="(min-width: 540px) 465px, 89.55vw"
            />
          </Link>

          <div className="flex items-center space-x-3 ">
            <button
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-lg bg-[#00563F] p-2 text-sm text-[#FFB61B] outline-none ring-2 ring-[#FFB61B] transition-all hover:scale-110 sm:hidden"
              onClick={toggleMainMenu}
            >
              {mainMenuOpen ? (
                <Image
                  src={Cross}
                  alt="exit button"
                  width={24}
                  height={24}
                  className="h-12 w-full"
                />
              ) : (
                <Image
                  src={Burger}
                  alt="burger menu button"
                  width={24}
                  height={20}
                />
              )}
            </button>
          </div>
        </div>
        <Link
          href="/"
          className="mx-auto whitespace-nowrap text-3xl font-semibold text-white md:mb-4 md:text-4xl"
        >
          Cyberhub
        </Link>
        <div className="flex w-full justify-center">
          <nav
            className={`w-full items-center justify-between md:flex md:w-auto ${
              mainMenuOpen ? "block" : "hidden"
            }`}
          >
            <ul className="mx-auto mt-4 flex max-w-[300px] flex-col whitespace-nowrap rounded-lg bg-[#8A1538] pt-4 text-center font-medium md:max-w-[800px] md:flex-row md:justify-between md:p-0">
              {LINKS.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    className={`${LINK_STYLES} ${
                      pathname === link.href ? ACTIVE_STYLE : ""
                    }`}
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
              {pathname === "/community" && session && (
                <SignOutGoogle className="bg-[#FFB61B] text-black hover:bg-[#FFB61B]/80" />
              )}
            </ul>
          </nav>
        </div>
      </section>
    </header>
  );
}
