import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SignInGoogle from "@/components/SignInGoogle";
import SignOutGoogle from "@/components/SignOutGoogle";

export default async function CommunityPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <SignInGoogle />;
  }

  return (
    <div className="h-full bg-gray-500">
      <SignOutGoogle />
    </div>
  );
}
