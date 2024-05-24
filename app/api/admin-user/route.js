import connectMongoDB from "@/lib/db";
import User from "@/models/user";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET() {
  await connectMongoDB();

  // Get the session object
  const session = await getServerSession(authOptions);

  // Check if the user is authenticated
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Access the user data from the session object
  const userId = session.user._id;

  // Use the userId to fetch user data
  const user = await User.findById({ _id: userId });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ user });
}

export async function PUT(request) {
  const session = await getServerSession(authOptions);

  // Check if the user is authenticated
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Access the user data from the session object
  const userId = session.user._id;
  const {
    newFirstName: firstName,
    newLastName: lastName,
    newUsername: username,
    newProfilePic: profilePic,
  } = await request.json();
  await connectMongoDB();
  await User.findByIdAndUpdate(userId, {
    firstName,
    lastName,
    username,
    profilePic,
  });
  return NextResponse.json({ message: "User updated" }, { status: 200 });
}
