import connectMongoDB from "@/lib/db";
import Content from "@/models/content";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const {
    newTitle: title,
    newTags: tags,
    newAuthor: author,
    newDate: date,
    newLink: link,
    newDescription: description,
    newBody: body,
    newImageL: imageL,
    newType: type,
  } = await request.json();
  await connectMongoDB();
  await Content.findByIdAndUpdate(id, {
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
  return NextResponse.json({ message: "Content updated" }, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const content = await Content.findOne({ _id: id });
  return NextResponse.json({ content }, { status: 200 });
}
