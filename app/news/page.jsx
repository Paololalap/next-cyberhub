import React from "react";
import Headline from "@/components/Headline";
import { connectToDatabase } from "@/libs/connectMongo";
import Link from "next/link";
import Image from "next/image";
async function getData(perPage, p) {
  try {
    // DB Connect
    const client = await connectToDatabase();
    const db = client.db("CyberDB");

    // DB Query
    
   const latestN = await db
     .collection("contents")
     .findOne({ type: "News" }, { sort: { createdAt: -1 } });

   const items = await db
     .collection("contents")
     .find({
       type: "News",
       _id: { $ne: latestN._id }, // Exclude the latest news item by its _id
       createdAt: { $ne: latestN.createdAt },
     })
     .sort({ createdAt: -1 })
     .skip(perPage * (p - 1))
     .limit(perPage)
     .toArray();

    const itemCount = await db.collection("contents").countDocuments({});

    const respnse = { items, itemCount };
    return respnse;
  } catch (error) {
    throw new Error("Failed to fetch data. Please try again later.");
  }
}

export default async function Newspage({ searchParams }) {
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
    <div id="page" className="bg-[#f7f7e3]  h-max items-center">
      <div
        id="news-container"
        className="items-center bg-transparent flex-col justify-center   "
      >
        <div
          id="news-container-title"
          className="text-[#6e102c] text-center text-2xl font-semibold p-5 flex-col justify-center items-center"
        >
          <span>News and Updates</span>
          <hr className="border-2 border-solid border-[#FFB61B]  w-64 mx-auto" />
        </div>
        {page === 1 ? (
          <div id="headline-wrapper" className="mb-5">
            <Headline></Headline>
          </div>
        ) : (
          <div id="headline-wrapper" className="mb-5 hidden">
            <Headline></Headline>
          </div>
        )}
      </div>
      <div
        id="pagination-wrapper"
        className=" flex flex-col justify-center items-center sm:mx-52  my-5"
      >
        {data.items.map((item) => (
          <div key={item._id} className="mb-1">
            <Link href={item.link} target="_blank">
              <div
                id="feed-container"
                className="group flex flex-row max-h-56 overflow-hidden bg-white border-2 border-solid border-[#00563F] rounded-md sm:flex sm:flex-row sm:max-h-56"
              >
                <div
                  id="feed-image"
                  className="hover:scale-[1.03] transition-all w-2/5 sm:py-0 py-10"
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
                  className="flex flex-col sm:flex sm:flex-col justify-between p-5 w-3/5 sm:p-5"
                >
                  <div className="sm:flex sm:flex-col">
                    <div
                      id="feed-title"
                      className="group-hover:underline sm:text-sm text-sm font-bold text-gray-500"
                    >
                      {item.title}
                    </div>
                    <div className="mb-5">
                      <div
                        id="feed-date"
                        className="sm:text-sm text-xs mr-10 mb-1"
                      >
                        <span>{item.date}</span>
                      </div>
                      <div id="feed-tags" className="sm:text-sm text-xs">
                        <span>{item.tags.join(" / ").replace(/,/g, "/,")}</span>
                      </div>
                    </div>
                    <div id="feed-description" className="sm:text-sm text-xs">
                      <span>{item.description}</span>
                    </div>
                  </div>
                  <div
                    id="feed-readmore"
                    className="sm:text-sm text-xs flex flex-row-reverse"
                  >
                    <span>Read more</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}

        {isPageOutOfRange ? (
          <div>No more pages...</div>
        ) : (
          <div className="flex justify-center items-center mt-16">
            <div className="flex border-[1px] gap-4 rounded-[10px] border-light-green p-4">
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
                      ? "bg-[#00563f] fw-bold px-2 rounded-md text-[#FFB61B]"
                      : "hover:bg-[#00563f] px-1 rounded-md"
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
};

