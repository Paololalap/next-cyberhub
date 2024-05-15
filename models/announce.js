import mongoose, { Schema, models } from "mongoose";

const announceSchema = new Schema(
  {
    title: String,
    content: String,
    startDate: Date,
    endDate: Date,
  },
  {
    timestamps: true,
  },
);
const Announce =
  mongoose.models.Announce || mongoose.model("Announce", announceSchema);
export default Announce;
