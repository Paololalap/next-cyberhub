import Announce from "@/models/announce"; // Import your Announce model
import connectMongoDB from "@/lib/db"; // Assuming this function connects to MongoDB
import { NextResponse } from "next/server";
import Announce from "@/models/announce";

// GET endpoint to fetch a specific announcement by ID
export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const announce = await Announce.findOne({ _id: id });
  return NextResponse.json({ announce }, { status: 200 });
}

// PUT endpoint to update an announcement by ID
export async function PUT(request, { params }) {
  const { id } = params;
  const {
    newTitle: title,
    newContent: content,
    newStartDate: startDate,
    newEndDate: endDate,
  } = await request.json();

  await connectMongoDB(); // Connect to MongoDB

  try {
    // Find and update the announcement
    await Announce.findByIdAndUpdate(id, {
      title,
      content,
      startDate,
      endDate,
    });

    // Return success message
    return NextResponse.json(
      { message: "Announcement updated" },
      { status: 200 },
    );
  } catch (error) {
    // Handle errors
    console.error("Error updating announcement:", error);
    return NextResponse.error("Error updating announcement", { status: 500 });
  }
}
