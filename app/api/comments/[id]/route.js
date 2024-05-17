import connectMongoDB from "@/lib/db";
import { NextResponse } from "next/server";
import { Post, Comment } from "@/models/thread"; // Ensure Comment is imported

export async function POST(request, { params }) {
  const { id } = params;
  const { author, content, pinStatus } = await request.json(); // Retrieve author and content from request body
  try {
    await connectMongoDB();
    const post = await Post.findById(id);
    if (!post) {
      return NextResponse.error("Post not found", { status: 404 });
    }
    const comment = new Comment({
      author,
      content,
      pinStatus,
      postId: post._id,
    });
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
export async function DELETE({ params }) {
  const { id } = params;
  try {
    await connectMongoDB();
    const comment = await Comment.findByIdAndDelete(id);
    if (!comment) {
      return NextResponse.error("Comment not found", { status: 404 });
    }
    const postId = comment.postId;
    // Remove comment from its associated post's comments array
    await Post.findByIdAndUpdate(postId, { $pull: { comments: id } });
    return NextResponse.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    return NextResponse.error("Internal server error", { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  const { id } = params;
  const { pinStatus } = await request.json();
  try {
    await connectMongoDB();
    const comment = await Comment.findByIdAndUpdate(
      id,
      { pinStatus },
      { new: true },
    );
    if (!comment) {
      return NextResponse.error("Comment not found", { status: 404 });
    }
    return NextResponse.json({ message: "Pin status updated successfully" });
  } catch (error) {
    console.error("Error updating pin status:", error);
    return NextResponse.error("Internal server error", { status: 500 });
  }
}
