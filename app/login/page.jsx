import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LoginForm from "@/components/form/Login";
import Oblation from "@/public/oblation.png";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  return (
    <main className="flex">
      <Image src={Oblation} fill className="object-cover" alt="UP Oblation" priority />
      <LoginForm />
    </main>
  );
}
