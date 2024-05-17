"use client";
import React, { useState } from "react";
import Image from "next/image";
import Logo from "@/public/logo.png";
import Burger from "@/public/burger.svg";
import Cross from "@/public/cross.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";

const linkStyles =
  "block py-2 px-3 text-white rounded hover:bg-[#FFB61B] md:hover:bg-[#6e102c] md:p-30";
const activeStyle =
  "bg-[#00563F] !text-[#FFB61B] hover:bg-[#00563F] hover:cursor-not-allowed md:bg-transparent md:text-[#FFB61B]";

const links = [
  { id: "news", href: "/news", text: "News" },
  { id: "tips", href: "/tips", text: "Tips & Guides" },
  { id: "tools", href: "/tools", text: "Tools" },
  { id: "community", href: "/community", text: "Community" },
  { id: "about", href: "/about", text: "About" },
];

const Navbar = () => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mainMenuOpen, setMainMenuOpen] = useState(false);
  const pathname = usePathname()

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const toggleMainMenu = () => {
    setMainMenuOpen(!mainMenuOpen);
  };

  return (
    <header className=' bg-[#8A1538] max-w-full h-auto'>
      <section className='max-w-screen-xl flex flex-wrap sm:flex-col items-center justify-between mx-auto p-4'>
        <div className='flex justify-between w-[600px] md:w-auto'>
          <Link href='/' className='mx-auto'>
            <Image
              src={Logo}
              alt='UPOU Logo'
              className='w-full h-auto'
              width={465}
              height={122}
              sizes='(min-width: 540px) 465px, 89.55vw'
            />
          </Link>

          <div className='flex items-center space-x-3  '>
            <button
              type='button'
              className='inline-flex items-center p-2 size-10  transition-all hover:scale-110 justify-center text-sm  text-[#FFB61B] rounded-lg md:hidden bg-[#00563F] outline-none ring-2 ring-[#FFB61B]'
              onClick={toggleMainMenu}
            >
              {mainMenuOpen ? (
                <Image
                  src={Cross}
                  alt=''
                  width={24}
                  height={24}
                  className='w-full h-12'
                />
              ) : (
                <Image src={Burger} alt='' width={24} height={20} />
              )}
            </button>
          </div>
        </div>
        <Link
          href=''
          className='text-3xl md:text-4xl font-semibold whitespace-nowrap text-white mx-auto md:mb-4'
        >
          Cyberhub
        </Link>
        <div className='flex justify-center w-full'>
          <nav
            className={`items-center justify-between w-full md:flex md:w-auto ${
              mainMenuOpen ? "block" : "hidden"
            }`}
          >
            <ul className='flex max-w-[300px] text-center  mx-auto flex-col font-medium pt-4 mt-4 bg-[#8A1538] rounded-lg md:max-w-[800px] md:justify-evenly md:flex-row md:p-0 whitespace-nowrap'>
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
