import connectMongoDB from "@/lib/db";
import Announcement from "@/models/announce"; // Import your Announcement model
import { NextResponse } from "next/server";

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");

  await connectMongoDB();

  try {
    // Find and delete the announcement
    const deletedAnnouncement = await Announcement.findByIdAndDelete(id);

    if (!deletedAnnouncement) {
      return NextResponse.error("Announcement not found", { status: 404 });
    }

    // Return success message
    return NextResponse.json(
      { message: "Announcement deleted" },
      { status: 200 },
    );
  } catch (error) {
    // Handle errors
    console.error("Error deleting announcement:", error);
    return NextResponse.error("Error deleting announcement", { status: 500 });
  }
}
