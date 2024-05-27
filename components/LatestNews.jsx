import Link from "next/link";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { CalendarDays } from "lucide-react";
import ReadMore from "@/components/button/ReadMore";
import DefaultNewsImage from "@/public/default-image-news.jpg";
import { connectToDatabase } from "@/lib/connectMongo";
import formatDateToWords from "@/constants/DATE_TO_WORDS";

async function getLatestNews() {
  try {
    const client = await connectToDatabase();
    const db = client.db("CyberDB");

    const latestNews = await db
      .collection("contents")
      .findOne({ type: "News" }, { sort: { createdAt: -1 } });

    const items = await db
      .collection("contents")
      .find({
        type: "News",
        _id: { $ne: latestNews._id },
        createdAt: { $ne: latestNews.createdAt },
      })
      .sort({ createdAt: -1 })
      .toArray();

    const response = { latestNews, items };
    return response;
  } catch (error) {
    throw new Error("Failed to fetch data. Please try again later.");
  }
}

export default async function LatestNews() {
  const newsData = await getLatestNews();
  return (
    <div className="mx-auto my-5 w-screen max-w-[75rem] px-3">
      <div className="break-all text-center text-3xl font-black">
        Latest News
      </div>
      <hr className="mx-auto mb-5 mt-3 w-screen max-w-64 border-2 border-solid border-[#FFB61B]" />
      {newsData.latestNews && (
        <div
          key={newsData.latestNews._id}
          className="group mt-2 grid grid-cols-1 overflow-hidden rounded-md border-2 border-solid border-[#00563F] bg-white first:mt-0"
        >
          <Link
            href={`/article/${newsData.latestNews._id}`}
            className="relative overflow-hidden"
          >
            <AspectRatio ratio={16 / 9}>
              <Image
                className="object-cover object-top md:hover:object-contain md:hover:object-center"
                src={
                  newsData.latestNews.imageL
                    ? newsData.latestNews.imageL
                    : DefaultNewsImage
                }
                alt={newsData.latestNews.title}
                fill
                sizes="(min-width: 680px) 640px, calc(94.44vw + 17px)"
                placeholder="blur"
                blurDataURL={newsData.latestNews.imageL}
              />
            </AspectRatio>
          </Link>

          <div className="flex flex-col p-5">
            <div className="text-lg font-black">
              {newsData.latestNews.title}
            </div>
            <div className="mb-5 flex">
              <div className="mb-1 mr-10 flex items-center gap-x-1 text-xs sm:text-sm">
                <CalendarDays className="size-5" />
                <span>{formatDateToWords(newsData.latestNews.date)}</span>
              </div>
              <div className="text-xs italic sm:text-sm">
                <span>
                  {newsData.latestNews.tags.join(" / ").replace(/,/g, "/,")}
                </span>
              </div>
            </div>
            <div className="h-full">{newsData.latestNews.description}</div>
            <div className="mt-5 flex gap-x-2 md:mt-0 md:self-end">
              <ReadMore id={newsData.latestNews._id.buffer.toString("hex")} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
