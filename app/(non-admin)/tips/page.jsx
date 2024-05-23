import Link from "next/link";
import Image from "next/image";
import formatDateToWords from "@/constants/DATE_TO_WORDS";
import ReadMore from "@/components/button/ReadMore";
import DefaultImage from "@/public/default-image-tips.jpg";
import { CalendarDays } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { connectToDatabase } from "@/lib/connectMongo";

async function getData(perPage, pageNumber) {
  try {
    const client = await connectToDatabase();
    const db = client.db("CyberDB");

    const items = await db
      .collection("contents")
      .find({
        type: "Tips",
      })
      .sort({ createdAt: -1 })
      .skip(perPage * (pageNumber - 1))
      .limit(perPage)
      .toArray();

    const itemCount = await db
      .collection("contents")
      .countDocuments({ type: "Tips" });

    const response = { items, itemCount };
    return response;
  } catch (error) {
    throw new Error("Failed to fetch data. Please try again later.");
  }
}

export default async function TipsPage({ searchParams }) {
  let page = parseInt(searchParams.page, 10);
  page = !page || page < 1 ? 1 : page;
  const perPage = 10;
  const data = await getData(perPage, page);

  const totalPages = Math.ceil(data.itemCount / perPage);

  const prevPage = page - 1 > 0 ? page - 1 : 1;
  const nextPage = page + 1;
  const isPageOutOfRange = page > totalPages;

  const pageNumbers = [];
  const offsetNumber = 3;
  for (let i = page - offsetNumber; i <= page + offsetNumber; i++) {
    if (i >= 1 && i <= totalPages) {
      pageNumbers.push(i);
    }
  }
  return (
    <div className="mx-auto flex min-h-screen w-fit flex-col">
      <div className="mt-5 text-center text-3xl font-black">
        Tips and Guides
      </div>
      <hr className="mx-auto mb-5 mt-3 w-64 border-2 border-solid border-[#FFB61B]" />
      <div className="mx-auto w-screen max-w-[75rem] px-3">
        {data.items.map((item) => (
          <div
            key={item._id}
            className="group mt-2 grid grid-cols-1 overflow-hidden rounded-md border-2 border-solid border-[#00563F] bg-white first:mt-0 md:grid-cols-12"
          >
            <Link
              href={`/article/${item._id}`}
              className="relative col-span-5 overflow-hidden bg-white"
            >
              <AspectRatio ratio={16 / 9}>
                <Image
                  className="object-cover object-top md:hover:object-contain md:hover:object-center"
                  src={item.imageL ? item.imageL : DefaultImage}
                  alt={item.title}
                  fill
                  sizes="(min-width: 680px) 640px, calc(94.44vw + 17px)"
                  placeholder="blur"
                  blurDataURL={item.imageL}
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
          <div>No more pages...</div>
        ) : (
          <Pagination className={"mt-3"}>
            <PaginationContent>
              <PaginationItem>
                {page === 1 ? (
                  <PaginationPrevious className="pointer-events-none opacity-70" />
                ) : (
                  <PaginationPrevious href={`?page=${prevPage}`} />
                )}
              </PaginationItem>
              <PaginationItem>
                {pageNumbers.map((page, index) => (
                  <PaginationLink key={index} href={`?page=${page}`}>
                    {page}
                  </PaginationLink>
                ))}
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                {page === totalPages ? (
                  <PaginationNext
                    className="pointer-events-none opacity-70"
                    aria-disabled="true"
                  />
                ) : (
                  <PaginationNext
                    href={`?page=${nextPage}`}
                    aria-label="Next PageNumber"
                  />
                )}
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
}
