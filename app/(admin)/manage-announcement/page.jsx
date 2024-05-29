import AddAnnouncementButton from "@/components/button/AddAnnouncement";
import Remove from "@/components/button/RemoveAnnouncement";
import UpdateButton from "@/components/button/UpdateAnnouncement";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import formatDateToWords from "@/constants/DATE_TO_WORDS";
import { connectToDatabase } from "@/lib/connectMongo";
import { CalendarDays } from "lucide-react";

async function getData(perPage, pageNumber) {
  try {
    // DB Connect
    const client = await connectToDatabase();
    const db = client.db(`${process.env.NEXT_PUBLIC_DB}`);

    // DB Query
    const items = await db
      .collection("announces")
      .find({})
      .sort({ startDate: -1 })
      .skip(perPage * (pageNumber - 1))
      .limit(perPage)
      .toArray();

    const itemCount = await db.collection("announces").countDocuments({});

    const response = { items, itemCount };
    return response;
  } catch (error) {
    throw new Error("Failed to fetch data. Please try again later.");
  }
}

export default async function AnnouncementsPage({ searchParams }) {
  let page = parseInt(searchParams.page, 10);
  page = !page || page < 1 ? 1 : page;
  const perPage = 9;
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
    <div className="flex w-screen flex-col bg-[#f7f7e3]">
      <div className="mt-5 text-center text-3xl font-black">
        Manage Announcements
      </div>
      <hr className="mx-auto mt-3 w-64 border-2 border-solid border-[#FFB61B]" />
      <AddAnnouncementButton />

      <div className="mx-auto my-5">
        <div className="grid max-w-[75rem] grid-cols-1 gap-5 md:grid-cols-12">
          {data.items.map((item) => (
            <div
              key={item._id}
              className="rounded-md border-2 border-solid border-[#00563F] bg-white md:col-span-6 lg:col-span-4"
            >
              <div className="flex h-full flex-col justify-between p-5">
                <div className="text-lg font-black">{item.title}</div>
                <div className="mb-5 flex">
                  <div className="mb-1 mr-10 flex items-center gap-x-1 text-xs sm:text-sm">
                    <CalendarDays className="size-5" />
                    <span>
                      {formatDateToWords(item.startDate)} to{" "}
                      {formatDateToWords(item.endDate)}
                    </span>
                  </div>
                </div>
                <div className="h-full text-xs sm:text-sm">{item.content}</div>
                <div className="mt-5 flex gap-x-2 md:mt-0 md:self-end">
                  <UpdateButton id={item._id.buffer.toString("hex")} />
                  <Remove id={item._id.buffer.toString("hex")} />
                </div>
              </div>
            </div>
          ))}
        </div>

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
