import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SignInGoogle from "@/components/SignInGoogle";
import CommunityThread from "@/components/CommunityThread";

export default async function CommunityPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <SignInGoogle />;
  }

  return (
    <div className="h-full bg-[#f7f7e3]">
      <CommunityThread />
    </div>
  );
}
