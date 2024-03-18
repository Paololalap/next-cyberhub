import mongoose, { Schema } from "mongoose";
const contentSchema = new Schema(
  {
    title: String,
    tags: Array,
    author: String,
    date: String,
    link: String,
    description: String,
    body: String,
    imageL: String,
    type: String,
    
  },
  {
    timestamps: true,
  }
);

const Content = mongoose.models.Content || mongoose.model("Content", contentSchema);

export default Content;