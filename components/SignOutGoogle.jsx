"use client";
import React from "react";
import { signOut, useSession } from "next-auth/react";

export default function SignOutGoogle() {
  const { data: session } = useSession();
  const handleSignOut = async () => {
    await signOut();
  };
  return (
    <>
      <>
        {session?.user?.email ||
          session?.user?.username ||
          session?.user?.name}
      </>
      <button
        className="absolute right-4 top-4 rounded bg-gray-800 px-4 py-2 text-white"
        onClick={handleSignOut}
      >
        Sign Out
      </button>
    </>
  );
}
