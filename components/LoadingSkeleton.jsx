import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingSkeleton() {
  return (
    <div className="mx-auto my-5 w-full max-w-[75rem]">
      <div className="group mt-2 grid grid-cols-1 gap-x-3 h-[280px] rounded-md border-2 border-solid border-[#00563F] bg-white first:mt-0 md:grid-cols-12">
        <Skeleton className="col-span-5 rounded-md" />
        <div className="col-span-7 flex flex-col p-5 gap-y-3">
          <div className="space-y-2">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-5 w-2/5" />
          </div>
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-11/12" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-10/12" />
          <div className="mt-5 flex gap-x-2 md:mt-0 md:self-end">
            <Skeleton className="h-[40px] w-[80px]"></Skeleton>
            <Skeleton className="h-[40px] w-[80px]"></Skeleton>
          </div>
        </div>
      </div>
      <div className="group mt-2 grid grid-cols-1 gap-x-3 h-[280px] rounded-md border-2 border-solid border-[#00563F] bg-white first:mt-0 md:grid-cols-12">
        <Skeleton className="col-span-5 rounded-md" />
        <div className="col-span-7 flex flex-col p-5 gap-y-3">
          <div className="space-y-2">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-5 w-2/5" />
          </div>
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-11/12" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-10/12" />
          <div className="mt-5 flex gap-x-2 md:mt-0 md:self-end">
            <Skeleton className="h-[40px] w-[80px]"></Skeleton>
            <Skeleton className="h-[40px] w-[80px]"></Skeleton>
          </div>
        </div>
      </div>
      <div className="group mt-2 grid grid-cols-1 gap-x-3 h-[280px] rounded-md border-2 border-solid border-[#00563F] bg-white first:mt-0 md:grid-cols-12">
        <Skeleton className="col-span-5 rounded-md" />
        <div className="col-span-7 flex flex-col p-5 gap-y-3">
          <div className="space-y-2">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-5 w-2/5" />
          </div>
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-11/12" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-10/12" />
          <div className="mt-5 flex gap-x-2 md:mt-0 md:self-end">
            <Skeleton className="h-[40px] w-[80px]"></Skeleton>
            <Skeleton className="h-[40px] w-[80px]"></Skeleton>
          </div>
        </div>
      </div>
    </div>
  );
}
