"use client";

import { signIn } from "next-auth/react";

export default function SignInGoogle() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <p className="mb-4">You need to sign in to access this page.</p>
        <button
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          onClick={() => signIn("google")}
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
