// app/api/admin-user/[id]/route.js

import connectMongoDB from "@/lib/db";
import User from "@/models/user";
import { NextResponse } from "next/server";
import { getSession } from "next-auth/react";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function PUT(request, { params }) {
  const { id } = params;
  const {
    newFirstName: firstName,
    newLastName: lastName,
    newUsername: username,
    newProfilePic: profilePic,
  } = await request.json();
  await connectMongoDB();
  await User.findByIdAndUpdate(id, {
    firstName,
    lastName,
    username,
    profilePic,
  });
  return NextResponse.json({ message: "User updated" }, { status: 200 });
}


