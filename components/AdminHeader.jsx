"use client";
import React, { useState } from "react";
import Image from "next/image";
import Logo from "@/public/logo.png";
import Burger from "@/public/burger.svg";
import Cross from "@/public/cross.svg";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Settings, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const linkStyles =
  "block py-2 px-3 text-white rounded hover:bg-[#FFB61B] md:hover:bg-[#6e102c]";
const activeStyle =
  "bg-[#00563F] !text-[#FFB61B] hover:bg-[#00563F] hover:cursor-not-allowed md:bg-transparent md:text-[#FFB61B]";

const links = [
  { id: "manage-news", href: "/manage-news", text: "Manage News" },
  { id: "manage-tips", href: "/manage-tips", text: "Manage Tips & Guides" },
  {
    id: "edit-announcement",
    href: "/edit-announcement",
    text: "Edit Announcement",
  },
];

const Navbar = () => {
  const [mainMenuOpen, setMainMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMainMenu = () => {
    setMainMenuOpen(!mainMenuOpen);
  };

  return (
    <header className=" h-auto w-fit sm:w-screen bg-[#8A1538]">
      <section className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4 sm:flex-col">
        <div className="flex w-full flex-col md:flex-row">
          <div className="hidden w-full md:block bg-blue-500 flex-1"></div>
          
          <Link href="/" className="w-auto bg-green-500 flex-1">
            <div className="flex relative w-[512px] h-[134px] items-center justify-between ">
              <Image
                src={Logo}
                alt="UPOU Logo"
                className="object-cover"
                fill
                sizes="100vw"
              />
            </div>
          </Link>

            
          
          <div className="w-full relative bg-blue-500 flex-1">
            <div className="flex items-center space-x-3  ">
              <button
                type="button"
                className="inline-flex size-10 items-center justify-center rounded-lg bg-[#00563F] p-2 text-sm text-[#FFB61B] outline-none ring-2 ring-[#FFB61B] transition-all hover:scale-110 md:hidden"
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className='absolute border-4 border-[#FFB61B] right-0 sm:right-[] md:right-[-75px] top-1/2 -translate-y-1/2 md:size-12'>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="Profile"
                  />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <Link href={"/account-settings"}>Account Settings</Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => signOut()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
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
            </ul>
          </nav>
        </div>
      </section>
    </header>
  );
};

export default Navbar;
