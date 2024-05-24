"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function ReadMore({ id }) {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Link href={`/article/${id}`} tabIndex={-1}>
      <Button
        className="bg-[#8a1438] hover:bg-[#8a1438]/90"
        onClick={() => setIsLoading((prev) => !prev)}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Read more
      </Button>
    </Link>
  );
}
