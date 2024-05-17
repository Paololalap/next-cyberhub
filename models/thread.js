import mongoose, { Schema } from "mongoose";
const postSchema = new Schema(
  {
    author: String,
    content: String,
    imglink: String,
    comments: [{ type: Schema.Types.String, ref: "Comment" }],
    userID: String,
  },
  {
    timestamps: true,
  },
);
const commentSchema = new Schema(
  {
    author: String,
    content: String,
    postId: { type: Schema.Types.String, ref: "Post" },
    pinStatus: String,
    userID: String,
  },
  {
    timestamps: true,
  },
);
const Post = mongoose.models.Post || mongoose.model("Post", postSchema);
const Comment =
  mongoose.models.Comment || mongoose.model("Comment", commentSchema);

export { Post, Comment };
