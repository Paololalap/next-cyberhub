import React, { Suspense } from "react";
import GetData from "./_get-data";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import AddNewsEntry from "@/components/button/AddNewsEntry";

export default async function NewsPage({ searchParams }) {
  return (
    <div className="flex min-h-screen w-screen flex-col bg-[#f7f7e3] px-3">
      <div className="mt-5 text-center text-3xl font-black">Manage News</div>
      <hr className="mx-auto mt-3 w-64 border-2 border-solid border-[#FFB61B]" />
      <AddNewsEntry />

      <Suspense fallback={<LoadingSkeleton />}>
        <GetData searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
