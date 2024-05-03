import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    username: String,
    password: String,
    profilePic: String,
    firstName: String,
    lastName: String,
    role: String,
  },
  { timestamps: true },
);

const User = models.User || mongoose.model("User", userSchema);
export default User;
