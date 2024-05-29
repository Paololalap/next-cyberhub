import ReadMore from "@/components/button/ReadMore";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import formatDateToWords from "@/constants/DATE_TO_WORDS";
import { connectToDatabase } from "@/lib/connectMongo";
import DefaultTipsImage from "@/public/default-image-tips.jpg";
import { CalendarDays } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

async function getLatestTips() {
  try {
    const client = await connectToDatabase();
    const db = client.db(`${process.env.NEXT_PUBLIC_DB}`);

    const latestTips = await db
      .collection("contents")
      .findOne({ type: "Tips" }, { sort: { createdAt: -1 } });

    const items = await db
      .collection("contents")
      .find({
        type: "Tips",
        _id: { $ne: latestTips._id },
        createdAt: { $ne: latestTips.createdAt },
      })
      .sort({ createdAt: -1 })
      .toArray();

    const response = { latestTips, items };
    return response;
  } catch (error) {
    throw new Error("Failed to fetch data. Please try again later.");
  }
}
export default async function LatestTips() {
  const tipsData = await getLatestTips();
  return (
    <div className="mx-auto my-5 w-screen max-w-[75rem] px-3">
      <div className="break-all text-center text-3xl font-black">
        Latest Tips
      </div>
      <hr className="mx-auto mb-5 mt-3 w-screen max-w-64 border-2 border-solid border-[#FFB61B]" />
      {tipsData.latestTips && (
        <div
          key={tipsData.latestTips._id}
          className="group mt-2 grid grid-cols-1 overflow-hidden rounded-md border-2 border-solid border-[#00563F] bg-white first:mt-0"
        >
          <Link
            href={`/article/${tipsData.latestTips._id}`}
            className="relative overflow-hidden"
          >
            <AspectRatio ratio={16 / 9}>
              <Image
                className="object-cover object-top md:hover:object-contain md:hover:object-center"
                src={
                  tipsData.latestTips.imageL
                    ? tipsData.latestTips.imageL
                    : DefaultTipsImage
                }
                alt={tipsData.latestTips.title}
                fill
                sizes="(min-width: 680px) 640px, calc(94.44vw + 17px)"
                placeholder="blur"
                blurDataURL={tipsData.latestTips.imageL}
              />
            </AspectRatio>
          </Link>

          <div className="flex flex-col p-5">
            <div className="text-lg font-black">
              {tipsData.latestTips.title}
            </div>
            <div className="mb-5 flex">
              <div className="mb-1 mr-10 flex items-center gap-x-1 text-xs sm:text-sm">
                <CalendarDays className="size-5" />
                <span>{formatDateToWords(tipsData.latestTips.date)}</span>
              </div>
              <div className="text-xs italic sm:text-sm">
                <span>
                  {tipsData.latestTips.tags.join(" / ").replace(/,/g, "/,")}
                </span>
              </div>
            </div>
            <div className="h-full">{tipsData.latestTips.description}</div>
            <div className="mt-5 flex gap-x-2 md:mt-0 md:self-end">
              <ReadMore id={tipsData.latestTips._id.buffer.toString("hex")} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
