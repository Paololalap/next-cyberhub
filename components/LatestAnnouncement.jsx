import React from "react";
import { connectToDatabase } from "@/lib/connectMongo";
import formatDateToWords from "@/constants/DATE_TO_WORDS";
import Oblation from "@/public/oblation-announcement.jpg";
import Image from "next/image";

const LatestAnnouncement = async () => {
  try {
    // DB Connect
    const client = await connectToDatabase();
    const db = client.db("CyberDB");

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
      <div className="relative min-h-[60vh] bg-white ">
        <Image
          src={Oblation}
          fill
          className="object-cover object-top"
          alt="UP Oblation"
          priority
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -mt-16 z-10">
          <div className="font-bold text-white md:text-6xl text-5xl text-center lg:whitespace-nowrap">{title}</div>
          <div className="mt-6 text-white text-right">
            <span>
              {formatDateToWords(startDate)} to {formatDateToWords(endDate)}
            </span>
          </div>
          <div className="text-white mt-2">{content}</div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch latest announcement:", error);
    return <div>Failed to fetch latest announcement.</div>;
  }
};

export default LatestAnnouncement;
