import connectMongoDB from "@/lib/db";
import Announcement from "@/models/announce";
import { NextResponse } from "next/server";

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Announcement.findByIdAndDelete(id);
  return NextResponse.json({ message: "Content deleted" }, { status: 200 });
}
export async function POST(request) {
  const { title, content, startDate, endDate } = await request.json();
  await connectMongoDB();
  const newAnnouncement = new Announcement({
    title,
    content,
    startDate,
    endDate,
  });
  await newAnnouncement.save();
  return NextResponse.json(
    { message: "Announcement added successfully" },
    { status: 201 },
  );
}