"use client";
import EditUserForm from "@/components/AccountEditForm";
import { useEffect, useState } from "react";

async function getUserData() {
  try {
    const response = await fetch("http://localhost:3000/api/admin-user", {
      headers: {
        "Cache-Control": "no-store",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }

    const responseData = await response.json();
    if (!responseData || !responseData.user) {
      throw new Error("User data is missing");
    }

    return responseData.user;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default function EditContent() {
  const [user, setUser] = useState(null); // Initialize user state to null

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUserData();
      setUser(userData);
    };

    fetchData();
  }, []);

  if (!user) {
    return null; // Return null or a loading indicator while data is being fetched
  }

  return (
    <EditUserForm
      firstName={user.firstName}
      lastName={user.lastName}
      username={user.username}
      profilePic={user.profilePic}
    />
  );
}
