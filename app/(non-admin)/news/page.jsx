import React from "react";
import { connectToDatabase } from "@/lib/connectMongo";
import Link from "next/link";
import Image from "next/image";
import formatDateToWords from "@/constants/DATE_TO_WORDS";

async function getData(perPage, pageNumber) {
  try {
    // DB Connect
    const client = await connectToDatabase();
    const db = client.db("CyberDB");

    // DB Query

    const latestNews = await db
      .collection("contents")
      .findOne({ type: "News" }, { sort: { createdAt: -1 } });

    const items = await db
      .collection("contents")
      .find({
        type: "News",
        _id: { $ne: latestNews._id }, // Exclude the latest news item by its _id
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

export default async function Newspage({ searchParams }) {
  let page = parseInt(searchParams.page, 10);
  page = !page || page < 1 ? 1 : page;
  const perPage = 10;

  let data;
  if (page === 2) {
    data = await getData(perPage, page);
  } else {
    data = await getData(perPage, page);
  }

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
    <div id="page" className="h-max items-center bg-[#f7f7e3]">
      <div
        id="news-container"
        className="flex-col items-center justify-center bg-transparent"
      >
        <div
          id="news-container-title"
          className="flex-col items-center justify-center p-5 text-center text-2xl font-semibold text-[#6e102c]"
        >
          <span>News and Updates</span>
          <hr className="mx-auto w-64 border-2  border-solid border-[#FFB61B]" />
        </div>
        {page === 1 && data.latestNews && (
          <div key={data.latestNews._id} className="sm:mx-60">
            <Link href={`/article/${data.latestNews._id}`}>
              <div
                id="headline-container"
                className="group overflow-hidden rounded-md border-2 border-solid border-[#00563F] bg-white p-1 sm:flex sm:flex-row"
              >
                <div
                  id="headline-image"
                  className="transition-all hover:scale-[1.03] sm:w-3/5"
                >
                  <Image
                    className="rounded-md"
                    src={data.latestNews.imageL}
                    alt="/"
                    width={640}
                    height={334}
                    sizes="(min-width: 680px) 640px, calc(94.44vw + 17px)"
                  />
                </div>
                <div
                  id="headline-content"
                  className="flex flex-col justify-between p-5 sm:w-2/5 sm:p-5"
                >
                  <div className="flex flex-col">
                    <div
                      id="headline-title"
                      className="font-bold text-gray-500 group-hover:underline"
                    >
                      {data.latestNews.title}
                    </div>
                    <div className="mb-5 flex flex-row">
                      <div id="headline-date" className="mr-10 text-sm">
                        <span>{formatDateToWords(data.latestNews.date)}</span>
                      </div>
                      <div id="headline-tags" className="text-sm">
                        <span>
                          {data.latestNews.tags.join(" / ").replace(/,/g, "/,")}
                        </span>
                      </div>
                    </div>
                    <div id="headline-description">
                      <span>{data.latestNews.description}</span>
                    </div>
                  </div>
                  <div id="readmore" className="flex flex-row-reverse">
                    <span>Read more</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}
      </div>
      <div
        id="pagination-wrapper"
        className=" mt-5 flex flex-col items-center justify-center sm:mx-60"
      >
        {data.items.map((item) => (
          <div key={item._id} className="mb-1">
            <Link href={`/article/${item._id}`}>
              <div
                id="feed-container"
                className="group flex max-h-56 flex-row overflow-hidden rounded-md border-2 border-solid border-[#00563F] bg-white sm:flex sm:max-h-56 sm:flex-row"
              >
                <div
                  id="feed-image"
                  className="w-2/5 py-10 transition-all hover:scale-[1.03] sm:py-0"
                >
                  <Image
                    className="rounded-md"
                    src={item.imageL}
                    alt="/"
                    width={640}
                    height={334}
                    sizes="(min-width: 680px) 640px, calc(94.44vw + 17px)"
                  />
                </div>
                <div
                  id="feed-content"
                  className="flex w-3/5 flex-col justify-between p-5 sm:flex sm:flex-col sm:p-5"
                >
                  <div className="sm:flex sm:flex-col">
                    <div
                      id="feed-title"
                      className="text-sm font-bold text-gray-500 group-hover:underline sm:text-sm"
                    >
                      {item.title}
                    </div>
                    <div className="mb-5">
                      <div
                        id="feed-date"
                        className="mb-1 mr-10 text-xs sm:text-sm"
                      >
                        <span>{formatDateToWords(item.date)}</span>
                      </div>
                      <div id="feed-tags" className="text-xs sm:text-sm">
                        <span>{item.tags.join(" / ").replace(/,/g, "/,")}</span>
                      </div>
                    </div>
                    <div id="feed-description" className="text-xs sm:text-sm">
                      <span>{item.description}</span>
                    </div>
                  </div>
                  <div
                    id="feed-readmore"
                    className="flex flex-row-reverse text-xs sm:text-sm"
                  >
                    <span>Read more</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}

        {isPageOutOfRange ? (
          <div className="h-screen">No more pages...</div>
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
                      ? "fw-bold rounded-md bg-[#00563f] px-2 text-[#FFB61B]"
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
