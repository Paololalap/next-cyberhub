import React from "react";
import { connectToDatabase } from "@/lib/connectMongo";
import Link from "next/link";
import Image from "next/image";
import RemoveBtn from "@/components/Removebtn";
async function getData(perPage, pageNumber) {
  try {
    // DB Connect
    const client = await connectToDatabase();
    const db = client.db("CyberDB");

    // DB Query
    const items = await db
      .collection("contents")
      .find({ type: "Tips" })
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

export default async function TipsPage({ searchParams }) {
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
    <div className="h-max items-center bg-[#f7f7e3]">
      <div className="flex-col items-center justify-center bg-transparent">
        <div className="flex-col items-center justify-center p-5 text-center text-2xl font-semibold text-[#6e102c]">
          <span>Manage Tips</span>
          <hr className="mx-auto w-64 border-2  border-solid border-[#FFB61B]" />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <Link
          href={"/add-content"}
          className="rounded-md border-2 border-solid border-[#00563F] p-2"
        >
          Add Tips Entry
        </Link>
      </div>
      <div className="my-5 flex flex-col items-center justify-center sm:mx-80">
        {data.items.map((item) => (
          <div key={item._id} className="mb-1">
            <div className="group flex max-h-56 flex-row overflow-hidden rounded-md border-2 border-solid border-[#00563F] bg-white sm:flex sm:max-h-56 sm:flex-row">
              <div className="w-2/5 py-10 transition-all hover:scale-[1.03] sm:py-5">
                <Image
                  className="rounded-md"
                  src={item.imageL}
                  alt="/"
                  width={640}
                  height={334}
                  sizes="(min-width: 680px) 640px, calc(94.44vw + 17px)"
                  priority
                />
              </div>
              <div className="flex w-3/5 flex-col justify-between p-5 sm:flex sm:flex-col sm:p-5">
                <div className="sm:flex sm:flex-col">
                  <div className="text-sm font-bold text-gray-500 group-hover:underline sm:text-sm">
                    {item.title}
                  </div>
                  <div className="mb-5">
                    <div className="mb-1 mr-10 text-xs sm:text-sm">
                      <span>{item.date}</span>
                    </div>
                    <div className="text-xs sm:text-sm">
                      <span>{item.tags.join(" / ").replace(/,/g, "/,")}</span>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm">
                    <span>{item.description}</span>
                  </div>
                </div>
                <div className="flex flex-row-reverse text-xs sm:text-sm">
                  <Link
                    href={`/edit-content/${item._id}`}
                    className="mx-1 rounded-md border-2 border-solid border-[#00563F] p-2"
                  >
                    Update
                  </Link>
                  <RemoveBtn id={item._id.buffer.toString("hex")} />
                </div>
              </div>
            </div>
          </div>
        ))}

        {isPageOutOfRange ? (
          <div>No more pages...</div>
        ) : (
          <div className="mt-16 flex items-center justify-center">
            <div className="border-light-green flex gap-4 rounded-[10px] border-[1px] p-4">
              {page === 1 ? (
                <div className="opacity-60" aria-disabled="true">
                  Previous
                </div>
              ) : (
                <Link href={`?page=${prevPage}`} aria-label="Previous Page">
                  Previous
                </Link>
              )}

              {pageNumbers.map((pageNumber, index) => (
                <Link
                  key={index}
                  className={
                    page === pageNumber
                      ? "rounded-md bg-[#00563f] px-2 text-[#FFB61B]"
                      : "rounded-md px-1 hover:bg-[#00563f]"
                  }
                  href={`?page=${pageNumber}`}
                >
                  {pageNumber}
                </Link>
              ))}

              {page === totalPages ? (
                <div className="opacity-60" aria-disabled="true">
                  Next
                </div>
              ) : (
                <Link href={`?page=${nextPage}`} aria-label="Next Page">
                  Next
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}