import connectMongoDB from "@/lib/db";
import Content from "@/models/content";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { title, tags, author, date, link, description, body, imageL, type } =
    await request.json({ limit: "2mb" });
  await connectMongoDB();
  await Content.create({
    title,
    tags,
    author,
    date,
    link,
    description,
    body,
    imageL,
    type,
  });
  return NextResponse.json({ message: "Content Created" }, { status: 201 });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Content.findByIdAndDelete(id);
  return NextResponse.json({ message: "Content deleted" }, { status: 200 });
}

export async function GET() {
  await connectMongoDB();
  const content = await Content.find({ type: "News" })
    .sort({ createdAt: -1 })
    .limit(1);
  return NextResponse.json({ content });
}