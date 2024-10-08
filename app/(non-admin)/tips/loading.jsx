import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex min-h-screen w-screen flex-col bg-[#f7f7e3]">
      <div className="mt-5 break-all text-center text-3xl font-black">
        Tips and Guides
      </div>
      <hr className="mx-auto mt-3 w-64 border-2 border-solid border-[#FFB61B]" />
      <div className="flex flex-col items-center justify-center">
        <Skeleton className="mt-[20px] h-[56px] w-[448px]" />
      </div>
      <div className="mx-auto my-5 mt-10 w-screen max-w-[75rem]">
        <div className="group mt-2 grid h-[280px] grid-cols-1 gap-x-3 rounded-md border-2 border-solid border-[#00563F] bg-white first:mt-0 md:grid-cols-12">
          <Skeleton className="col-span-5 rounded-md" />
          <div className="col-span-7 flex flex-col gap-y-3 p-5">
            <div className="space-y-2">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-5 w-2/5" />
            </div>
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-11/12" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-10/12" />
            <div className="mt-5 flex gap-x-2 md:mt-0 md:self-end">
              <Skeleton className="h-[40px] w-[80px]" />
            </div>
          </div>
        </div>
        <div className="group mt-2 grid h-[280px] grid-cols-1 gap-x-3 rounded-md border-2 border-solid border-[#00563F] bg-white first:mt-0 md:grid-cols-12">
          <Skeleton className="col-span-5 rounded-md" />
          <div className="col-span-7 flex flex-col gap-y-3 p-5">
            <div className="space-y-2">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-5 w-2/5" />
            </div>
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-11/12" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-10/12" />
            <div className="mt-5 flex gap-x-2 md:mt-0 md:self-end">
              <Skeleton className="h-[40px] w-[80px]" />
            </div>
          </div>
        </div>
        <div className="group mt-2 grid h-[280px] grid-cols-1 gap-x-3 rounded-md border-2 border-solid border-[#00563F] bg-white first:mt-0 md:grid-cols-12">
          <Skeleton className="col-span-5 rounded-md" />
          <div className="col-span-7 flex flex-col gap-y-3 p-5">
            <div className="space-y-2">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-5 w-2/5" />
            </div>
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-11/12" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-10/12" />
            <div className="mt-5 flex gap-x-2 md:mt-0 md:self-end">
              <Skeleton className="h-[40px] w-[80px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
