"use client";

import CommunityPosts from "@/components/CommunityPost";
import { CreatePost } from "@/components/CreatePost";
import { Avatar } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import { CircleHelp } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function CommunityPage() {
  const { data: session } = useSession();
  const [author, setAuthor] = useState();
  const [authorEnabled, setAuthorEnabled] = useState(false);
  const { toast } = useToast();
  const [toastShown, setToastShown] = useState(false);
  
  useEffect(() => {
    if (session && !toastShown) {
      setAuthor(session?.user?.name);
      toast({ variant: "Success", description: "Welcome to Community!" });
      setToastShown(true); // Set the state to true after showing the toast
    }
  }, [session, toastShown, toast]);


  const toggleAuthor = () => {
    setAuthorEnabled(!authorEnabled);
    if (!authorEnabled) {
      setAuthor("Anonymous");
    } else {
      setAuthor(session?.user?.name);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center py-2">
        <div className="w-full bg-white p-6 shadow-md sm:max-w-2xl sm:rounded-lg">
          <div className="mb-4 flex items-center">
            <Avatar className="grid place-items-center bg-gray-300 text-2xl font-bold text-gray-700">
              <p>{author ? author[0].toUpperCase() : ""}</p>
            </Avatar>

            <Input
              type="text"
              value={author}
              onChange={(e) => {
                setAuthor(e.target.value);
              }}
              className="ml-2 w-full rounded-md border border-gray-300 px-2 py-2 focus:border-black focus:outline-none"
              disabled
            />
            <div className="ml-3 flex items-center space-x-2">
              <Checkbox id="terms" onCheckedChange={toggleAuthor} />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Anonymous
              </label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <CircleHelp className="size-5" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>When checked, your posts will be anonymous.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </div>
      <div></div>
      <CreatePost author={author} />
      <CommunityPosts author={author} />
    </>
  );
}
