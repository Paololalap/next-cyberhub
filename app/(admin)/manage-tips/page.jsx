import React, { Suspense } from "react";
import AddEntry from "@/components/button/AddEntry";
import GetDataTips from "./_get-data";
import LoadingSkeleton from "@/components/LoadingSkeleton";

export default function TipsPage({ searchParams }) {
  return (
    <div className="flex min-h-screen w-screen flex-col bg-[#f7f7e3] px-3">
      <div className="mt-5 text-center text-3xl font-black">Manage Tips</div>
      <hr className="mx-auto mt-3 w-64 border-2 border-solid border-[#FFB61B]" />
      <AddEntry>Add Tips Entry</AddEntry>
      <Suspense fallback={<LoadingSkeleton />}>
        <GetDataTips searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
