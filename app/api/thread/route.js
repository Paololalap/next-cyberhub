import connectMongoDB from "@/lib/db"; // Assuming you've corrected the import path to connectMongo.js
import { Post } from "@/models/thread";
import { NextResponse } from "next/server";

export async function GET() {
  await connectMongoDB();
  const posts = await Post.find()
    .populate({
      path: "comments",
      options: { sort: { pinStatus: -1 } }, // Sort comments by pinStatus
    })
    .sort({ createdAt: -1 }); // Sort posts by createdAt

  // Sort comments within each post to ensure "pinned" comments appear first
  posts.forEach((post) => {
    if (post.comments && post.comments.length > 0) {
      post.comments.sort((a, b) => {
        if (a.pinStatus === "pinned") return -1;
        if (b.pinStatus === "pinned") return 1;
        return 0;
      });
    }
  });

  return NextResponse.json({ posts });
}

export async function POST(request) {
  const { author, content, imglink, userID } = await request.json({
    limit: "2mb",
  });
  await connectMongoDB();
  const post = new Post({
    author,
    content,
    imglink,
    userID,
  });
  await post.save();
  return NextResponse.json({ message: "Post Created" }, { status: 201 });
}
