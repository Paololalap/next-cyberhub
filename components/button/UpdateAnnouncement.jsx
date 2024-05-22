"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export default function UpdateButton({ id }) {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Link href={`/edit-announcement/${id}`} tabIndex={-1}>
      <Button
        aria-label="update button"
        className="bg-[#8a1438] hover:bg-[#8a1438]/90"
        onClick={() => setIsLoading((prev) => !prev)}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Update
      </Button>
    </Link>
  );
}
