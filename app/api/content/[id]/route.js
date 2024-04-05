import connectMongoDB from "@/libs/db";
import Content from "@/models/content";
import { NextResponse } from "next/server";

 export async function PUT(request, { params }) {
  const { id } = params;
  const { newTitle: title, newDescription: description } = await request.json();
  await connectMongoDB();
  await Content.findByIdAndUpdate(id, { title, description });
  return NextResponse.json({ message: "Content updated" }, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const content = await Content.findOne({ _id: id });
  return NextResponse.json({ content }, { status: 200 });
}
