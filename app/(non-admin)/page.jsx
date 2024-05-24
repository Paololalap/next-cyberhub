import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { CalendarDays } from "lucide-react";
import LatestAnnouncement from "@/components/LatestAnnouncement";
import DefaultImage from '@/public/default-image-news.jpg'

const getNewsHeadline = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/content", {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(GError);
    }
    return res.json();
  } catch (error) {
    console.log("Something went wrong! ", error);
  }
};

export default async function HomePage() {
  const { content } = await getNewsHeadline();
  return (
    <>
      <LatestAnnouncement />
      {content.map((headline) => (
        <div
          key={headline._id}
          className="mx-auto mt-5 w-full max-w-[75rem] px-5 lg:p-0"
        >
          <div className="overflow-hidden rounded-md border-2 border-solid border-[#00563F] bg-white sm:grid sm:grid-cols-2">
            <div className="relative w-full overflow-hidden transition-all md:hover:scale-110">
              <AspectRatio ratio={16 / 9}>
                <Image
                  src={headline.imageL ? headline.imageL : DefaultImage}
                  alt={headline.title}
                  fill
                  sizes="(min-width: 580px) 465px, calc(91.15vw - 45px)"
                  className="rounded-lg object-contain"
                  priority
                />
              </AspectRatio>
            </div>
            <div className="p-5">
              <div className="flex flex-col">
                <div className="text-xl font-black">{headline.title}</div>
                <div className="flex flex-row">
                  <div className="mr-10 text-sm">
                    <span className="flex items-center gap-x-1">
                      <CalendarDays className="size-5" /> {headline.date}
                    </span>
                  </div>
                  <div className="text-sm italic">
                    <span>{headline.tags.join(" / ").replace(/,/g, "/,")}</span>
                  </div>
                </div>
                <div className="mt-5">
                  <span className="line-clamp-6">{headline.description}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
