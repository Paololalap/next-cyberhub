import { Suspense } from "react";
import GetData from "./_get-data";
import AddAnnouncementButton from "@/components/button/AddAnnouncement";
import AnnouncementLoadingSkeleton from "@/components/loading/AnnouncementLoadingSkeleton";

export default async function AnnouncementsPage({ searchParams }) {
  return (
    <div className="flex w-screen flex-col bg-[#f7f7e3]">
      <div className="mt-5 text-center text-3xl font-black">
        Manage Announcements
      </div>
      <hr className="mx-auto mt-3 w-64 border-2 border-solid border-[#FFB61B]" />
      <AddAnnouncementButton />

      <Suspense fallback={<AnnouncementLoadingSkeleton />}>
        <GetData searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
