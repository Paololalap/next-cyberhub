import HelpfulLinks from "@/components/HelpfulLinks";
import Items from "@/components/Items";
import NavigationLinks from "@/components/NavigationLinks";
import Seals from "@/components/Seals";
import SocialLinks from "@/components/SocialLinks";
import UPSystems from "@/components/UPSystems";
import { cn } from "@/lib/utils";

export default function Footer({ className }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn(className, "break-all md:break-keep")}>
      <section className="px-8 py-24 lg:grid lg:grid-cols-4 xl:grid-cols-5 xl:px-20 ">
        <Seals />
        <div className="flex flex-col md:flex-1 lg:px-7">
          <h4 className="mb-[28px] text-[14px] font-[700] uppercase leading-[1.5] tracking-widest text-[#333c4e] ">
            University of the Philippines
          </h4>
          <nav className="mb-[50px]">
            <UPSystems />
          </nav>
        </div>

        <div className="flex flex-col md:flex-1 lg:px-7">
          <h4 className="mb-[28px] text-[14px] font-[700] uppercase tracking-widest text-[#333c4e]">
            Helpful Links
          </h4>
          <nav className="mb-[50px]">
            <HelpfulLinks />
          </nav>
        </div>
        <div className="hidden md:block md:flex-1 xl:hidden"></div>

        <div className="flex-col md:flex-1 lg:flex lg:px-7">
          {/* UP Open University */}
          <div className="flex flex-col">
            <h4 className="mb-[28px] text-[14px] font-[700] uppercase tracking-widest text-[#333c4e]">
              UP Open University
            </h4>

            <Items />
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
