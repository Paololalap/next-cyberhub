"use client";
import React, { useState, useEffect } from "react";
import { CreatePost } from "@/components/CreatePost";
import { Communityposts } from "@/components/CommunityPost";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

export default function CommunityPage() {
  const { data: session } = useSession();
  const [author, setAuthor] = useState();
  const [authorEnabled, setAuthorEnabled] = useState(false);

  useEffect(() => {
    if (session) {
      setAuthor(session.user.name || "Anonymous");
    }
  }, [session]);

  const toggleAuthor = () => {
    setAuthorEnabled(!authorEnabled);
  };

  const handleAuthorChange = (e) => {
    setAuthor(e.target.value);
  };

  
  return (
    <>
      <div className="flex justify-center items-center py-2">
        <div className="w-full sm:max-w-2xl p-6 bg-white sm:rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <div className="font-bold text-2xl rounded-full h-10 w-14  flex items-center justify-center bg-gray-300 text-gray-700">
              {author ? author[0].toUpperCase() : ""}
            </div>
            <Input
              type="text"
              value={author}
              onChange={handleAuthorChange}
              className={`ml-2 w-full px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black ${
                authorEnabled ? "" : "bg-gray-200"
              }`}
              placeholder="Enter your author"
              disabled={!authorEnabled}
            />
            <Button
              className="ml-2 px-3 py-2 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-500"
              onClick={toggleAuthor}
            >
              {authorEnabled ? "Save" : "Change"}
            </Button>
          </div>
        </div>
      </div>
      <div>
      </div>
      <CreatePost author={author} />
      <Communityposts author={author} />
    </>
  );
}
