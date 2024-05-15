import connectMongoDB from "@/lib/db";
import Announce from "@/models/announce"; // Import your Announce model
import { NextResponse } from "next/server";

export async function POST(request) {
  const { title, content, startDate, endDate } = await request.json({
    limit: "2mb",
  });

  await connectMongoDB();

  try {
    // Create a new announcement
    await Announce.create({
      title,
      content,
      startDate,
      endDate,
    });

    // Return success message
    return NextResponse.json(
      { message: "Announcement Created" },
      { status: 201 },
    );
  } catch (error) {
    // Handle errors
    console.error("Error creating announcement:", error);
    return NextResponse.error("Error creating announcement", { status: 500 });
  }
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Announce.findByIdAndDelete(id);
  return NextResponse.json({ message: " deleted" }, { status: 200 });
}

