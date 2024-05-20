// app/components/LatestAnnouncement.jsx

import React from "react";
import { connectToDatabase } from "@/lib/connectMongo";
import formatDateToWords from "@/constants/DATE_TO_WORDS";

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
      <div className="rounded-md border-2 border-solid border-[#00563F] bg-white p-5">
        <div className="mb-2 font-bold text-gray-500">{title}</div>
        <div className="mb-2 text-sm">
          <span>
            {formatDateToWords(startDate)} to {formatDateToWords(endDate)}
          </span>
        </div>
        <div className="text-sm">{content}</div>
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch latest announcement:", error);
    return <div>Failed to fetch latest announcement.</div>;
  }
};

export default LatestAnnouncement;
