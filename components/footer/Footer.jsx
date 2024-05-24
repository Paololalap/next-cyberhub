"use client";

import Image from "next/image";
import PhTransparentSeal from "@/public/philippine-transparency-seal.png";
import FreedomOfInformation from "@/public/freedom-of-information.png";
import CitizenCharter from "@/public/citizen-charter.png";
import PTS from "@/public/PTS.png";
import Link from "next/link";
import House from "@/public/house.svg";
import Clock from "@/public/clock.svg";
import Mail from "@/public/mail.svg";
import Phone from "@/public/phone.svg";
import Facebook from "@/public/facebook.svg";
import Instagram from "@/public/instagram.svg";
import Twitter from "@/public/twitter.svg";
import Youtube from "@/public/youtube.svg";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

const Footer = ({ className }) => {
  const currentYear = new Date().getFullYear();
  const [fontSize, setFontSize] = useState(15);

  const handleFontSizeChange = (newFontSize) => {
    setFontSize(newFontSize);
  };

  return (
    <footer className={cn(className, "break-all md:break-keep")}>
      <section className="px-8 py-24 lg:grid lg:grid-cols-4 xl:grid-cols-5 xl:px-20 ">
        <section className="mb-[50px] flex max-w-[257px] flex-col gap-y-6 md:flex-1 lg:items-center">
          <Link href="https://www.upou.edu.ph/philippines-transparency-seal">
            <Image
              src={PhTransparentSeal}
              alt="Philippine Transparency Seal"
              width={257}
              height={80}
              sizes="(min-width: 1560px) 257px, (min-width: 1280px) calc(12.69vw + 62px), (min-width: 1100px) 257px, (min-width: 360px) 259px, calc(52.5vw + 79px)"
            ></Image>
          </Link>

          <Link href="https://www.foi.gov.ph/requests?search=UP+Open+University">
            <Image
              src={FreedomOfInformation}
              alt="Philippine Transparency Seal"
              width={257}
              height={80}
              sizes="(min-width: 1560px) 257px, (min-width: 1280px) calc(12.69vw + 62px), (min-width: 1100px) 257px, (min-width: 360px) 259px, calc(52.5vw + 79px)"
            ></Image>
          </Link>

          <Link href="https://www.upou.edu.ph/wp-content/uploads/2020/12/UPOU-2020-Citizens_Charter-2nd.pdf">
            <Image
              src={CitizenCharter}
              alt="Philippine Transparency Seal"
              width={257}
              height={80}
              sizes="(min-width: 1560px) 257px, (min-width: 1280px) calc(12.69vw + 62px), (min-width: 1100px) 257px, (min-width: 360px) 259px, calc(52.5vw + 79px)"
            ></Image>
          </Link>

          <Link href="https://www.upou.edu.ph/up-data-privacy-notice-for-students">
            <Image
              src={PTS}
              alt="Philippine Transparency Seal"
              width={285}
              height={89}
              sizes="(min-width: 1280px) calc(20vw - 32px), (min-width: 1040px) calc(25vw - 16px), calc(100vw - 64px)"
            ></Image>
          </Link>
        </section>

        <section className="flex flex-col md:flex-1 lg:px-7">
          <h4 className="mb-[28px] text-[14px] font-[700] uppercase leading-[1.5] tracking-widest text-[#333c4e] ">
            University of the Philippines
          </h4>
          <nav className="mb-[50px]">
            <ul className="space-y-2">
              <li className={`text-[#8a1538] text-[${fontSize}px] `}>
                <Link target="_blank" href="https://www.up.edu.ph/">
                  System
                </Link>
              </li>
              <li className={`text-[#8a1538] text-[${fontSize}px] `}>
                <Link target="_blank" href="https://upd.edu.ph/">
                  Diliman
                </Link>
              </li>
              <li className={`text-[#8a1538] text-[${fontSize}px] `}>
                <Link target="_blank" href="http://uplb.edu.ph/">
                  Los Baños
                </Link>
              </li>
              <li className={`text-[#8a1538] text-[${fontSize}px] `}>
                <Link target="_blank" href="https://www.upm.edu.ph/">
                  Manila
                </Link>
              </li>
              <li className={`text-[#8a1538] text-[${fontSize}px] `}>
                <Link target="_blank" href="https://www.upv.edu.ph/">
                  Visayas
                </Link>
              </li>
              <li className={`text-[#8a1538] text-[${fontSize}px] `}>
                <Link target="_blank" href="https://www.upou.edu.ph/home/">
                  Mindanao
                </Link>
              </li>
              <li className={`text-[#8a1538] text-[${fontSize}px] `}>
                <Link target="_blank" href="https://www.upb.edu.ph/">
                  Baguio
                </Link>
              </li>
              <li className={`text-[#8a1538] text-[${fontSize}px] `}>
                <Link target="_blank" href="http://upcebu.edu.ph/">
                  Cebu
                </Link>
              </li>
            </ul>
          </nav>
        </section>

        <section className="flex flex-col md:flex-1 lg:px-7">
          <h4 className="mb-[28px] text-[14px] font-[700] uppercase tracking-widest text-[#333c4e]">
            Helpful Links
          </h4>
          <nav className="mb-[50px]">
            <ul className="space-y-2">
              <li className={`text-[#8a1538] text-[${fontSize}px] `}>
                <Link target="_blank" href="https://www.upou.edu.ph/home/">
                  UPOU Main Website
                </Link>
              </li>
              <li className={`text-[#8a1538] text-[${fontSize}px] `}>
                <Link target="_blank" href="https://myportal.upou.edu.ph/">
                  MyPortal
                </Link>
              </li>
              <li className={`text-[#8a1538] text-[${fontSize}px] `}>
                <Link target="_blank" href="https://networks.upou.edu.ph/">
                  UPOU Networks
                </Link>
              </li>
              <li className={`text-[#8a1538] text-[${fontSize}px] `}>
                <Link target="_blank" href="https://library.upou.edu.ph/">
                  University Library
                </Link>
              </li>
              <li className={`text-[#8a1538] text-[${fontSize}px] `}>
                <Link target="_blank" href="https://model.upou.edu.ph/">
                  Massive Open Distance e-Learning
                </Link>
              </li>
              <li className={`text-[#8a1538] text-[${fontSize}px] `}>
                <Link target="_blank" href="https://openupconnect.com/">
                  UPOU Blog
                </Link>
              </li>
              <li className={`text-[#8a1538] text-[${fontSize}px] `}>
                <Link
                  target="_blank"
                  href="https://www.upou.edu.ph/announcement/"
                >
                  Announcements
                </Link>
              </li>
              <li className={`text-[#8a1538] text-[${fontSize}px] `}>
                <Link target="_blank" href="http://our.upou.edu.ph/oas/">
                  Online Application System
                </Link>
              </li>
              <li className={`text-[#8a1538] text-[${fontSize}px] `}>
                <Link
                  target="_blank"
                  href="http://www.officialgazette.gov.ph/downloads/2014/12dec/20141209-RA-10650-BSA.pdf"
                >
                  Open Distance Learning Act RA 10650
                </Link>
              </li>
              <li className={`text-[#8a1538] text-[${fontSize}px] `}>
                <Link href="https://www.upou.edu.ph/job-opportunities/">
                  Job Opportunities
                </Link>
              </li>
              <li className={`text-[#8a1538] text-[${fontSize}px] `}>
                <Link
                  target="_blank"
                  href="https://www.upou.edu.ph/bids-and-awards-committee"
                >
                  Bids and Awards Committee
                </Link>
              </li>
              <li className={`text-[#8a1538] text-[${fontSize}px] `}>
                <Link
                  target="_blank"
                  href="https://upoudrrm.notion.site/upoudrrm/University-of-the-Philippines-Open-University-5e4ad76031d64e7b8227dc7b2e8bb1c4"
                >
                  UPOU DRRM
                </Link>
              </li>
              <li className={`text-[#8a1538] text-[${fontSize}px] `}>
                <Link href="https://www.upou.edu.ph/about/office-of-the-vice-chancellor-for-finance-and-administration/campus-and-development-maintenance-office/">
                  Facilities
                </Link>
              </li>
              <li className={`text-[#6a6a6a] text-[${fontSize}px] `}>
                Accessibility
              </li>
            </ul>
          </nav>
        </section>
        <section className="hidden md:block md:flex-1 xl:hidden"></section>

        <section className="flex-col md:flex-1 lg:flex lg:px-7">
          {/* UP Open University */}
          <section className="flex flex-col">
            <h4 className="mb-[28px] text-[14px] font-[700] uppercase tracking-widest text-[#333c4e]">
              UP Open University
            </h4>

            <ul className="mb-[50px] space-y-2">
              <li
                className={`text-[#6a6a6a] text-[${fontSize}px]  flex items-center gap-3`}
              >
                <Image src={House} alt="" className="h-[13.6px] w-[15.75px]" />
                <span>Los Baños, Laguna, Philippines, 4031</span>
              </li>
              <li
                className={`text-[#6a6a6a] text-[${fontSize}px] flex items-center gap-3`}
              >
                <Image src={Phone} alt="" className="h-[13.6px] w-[14px]" />
                <span>(+6349) 536-6001 to 06 local 710</span>
              </li>
              <li
                className={`text-[#6a6a6a] text-[${fontSize}px] flex items-center gap-3`}
              >
                <Image src={Mail} alt="" className="h-[13.6px] w-[14px]" />
                <Link href="mailto:" className="text-[#8a1538]">
                  inquiries@upou.edu.ph
                </Link>
              </li>
              <li
                className={`text-[#6a6a6a] text-[${fontSize}px] flex items-center gap-3`}
              >
                <Image src={Clock} alt="" className="h-[13.6px] w-[14px]" />
                <span>Monday - Friday: 8:00 AM - 5:00 PM PHT</span>
              </li>
            </ul>
          </section>

          <section className="z-10 flex flex-col">
            <h4 className="mb-[28px] text-[14px] font-[700] uppercase tracking-widest text-[#333c4e]">
              Change Text Size
            </h4>

            <ul className="flex flex-wrap items-baseline gap-x-2 sm:flex-nowrap">
              <li>
                <button
                  className="text-[13.5px] text-[#8a1538]"
                  onClick={() => handleFontSizeChange(13.5)}
                >
                  Small
                </button>
              </li>
              <li>
                <button
                  className="text-[15px] text-[#8a1538]"
                  onClick={() => handleFontSizeChange(15)}
                >
                  Normal
                </button>
              </li>
              <li>
                <button
                  className="text-[19.5px] text-[#8a1538]"
                  onClick={() => handleFontSizeChange(19.5)}
                >
                  Larger+
                </button>
              </li>
              <li>
                <button
                  className="text-[22.5px] text-[#8a1538]"
                  onClick={() => handleFontSizeChange(22.5)}
                >
                  Large++
                </button>
              </li>
            </ul>
          </section>
        </section>
        <section className="hidden xl:block"></section>
      </section>

      <section className="h-[150px] bg-[#484848] lg:h-[100px]">
        <div className="mx-auto flex h-[150px] w-[88vw] flex-col items-center justify-evenly whitespace-nowrap lg:h-[100px] lg:flex-row lg:justify-between">
          <div className="flex flex-wrap justify-center gap-x-2 text-xs text-white ">
            <span>&copy; All Rights Reserved {currentYear}</span> |
            <Link
              className="transition-all hover:opacity-80"
              href="https://www.upou.edu.ph/cookie/"
            >
              Cookie Policy
            </Link>{" "}
            |
            <Link
              className="transition-all hover:opacity-80"
              href="https://www.upou.edu.ph/sitemap/"
            >
              Sitemap
            </Link>{" "}
            |
            <Link
              className="transition-all hover:opacity-80"
              href="https://docs.google.com/forms/d/e/1FAIpQLSeRMmCD8zjOhdCpZYPC8WsTuo6N8w5QPBb2t3cj5zy3WSDKjg/viewform"
            >
              Feedback
            </Link>
          </div>
          <ul className="flex justify-center gap-5">
            <li>
              <Link
                href="https://www.facebook.com/upouofficial"
                className="group relative"
              >
                <Image
                  src={Facebook}
                  alt="Facebook"
                  className="h-[16.8px] w-[16px] invert transition-all hover:opacity-80"
                />

                {/* Tooltip */}
                <span className="invisible absolute -top-2 left-1/2 z-20 -translate-x-1/2 -translate-y-full rounded-[4px] bg-black px-2 py-1 text-xs text-white opacity-0  transition-all group-hover:visible group-hover:opacity-80">
                  Facebook
                </span>
                <span className=" invisible absolute -top-3 left-1/2 z-10 size-3 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-black text-white opacity-0 transition-all group-hover:visible group-hover:opacity-80"></span>
              </Link>
            </li>
            <li>
              <Link
                href="https://twitter.com/upouofficial"
                className="group relative"
              >
                <Image
                  src={Twitter}
                  alt="Twitter"
                  className="h-[16.8px] w-[16px] invert transition-all hover:opacity-80"
                />
                {/* Tooltip */}
                <span className="invisible absolute -top-2 left-1/2 z-20 -translate-x-1/2 -translate-y-full rounded-[4px] bg-black px-2 py-1 text-xs text-white opacity-0  transition-all group-hover:visible group-hover:opacity-80">
                  Twitter
                </span>
                <span className=" invisible absolute -top-3 left-1/2 z-10 size-3 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-black text-white opacity-0 transition-all group-hover:visible group-hover:opacity-80"></span>
              </Link>
            </li>
            <li>
              <Link
                href="https://www.youtube.com/channel/UCYPgNGYUUH81JSM5TBmclRg"
                className="group relative"
              >
                <Image
                  src={Youtube}
                  alt="Youtube"
                  className="h-[16.8px] w-[16px] invert transition-all hover:opacity-80"
                />
                {/* Tooltip */}

                <span className="invisible absolute -top-2 left-1/2 z-20 -translate-x-1/2 -translate-y-full rounded-[4px] bg-black px-2 py-1 text-xs text-white opacity-0  transition-all group-hover:visible group-hover:opacity-80">
                  Youtube
                </span>
                <span className=" invisible absolute -top-3 left-1/2 z-10 size-3 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-black text-white opacity-0 transition-all group-hover:visible group-hover:opacity-80"></span>
              </Link>
            </li>
            <li>
              <Link
                href="https://www.instagram.com/upouofficial/"
                className="group relative"
              >
                <Image
                  src={Instagram}
                  alt="Instagram"
                  className="h-[16.8px] w-[16px] invert transition-all hover:opacity-80"
                />
                {/* Tooltip */}
                <span className="invisible absolute -top-2 left-1/2 z-20 -translate-x-1/2 -translate-y-full rounded-[4px] bg-black px-2 py-1 text-xs text-white opacity-0  transition-all group-hover:visible group-hover:opacity-80">
                  Instagram
                </span>
                <span className=" invisible absolute -top-3 left-1/2 z-10 size-3 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-black text-white opacity-0 transition-all group-hover:visible group-hover:opacity-80"></span>
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
