import connectMongoDB from "@/lib/db"; // Assuming you've corrected the import path to connectMongo.js
import { Post } from "@/models/thread";
import { NextResponse } from "next/server";

// GET method to fetch all posts with sorted comments
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

// POST method to create a new post
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

// DELETE method to delete a post by ID and its associated comments
export async function DELETE(request) {
  const { postId } = await request.json();
  await connectMongoDB();

  try {
    const deletedPost = await Post.findOneAndDelete({ _id: postId });
    if (!deletedPost) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "Post and associated comments deleted" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting post", error },
      { status: 500 },
    );
  }
}
