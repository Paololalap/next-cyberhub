"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SignInGoogle() {
  const searchParams = useSearchParams();
  const [error, setError] = useState(null);

  useEffect(() => {
    const errorParam = searchParams.get("error");
    if (errorParam) {
      setError(errorParam);
    }
  }, [searchParams]);

  const getErrorMessage = (error) => {
    switch (error) {
      case "EmailDenied":
        return 'You must sign in with a "@upou.edu.ph" email.';
      default:
        return "An unknown error occurred.";
    }
  };
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        {error ? (
          <p className="mb-4 text-red-500">{getErrorMessage(error)}</p>
        ) : (
          <p className="mb-4">You need to sign in to access this page.</p>
        )}
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
