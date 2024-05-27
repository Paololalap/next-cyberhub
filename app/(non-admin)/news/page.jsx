import { AspectRatio } from "@/components/ui/aspect-ratio";
import { CalendarDays } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { connectToDatabase } from "@/lib/connectMongo";
import formatDateToWords from "@/constants/DATE_TO_WORDS";
import DefaultImage from "@/public/default-image-news.jpg";
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
import SearchBar from "@/components/SearchBar";

async function getData(searchQuery, perPage, pageNumber, selectedTags) {
  const client = await connectToDatabase();
  const db = client.db("CyberDB");

  const tagQuery =
    selectedTags.length > 0 ? { tags: { $in: selectedTags } } : {};

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
      tagQuery,
    ],
  };

  const items = await db
    .collection("contents")
    .find(query)
    .sort({ createdAt: -1 })
    .skip(perPage * (pageNumber - 1))
    .limit(perPage)
    .toArray();

  const itemCount = await db.collection("contents").countDocuments(query);

  return { items, itemCount };
}

async function getTags() {
  const client = await connectToDatabase();
  const db = client.db("CyberDB");
  return db.collection("contents").distinct("tags", { type: "News" });
}

export default async function NewsPage({ searchParams }) {
  const searchQuery = searchParams.q || "";
  const page = parseInt(searchParams.page, 10) || 1;
  const perPage = 8;
  const selectedTags = searchParams.tags ? searchParams.tags.split(",") : [];

  const data = await getData(searchQuery, perPage, page, selectedTags);
  const tags = await getTags();

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
      <div className="mt-5 break-all text-center text-3xl font-black">
        News and Updates
      </div>
      <hr className="mx-auto mt-3 w-screen max-w-64 border-2 border-solid border-[#FFB61B]" />
      <div className="flex flex-col items-center justify-center">
        <SearchBar tags={tags} /> {/* Pass tags as a prop */}
      </div>
      <div className="mx-auto mb-2 w-screen max-w-[75rem] px-3">
        {page === 1 && data.latestNews && (
          <div
            key={data.latestNews._id}
            className="group mt-2 grid grid-cols-1 overflow-hidden rounded-md border-2 border-solid border-[#00563F] bg-white first:mt-0 md:grid-cols-12"
          >
            <Link
              href={`/article/${data.latestNews._id}`}
              className="relative col-span-5 overflow-hidden"
            >
              <AspectRatio ratio={16 / 9}>
                <Image
                  className="object-cover object-top md:hover:object-contain md:hover:object-center"
                  src={
                    data.latestNews.imageL
                      ? data.latestNews.imageL
                      : DefaultImage
                  }
                  alt={data.latestNews.title}
                  fill
                  sizes="(min-width: 680px) 640px, calc(94.44vw + 17px)"
                  placeholder="blur"
                  blurDataURL={data.latestNews.imageL}
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
                  blurDataURL={item.imageL}
                  placeholder="blur"
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
          <div className="h-screen">No results...</div>
        ) : (
          <Pagination className={"my-3"}>
            <PaginationContent className="flex-wrap">
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
