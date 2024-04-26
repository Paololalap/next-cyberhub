// app/account-settings/page.jsx
"use client";
import AccountEditForm from "@/components/AccountEditForm";
import { useSession } from "next-auth/react";

export default function AccountSettingsPage() {
  const { data: session } = useSession();
  console.log(session?.user);
  return (
    <>
      <AccountEditForm
        firstName={firstName}
        lastName={lastName}
        username={username}
        profilePic={profilePic}
      />
    </>
  );
}
