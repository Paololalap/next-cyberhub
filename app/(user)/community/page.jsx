import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CommunityThread from "@/components/CommunityThread";
import SignInGoogle from "@/components/button/SignInGoogle";
import { getServerSession } from "next-auth";

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
