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
import { LINKS, LINKS_ADMIN } from "@/constants/LINKS";
import SignOutGoogle from "@/components/button/SignOutGoogle";
import { useSession } from "next-auth/react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Avatar } from "../ui/avatar";
import useMediaQuery from "@/hooks/useMediaQuery";

export default function Header() {
  const { data: session } = useSession();
  const [mainMenuOpen, setMainMenuOpen] = useState(false);
  const smallScreen = useMediaQuery("(max-width: 767px)");

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
              className="inline-flex size-10 items-center justify-center rounded-lg bg-[#00563F] p-2 text-sm text-[#FFB61B] outline-none ring-2 ring-[#FFB61B] transition-all hover:scale-110 md:hidden"
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
              {smallScreen && session?.user?.role === "admin" && (
                <>
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
                </>
              )}
              {pathname === "/community" && session?.user?.role === "user" && (
                <SignOutGoogle className="bg-[#FFB61B] text-black hover:bg-[#FFB61B]/80" />
              )}
            </ul>
          </nav>
        </div>
        {session?.user?.role === "admin" && (
          <NavigationMenu className="absolute right-5 hidden md:ml-3 md:block">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="mx-auto size-12 rounded-full">
                  <Avatar className="grid place-items-center bg-gray-300 text-2xl font-bold text-gray-700">
                    A
                  </Avatar>
                </NavigationMenuTrigger>
                <NavigationMenuContent className="w-screen max-w-[300px] p-0">
                  {LINKS_ADMIN.map((link) => (
                    <li key={link.id} className="list-none">
                      <NavigationMenuLink>
                        <Link
                          href={link.href}
                          className={cn(
                            LINK_STYLES,
                            "whitespace-nowrap rounded-none text-black hover:text-white md:hover:bg-[#00563F]",
                          )}
                        >
                          {link.text}
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                  <NavigationMenuLink className="p-0">
                    <SignOutGoogle className="w-full rounded-none bg-[#FFB61B] text-black hover:bg-[#FFB61B]/80 md:ml-0" />
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        )}
      </section>
    </header>
  );
}
