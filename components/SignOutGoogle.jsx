"use client";
import React from "react";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

export default function SignOutGoogle({ className }) {
  const handleSignOut = async () => {
    await signOut();
  };
  return (
    <>
      <Button onClick={handleSignOut} className={className}>
        Sign Out
      </Button>
    </>
  );
}
