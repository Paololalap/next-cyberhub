import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
      <div className="flex w-screen flex-col bg-[#f7f7e3]">
        <div className="mt-5 text-center text-3xl font-black">
          Manage Announcements
        </div>
        <hr className="mx-auto mt-3 w-64 border-2 border-solid border-[#FFB61B]" />
        <div className="mx-auto mt-5">
          <Button
            className="bg-[#8a1438] hover:bg-[#8a1438]/90"
            aria-label="add news button"
          >
            Add Announcement
          </Button>
        </div>
        <div className="mx-auto my-5">
          <div className="grid w-screen max-w-[75rem] grid-cols-1 gap-5 md:grid-cols-12">
            <div className="rounded-md border-2 border-solid border-[#00563F] bg-white md:col-span-6 lg:col-span-4">
              <div className="flex h-full flex-col justify-between p-5">
                <Skeleton className="mt-1 h-5 w-2/3" />
                <Skeleton className="mt-1 h-5 w-3/4" />
                <Skeleton className="mt-5 h-5 w-full" />
                <Skeleton className="mt-1 h-5 w-full" />
                <Skeleton className="mt-1 h-5 w-4/5" />
                <div className="mt-5 flex gap-x-2 md:mt-0 md:self-end">
                  <Skeleton className="h-10 w-[80px]" />
                  <Skeleton className="h-10 w-[80px]" />
                </div>
              </div>
            </div>
            <div className="rounded-md border-2 border-solid border-[#00563F] bg-white md:col-span-6 lg:col-span-4">
              <div className="flex h-full flex-col justify-between p-5">
                <Skeleton className="mt-1 h-5 w-2/3" />
                <Skeleton className="mt-1 h-5 w-3/4" />
                <Skeleton className="mt-5 h-5 w-full" />
                <Skeleton className="mt-1 h-5 w-full" />
                <Skeleton className="mb-5 mt-1 h-5 w-4/5" />
                <div className="flex gap-x-2 md:mt-0 md:self-end">
                  <Skeleton className="h-10 w-[80px]" />
                  <Skeleton className="h-10 w-[80px]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
