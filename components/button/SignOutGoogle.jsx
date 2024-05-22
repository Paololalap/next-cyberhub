"use client";
import React from "react";
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export default function SignOutGoogle({ className }) {
  const handleSignOut = async () => {
    await signOut();
  };
  return (
    <>
      <Button onClick={handleSignOut} className={cn(className, "ml-3")}>
        Sign Out
      </Button>
    </>
  );
}
