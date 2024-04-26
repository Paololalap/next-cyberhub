// app/api/admin-user/route.js

import connectMongoDB from "@/lib/db";
import User from "@/models/user";
import { getServerSession,  } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET(request) {
  await connectMongoDB();

  // Get the session object
  const session = await getServerSession(authOptions);

  // Check if the user is authenticated
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Access the user data from the session object
  const userId = session.id;
  console.log(session);
  // Use the userId to fetch user data or perform other operations
  const user = await User.find();

  return NextResponse.json({ user });
}
