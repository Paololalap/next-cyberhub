import connectMongoDB from "@/lib/db";
import Announcement from "@/models/announce";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const { title, content, startDate, endDate } = await request.json();
  await connectMongoDB();
  await Announcement.findByIdAndUpdate(id, {
    title,
    content,
    startDate,
    endDate,
  });
  return NextResponse.json(
    { message: "Announcement updated" },
    { status: 200 },
  );
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const announce = await Announcement.findById(id);
  if (!announce) {
    return NextResponse.json(
      { error: "Announcement not found" },
      { status: 404 },
    );
  }
  return NextResponse.json(announce);
}
