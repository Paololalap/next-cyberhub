import connectMongoDB from "@/lib/db"; // Assuming you've corrected the import path to connectMongo.js
import { Post } from "@/models/thread";
import { NextResponse } from "next/server";

export async function GET() {
  await connectMongoDB();
  const posts = await Post.find().populate("comments").sort({ createdAt: -1 });
  return NextResponse.json({ posts });
}

export async function POST(request) {
  const { author, content, imglink } = await request.json({ limit: "2mb" });
  await connectMongoDB();
  const post = new Post({ author, content, imglink });
  await post.save();
  return NextResponse.json({ message: "Post Created" }, { status: 201 });
}
