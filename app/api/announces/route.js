import connectMongoDB from "@/lib/db";
import Announcement from "@/models/announce"; // Import your Announcement model
import { NextResponse } from "next/server";

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Announcement.findByIdAndDelete(id);
  return NextResponse.json({ message: "Content deleted" }, { status: 200 });
}
