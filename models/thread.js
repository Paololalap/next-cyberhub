import mongoose, { Schema } from "mongoose";

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

// Middleware to delete associated comments before a post is deleted
postSchema.pre("findOneAndDelete", async function (next) {
  const postId = this.getQuery()["_id"];
  await mongoose.model("Comment").deleteMany({ postId });
  next();
});

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);
const Comment =
  mongoose.models.Comment || mongoose.model("Comment", commentSchema);

export { Post, Comment };
