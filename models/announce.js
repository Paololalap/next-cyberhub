import mongoose, { Schema, models } from "mongoose";

const announceSchema = new Schema(
  {
    title: String,
    content: String,
    startDate: String,
    endDate: String,
  },
  {
    timestamps: true,
  },
);
const Announces =
  mongoose.models.Announces || mongoose.model("Announces", announceSchema);
export default Announces;
