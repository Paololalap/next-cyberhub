import connectMongoDB from "@/lib/db";
import { NextResponse } from "next/server";
import { Post, Comment } from "@/models/thread"; // Ensure Comment is imported

export async function POST(request, { params }) {
  const { id } = params;
  const { author, content } = await request.json(); // Retrieve author and content from request body
  try {
    await connectMongoDB();
    const post = await Post.findById(id);
    if (!post) {
      return NextResponse.error("Post not found", { status: 404 });
    }
    const comment = new Comment({ author, content, postId: post._id });
    await comment.save();
    // Push commentId to post's comments array
    post.comments.push(comment._id);
    await post.save();
    return NextResponse.json({ comment }, { status: 201 });
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.error("Internal server error", { status: 500 });
  }
}
