import LoadingSkeleton from "@/components/loading-skeleton/LoadingSkeleton";
import { Suspense } from "react";
import GetData from "./_get-data";

export default function NewsPage({ searchParams }) {
  return (
    <div className="mx-auto flex min-h-screen w-fit flex-col">
      <div className="mt-5 text-center text-3xl font-black">
        News and Updates
      </div>
      <hr className="mx-auto mb-5 mt-3 w-64 border-2 border-solid border-[#FFB61B]" />
      <Suspense fallback={<LoadingSkeleton />}>
        <GetData searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
