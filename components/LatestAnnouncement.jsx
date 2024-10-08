import formatDateToWords from "@/constants/DATE_TO_WORDS";
import { openSans } from "@/fonts/fonts";
import { connectToDatabase } from "@/lib/connectMongo";
import { cn } from "@/lib/utils";
import Oblation from "@/public/oblation-announcement.jpg";
import Image from "next/image";

const LatestAnnouncement = async () => {
  try {
    // DB Connect
    const client = await connectToDatabase();
    const db = client.db(`${process.env.NEXT_PUBLIC_DB}`);

    // DB Query
    const latestAnnouncement = await db
      .collection("announces")
      .find({})
      .sort({ startDate: -1 })
      .limit(1)
      .toArray();

    if (latestAnnouncement.length === 0) {
      return <div>No announcements found.</div>;
    }

    const { title, startDate, endDate, content } = latestAnnouncement[0];

    return (
      <div className="relative min-h-[450px] p-10 md:p-0">
        <Image
          src={Oblation}
          fill
          className="object-cover object-right md:object-top"
          alt="UP Oblation"
          priority
        />
        <div className="absolute left-1/2 top-1/2 z-10 md:-mt-5 flex max-h-[350px] w-screen max-w-screen-md -translate-x-1/2 -translate-y-1/2 flex-col rounded-xl bg-white/80">
          <div
            className="break-word rounded-t-xl bg-[#8a1438] p-4 text-center font-bold text-white md:break-keep md:text-6xl"
            style={{ fontSize: "clamp(24px, 4vw + 1rem, 48px)" }}
          >
            {title}
          </div>
          <div className="pl-4 pt-4 font-semibold text-[#8a1438]">
            <span>
              {formatDateToWords(startDate)} to {formatDateToWords(endDate)}
            </span>
          </div>
          <div className="mt-2 flex-1 overflow-y-auto p-4 text-[#8a1438]">
            <pre className={cn("whitespace-pre-wrap", openSans.className)}>
              {`${content}`}
            </pre>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch latest announcement:", error);
    return <div>Failed to fetch latest announcement.</div>;
  }
};

export default LatestAnnouncement;
