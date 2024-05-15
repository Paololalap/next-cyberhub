import React, { Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import GetData from "./_get-data";
import LoadingSkeleton from "@/components/LoadingSkeleton";

export default async function NewsPage({ searchParams }) {
  return (
    <div className="flex min-h-screen w-screen flex-col bg-[#f7f7e3] px-3">
      <div className="mt-5 text-center text-3xl font-black">Manage News</div>
      <hr className="mx-auto mt-3 w-64 border-2 border-solid border-[#FFB61B]" />
      <Link href={"/add-content"} tabIndex={-1} className="mx-auto mt-5">
        <Button
          className="bg-[#8a1438] hover:bg-[#8a1438]/90"
          aria-label="add news button"
        >
          Add News Entry
        </Button>
      </Link>

      <Suspense fallback={<LoadingSkeleton />}>
        <GetData searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
