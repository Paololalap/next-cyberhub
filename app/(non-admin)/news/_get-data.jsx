import { AspectRatio } from "@/components/ui/aspect-ratio";
import { CalendarDays } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { connectToDatabase } from "@/lib/connectMongo";
import formatDateToWords from "@/constants/DATE_TO_WORDS";
import ReadMore from "@/components/button/ReadMore";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

async function getData(perPage, pageNumber) {
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
      .skip(perPage * (pageNumber - 1))
      .limit(perPage)
      .toArray();

    const itemCount = await db
      .collection("contents")
      .countDocuments({ type: "News" });

    const response = { items, latestNews, itemCount };
    return response;
  } catch (error) {
    throw new Error("Failed to fetch data. Please try again later.");
  }
}

export default async function GetData({ searchParams }) {
  let pageNumber = parseInt(searchParams.pageNumber, 10);
  pageNumber = !pageNumber || pageNumber < 1 ? 1 : pageNumber;
  const perPage = 10;

  let data = await getData(perPage, pageNumber);

  const totalPages = Math.ceil(data.itemCount / perPage);

  const prevPage = pageNumber - 1 > 0 ? pageNumber - 1 : 1;
  const nextPage = pageNumber + 1;
  const isPageOutOfRange = pageNumber > totalPages;

  const pageNumbers = [];
  const offsetNumber = 3;
  for (let i = pageNumber - offsetNumber; i <= pageNumber + offsetNumber; i++) {
    if (i >= 1 && i <= totalPages) {
      pageNumbers.push(i);
    }
  }
  return (
    <>
      <div className="mx-auto mb-2 w-full max-w-[75rem]">
        {pageNumber === 1 && data.latestNews && (
          <div
            key={data.latestNews._id}
            className="group mt-2 grid grid-cols-1 rounded-md border-2 border-solid border-[#00563F] bg-white first:mt-0 md:grid-cols-12"
          >
            <Link
              href={`/article/${data.latestNews._id}`}
              className="relative col-span-5 overflow-hidden bg-white"
            >
              <AspectRatio ratio={16 / 9}>
                <Image
                  className="object-contain transition-all md:hover:scale-110"
                  src={data.latestNews.imageL}
                  alt={data.latestNews.title}
                  fill
                  sizes="(min-width: 680px) 640px, calc(94.44vw + 17px)"
                />
              </AspectRatio>
            </Link>

            <div className="col-span-7 flex flex-col p-5">
              <div className="text-lg font-black">{data.latestNews.title}</div>
              <div className="mb-5 flex">
                <div className="mb-1 mr-10 flex items-center gap-x-1 text-xs sm:text-sm">
                  <CalendarDays className="size-5" />
                  <span>{formatDateToWords(data.latestNews.date)}</span>
                </div>
                <div className="text-xs italic sm:text-sm">
                  <span>
                    {data.latestNews.tags.join(" / ").replace(/,/g, "/,")}
                  </span>
                </div>
              </div>
              <div className="h-full">{data.latestNews.description}</div>
              <div className="mt-5 flex gap-x-2 md:mt-0 md:self-end">
                <ReadMore id={data.latestNews._id.buffer.toString("hex")} />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="mx-auto w-full max-w-[75rem]">
        {data.items.map((item) => (
          <div
            key={item._id}
            className="group mt-2 grid grid-cols-1 rounded-md border-2 border-solid border-[#00563F] bg-white first:mt-0 md:grid-cols-12"
          >
            <Link
              href={`/article/${item._id}`}
              className="relative col-span-5 overflow-hidden bg-white"
            >
              <AspectRatio ratio={16 / 9}>
                <Image
                  className="object-contain transition-all md:hover:scale-110"
                  src={item.imageL}
                  alt={item.title}
                  fill
                  sizes="(min-width: 680px) 640px, calc(94.44vw + 17px)"
                />
              </AspectRatio>
            </Link>

            <div className="col-span-7 flex flex-col p-5">
              <div className="text-lg font-black">{item.title}</div>
              <div className="mb-5 flex">
                <div className="mb-1 mr-10 flex items-center gap-x-1 text-xs sm:text-sm">
                  <CalendarDays className="size-5" />
                  <span>{formatDateToWords(item.date)}</span>
                </div>
                <div className="text-xs italic sm:text-sm">
                  <span>{item.tags.join(" / ").replace(/,/g, "/,")}</span>
                </div>
              </div>
              <div className="h-full">{item.description}</div>
              <div className="mt-5 flex gap-x-2 md:mt-0 md:self-end">
                <ReadMore id={item._id.buffer.toString("hex")} />
              </div>
            </div>
          </div>
        ))}

        {isPageOutOfRange ? (
          <div className="h-screen">No more pages...</div>
        ) : (
          <Pagination className={"mt-3"}>
            <PaginationContent>
              <PaginationItem>
                {pageNumber === 1 ? (
                  <PaginationPrevious className="pointer-events-none opacity-70" />
                ) : (
                  <PaginationPrevious href={`?pageNumber=${prevPage}`} />
                )}
              </PaginationItem>
              <PaginationItem>
                {pageNumbers.map((pageNumber, index) => (
                  <PaginationLink
                    key={index}
                    href={`?pageNumber=${pageNumber}`}
                  >
                    {pageNumber}
                  </PaginationLink>
                ))}
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                {pageNumber === totalPages ? (
                  <PaginationNext
                    className="pointer-events-none opacity-70"
                    aria-disabled="true"
                  />
                ) : (
                  <PaginationNext
                    href={`?pageNumber=${nextPage}`}
                    aria-label="Next PageNumber"
                  />
                )}
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </>
  );
}
