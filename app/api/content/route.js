import connectMongoDB from "@/libs/db";
import Content from "@/models/content";
import { NextResponse } from "next/server";

export async function GET() {
  await connectMongoDB();
  const content = await Content.find({ type: "News" })
    .sort({ createdAt: -1 })
    .limit(1);
  return NextResponse.json({ content });
}

