"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Logo from "@/public/logo.png";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LINKS_ADMIN } from "@/constants/LINKS";
import { LINK_STYLES } from "@/constants/LINK_STYLES";
import { ACTIVE_STYLE } from "@/constants/ACTIVE_STYLE";
import { Button } from "../ui/button";

async function getUserData() {
  try {
    const response = await fetch("http://localhost:3000/api/admin-user", {
      headers: {
        "Cache-Control": "no-store",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }

    const responseData = await response.json();
    if (!responseData || !responseData.user) {
      throw new Error("User data is missing");
    }

    return responseData.user;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default function AdminHeader() {
  const [user, setUser] = useState(null); // Initialize user state to null

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUserData();
      setUser(userData);
    };

    fetchData();
  }, []);

  const [mainMenuOpen, setMainMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMainMenu = () => {
    setMainMenuOpen(!mainMenuOpen);
  };

  if (!user) {
    return null; // Return null or a loading indicator while data is being fetched
  }
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
              <Button
                className="bg-[#FFB61B] text-[#8A1538] hover:bg-[#FFB61B]/90"
                onClick={() => signOut()}
              >
                Log Out
              </Button>
            </ul>
          </nav>
        </div>
      </section>
    </header>
  );
}
