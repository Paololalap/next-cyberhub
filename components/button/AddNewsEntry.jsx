"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

export default function AddNewsEntry() {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Link href={"/add-content"} tabIndex={-1} className="mx-auto mt-5">
      <Button
        className="bg-[#8a1438] hover:bg-[#8a1438]/90"
        aria-label="add news button"
        onClick={() => setIsLoading((prev) => !prev)}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Add News Entry
      </Button>
    </Link>
  );
}
