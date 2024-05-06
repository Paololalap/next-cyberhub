// "C:\Users\Acer\Documents\OJT\testing\app\api\comments\route.js"
import connectMongoDB from "@/lib/db";
import { Comment } from "@/models/thread";
import { NextResponse } from "next/server";

export async function GET() {
  await connectMongoDB();
  const comments = await Comment.find();
  return NextResponse.json({ comments });
}
