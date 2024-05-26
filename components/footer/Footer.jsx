"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { FONT_SIZES } from "@/constants/FONT_SIZES";
import Seals from "@/components/Seals";
import UPSystems from "@/components/UPSystems";
import HelpfulLinks from "@/components/HelpfulLinks";
import Items from "@/components/Items";
import NavigationLinks from "@/components/NavigationLinks";
import SocialLinks from "@/components/SocialLinks";

export default function Footer({ className }) {
  const currentYear = new Date().getFullYear();
  const [fontSize, setFontSize] = useState(15);

  const handleFontSizeChange = (newFontSize) => {
    setFontSize(newFontSize);
  };

  return (
    <footer className={cn(className, "break-all md:break-keep")}>
      <section className="px-8 py-24 lg:grid lg:grid-cols-4 xl:grid-cols-5 xl:px-20 ">
        <Seals />
        <div className="flex flex-col md:flex-1 lg:px-7">
          <h4 className="mb-[28px] text-[14px] font-[700] uppercase leading-[1.5] tracking-widest text-[#333c4e] ">
            University of the Philippines
          </h4>
          <nav className="mb-[50px]">
            <UPSystems fontSize={fontSize} />
          </nav>
        </div>

        <div className="flex flex-col md:flex-1 lg:px-7">
          <h4 className="mb-[28px] text-[14px] font-[700] uppercase tracking-widest text-[#333c4e]">
            Helpful Links
          </h4>
          <nav className="mb-[50px]">
            <HelpfulLinks fontSize={fontSize} />
          </nav>
        </div>
        <div className="hidden md:block md:flex-1 xl:hidden"></div>

        <div className="flex-col md:flex-1 lg:flex lg:px-7">
          {/* UP Open University */}
          <div className="flex flex-col">
            <h4 className="mb-[28px] text-[14px] font-[700] uppercase tracking-widest text-[#333c4e]">
              UP Open University
            </h4>

            <Items fontSize={fontSize} />
          </div>

          <div className="z-10 flex flex-col">
            <h4 className="mb-[28px] text-[14px] font-[700] uppercase tracking-widest text-[#333c4e]">
              Change Text Size
            </h4>

            <ul className="flex flex-wrap items-baseline gap-x-2 sm:flex-nowrap">
              {FONT_SIZES.map((item, index) => (
                <li key={index}>
                  <button
                    className={`text-[${item.size}px] text-[#8a1538]`}
                    onClick={() => handleFontSizeChange(item.size)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="hidden xl:block"></div>
      </section>

      <section className="h-[150px] bg-[#484848] lg:h-[100px]">
        <div className="mx-auto flex h-[150px] w-[88vw] flex-col items-center justify-evenly whitespace-nowrap lg:h-[100px] lg:flex-row lg:justify-between">
          <div className="flex flex-wrap justify-center gap-x-2 text-xs text-white ">
            <span>&copy; All Rights Reserved {currentYear}</span> |
            <NavigationLinks />
          </div>
          <ul className="flex justify-center gap-5">
            <SocialLinks />
          </ul>
        </div>
      </section>
    </footer>
  );
}
