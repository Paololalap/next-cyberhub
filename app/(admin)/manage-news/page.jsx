import SearchBar from "@/components/SearchBar";
import AddEntry from "@/components/button/AddEntry";
import Remove from "@/components/button/Remove";
import UpdateButton from "@/components/button/Update";
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
import DefaultImage from '@/public/default-image-news.jpg';
import { CalendarDays } from "lucide-react";
import Image from "next/image";

async function getData(searchQuery, perPage, pageNumber) {
  try {
    // DB Connect
    const client = await connectToDatabase();
    const db = client.db("CyberDB");

    const query = {
      $and: [
        { type: "News" },
        searchQuery
          ? {
              $or: [
                { title: { $regex: searchQuery, $options: "i" } },
                { description: { $regex: searchQuery, $options: "i" } },
                { body: { $regex: searchQuery, $options: "i" } },
                { author: { $regex: searchQuery, $options: "i" } },
                { tags: { $regex: searchQuery, $options: "i" } },
              ],
            }
          : {},
      ],
    };

    // DB Query
    const items = await db
      .collection("contents")
      .find(query)
      .sort({ createdAt: -1 })
      .skip(perPage * (pageNumber - 1))
      .limit(perPage)
      .toArray();

    const itemCount = await db.collection("contents").countDocuments(query);

    return { items, itemCount };
  } catch (error) {
    throw new Error("Failed to fetch data. Please try again later.");
  }
}

export default async function NewsPage({ searchParams }) {
  const searchQuery = searchParams.q || "";
  let page = parseInt(searchParams.page, 10);
  page = !page || page < 1 ? 1 : page;
  const perPage = 8;
  const data = await getData(searchQuery, perPage, page);

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
    <div className="flex min-h-screen w-screen flex-col bg-[#f7f7e3]">
      <div className="mt-5 text-center text-3xl font-black">
        Manage News and Updates
      </div>
      <hr className="mx-auto mt-3 w-64 border-2 border-solid border-[#FFB61B]" />
      <div className="flex flex-col items-center justify-center">
        <SearchBar /> {/* Include SearchBar component */}
      </div>
      <AddEntry>Add News Entry</AddEntry>
      <div className="mx-auto my-5 w-full max-w-[75rem] px-3">
        {data.items.map((item) => (
          <div
            key={item._id}
            className="group mt-2 grid grid-cols-1 overflow-hidden rounded-md border-2 border-solid border-[#00563F] bg-white first:mt-0 md:grid-cols-12"
          >
            <div className="relative col-span-5 overflow-hidden">
              <AspectRatio ratio={16 / 9}>
                <Image
                  className="object-cover object-top transition-all md:hover:object-contain"
                  src={item.imageL ? item.imageL : DefaultImage}
                  alt={item.title}
                  sizes="(min-width: 680px) 640px, calc(94.44vw + 17px)"
                  fill
                  blurDataURL={item.imageL}
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
                <UpdateButton id={item._id.buffer.toString("hex")} />
                <Remove
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
                    aria-label="Next Page"
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
