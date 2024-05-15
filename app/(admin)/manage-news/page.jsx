import React, { Suspense } from "react";
import GetDataManageNews from "./_get-data";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import AddEntry from "@/components/button/AddEntry";

export default function NewsPage({ searchParams }) {
  return (
    <div className="flex min-h-screen w-screen flex-col bg-[#f7f7e3] px-3">
      <div className="mt-5 text-center text-3xl font-black">Manage News</div>
      <hr className="mx-auto mt-3 w-64 border-2 border-solid border-[#FFB61B]" />
      <AddEntry>Add News Entry</AddEntry>

      <Suspense fallback={<LoadingSkeleton />}>
        <GetDataManageNews searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
