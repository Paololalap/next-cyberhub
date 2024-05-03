"use client";
import React, { useState } from "react";
import Image from "next/image";
import Logo from "@/public/logo.png";
import Burger from "@/public/burger.svg";
import Cross from "@/public/cross.svg";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

const linkStyles =
  "block py-2 px-3 text-white rounded hover:bg-[#FFB61B] md:hover:bg-[#6e102c]";
const activeStyle =
  "bg-[#00563F] !text-[#FFB61B] hover:bg-[#00563F] hover:cursor-not-allowed md:bg-transparent md:text-[#FFB61B]";

const links = [
  { id: "manage-news", href: "/manage-news", text: "Manage News" },
  { id: "manage-tips", href: "/manage-tips", text: "Manage Tips & Guides" },
];

const Navbar = () => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mainMenuOpen, setMainMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const toggleMainMenu = () => {
    setMainMenuOpen(!mainMenuOpen);
  };

  return (
    <header className=" h-auto max-w-full bg-[#8A1538]">
      <section className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4 sm:flex-col">
        <div className="flex w-[600px] justify-between md:w-auto">
          <Link href="/" className="mx-auto">
            <Image
              src={Logo}
              alt="UPOU Logo"
              className="h-auto w-full"
              width={465}
              height={122}
              sizes="(min-width: 540px) 465px, 89.55vw"
            />
          </Link>

          <div className="flex items-center space-x-3  ">
            <button
              type="button"
              className="inline-flex size-10 items-center justify-center  rounded-lg bg-[#00563F] p-2 text-sm  text-[#FFB61B] outline-none ring-2 ring-[#FFB61B] transition-all hover:scale-110 md:hidden"
              onClick={toggleMainMenu}
            >
              {mainMenuOpen ? (
                <Image
                  src={Cross}
                  alt=""
                  width={24}
                  height={24}
                  className="h-12 w-full"
                />
              ) : (
                <Image src={Burger} alt="" width={24} height={20} />
              )}
            </button>
          </div>
        </div>
        <Link
          href=""
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
              {links.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    className={`${linkStyles} ${
                      pathname === link.href ? activeStyle : ""
                    }`}
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
              <button
                onClick={() => signOut()}
                className="block rounded bg-[#00563F] px-3 py-2 text-white hover:text-[#FFB61B]"
              >
                Log Out
              </button>
            </ul>
          </nav>
        </div>
      </section>
    </header>
  );
};

export default Navbar;
