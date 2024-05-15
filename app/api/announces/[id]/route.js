import connectMongoDB from "@/lib/db";
import Announces from "@/models/announce"; // Import your Announcement model
import { NextResponse } from "next/server";


// GET endpoint to fetch a specific announcement by ID
export async function GET() {
  await connectMongoDB();
  const announces = await Announces.find();
  return NextResponse.json({ announces });
}


// PUT endpoint to update an announcement by ID

