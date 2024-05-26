import { Lock } from "lucide-react";
import React from "react";

export default function Unauthorized() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-[#8A1538]">
          <Lock className="size-12 text-white" />
        </div>
        <h1 className="mt-4 text-2xl font-bold text-gray-800">Hold Up!</h1>
        <p className="mt-2 text-gray-600">Error 401: Unauthorized</p>
      </div>
    </div>
  );
}
