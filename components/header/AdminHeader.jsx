"use client";
import { useState } from "react";
import Image from "next/image";
import Logo from "@/public/logo.png";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LINKS_ADMIN } from "@/constants/LINKS";
import { usePathname } from "next/navigation";
import { LINK_STYLES } from "@/constants/LINK_STYLES";
import { ACTIVE_STYLE } from "@/constants/ACTIVE_STYLE";
import SignOutGoogle from "../button/SignOutGoogle";

export default function AdminHeader() {
  const pathname = usePathname();
  const [mainMenuOpen, setMainMenuOpen] = useState(false);

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

          <div className="flex items-center space-x-3">
            <button
              type="button"
              className="md:hidden"
              onClick={toggleMainMenu}
            >
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="Profile"
                />
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
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
              {LINKS_ADMIN.map((link) => (
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
              <SignOutGoogle className="bg-[#FFB61B] text-black hover:bg-[#FFB61B]/80" />
            </ul>
          </nav>
        </div>
      </section>
    </header>
  );
}
