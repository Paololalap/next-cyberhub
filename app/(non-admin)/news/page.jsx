import LoadingSkeleton from "@/components/LoadingSkeleton";
import { Suspense } from "react";
import GetData from "./_get-data";

export default function NewsPage({ searchParams }) {
  return (
    <div className="flex min-h-screen w-fit flex-col mx-auto">
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
