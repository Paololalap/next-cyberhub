import connectMongoDB from "@/lib/db";
import Announces from "@/models/announce"; // Import your Announcement model
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const {
    newTitle: title,
    newContent: content,
    newStartDate: startDate,
    newEndDate: endDate,
    
  } = await request.json();
  await connectMongoDB();
  await Announces.findByIdAndUpdate(id, {
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

// GET endpoint to fetch a specific announcement by ID
export async function GET() {
  await connectMongoDB();
  const announces = await Announces.findOne({ _id: id });
  return NextResponse.json({ announces });
}


// PUT endpoint to update an announcement by ID

