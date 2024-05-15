import { connectToDatabase } from "@/lib/connectMongo";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Image from "next/image";
import RemoveBtn from "@/components/Removebtn";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function getData(perPage, pageNumber) {
  try {
    const client = await connectToDatabase();
    const db = client.db("CyberDB");

    const items = await db
      .collection("contents")
      .find({ type: "News" })
      .sort({ createdAt: -1 })
      .skip(perPage * (pageNumber - 1))
      .limit(perPage)
      .toArray();

    const itemCount = await db.collection("contents").countDocuments({});

    const response = { items, itemCount };
    return response;
  } catch (error) {
    throw new Error("Failed to fetch data. Please try again later.");
  }
}

export default async function GetData({ searchParams }) {
  let page = parseInt(searchParams.page, 10);
  page = !page || page < 1 ? 1 : page;
  const perPage = 8;
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
    <div className="mx-auto my-5 w-full max-w-[75rem]">
      {data.items.map((item) => (
        <div
          key={item._id}
          className="group mt-2 grid grid-cols-1 rounded-md border-2 border-solid border-[#00563F] bg-white first:mt-0 md:grid-cols-12"
        >
          <div className="relative col-span-5 overflow-hidden">
            <AspectRatio ratio={16 / 9}>
              <Image
                className="rounded-md object-contain transition-all md:hover:scale-110"
                src={item.imageL}
                alt={item.title}
                sizes="(min-width: 680px) 640px, calc(94.44vw + 17px)"
                fill
              />
            </AspectRatio>
          </div>
          <div className="col-span-7 flex flex-col p-5">
            <div className="text-lg font-black">{item.title}</div>
            <div className="mb-5 flex">
              <div className="mb-1 mr-10 flex items-center gap-x-1 text-xs sm:text-sm">
                <CalendarDays className="size-5" />
                <span>{item.date}</span>
              </div>
              <div className="text-xs italic sm:text-sm">
                <span>{item.tags.join(" / ").replace(/,/g, "/,")}</span>
              </div>
            </div>
            <div className="h-full">{item.description}</div>
            <div className="mt-5 flex gap-x-2 md:mt-0 md:self-end">
              <Link href={`/edit-content/${item._id}`} tabIndex={-1}>
                <Button
                  aria-label="update button"
                  className="bg-[#8a1438] hover:bg-[#8a1438]/90"
                >
                  Update
                </Button>
              </Link>
              <RemoveBtn
                id={item._id.buffer.toString("hex")}
                className={"border-2 border-[#8a1438]"}
              />
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
              {pageNumbers.map((pageNumber, index) => (
                <PaginationLink key={index} href={`?page=${pageNumber}`}>
                  {pageNumber}
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
                  aria-label="Next Page"
                />
              )}
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
