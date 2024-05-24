"use client";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";

export const CreatePost = ({ author }) => {
  const { toast } = useToast();
  const { data: session } = useSession();
  const [content, setContent] = useState("");
  const [imglink, setImglink] = useState("");
  const router = useRouter();
  const dialogCloseRef = useRef(null);

  const handleAskShareClick = () => {
    const askShareButton = document.getElementById("askShareButton");
    askShareButton.click();
  };

  const handleExitDialog = () => {
    dialogCloseRef.current.click(); 
  };

  const onSubmit = async () => {
    if (!content || !author) {
      toast({ variant: "Warning", description: "Content field is required" });
      return;
    }

    try {
      const res = await fetch("/api/thread", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          author,
          content,
          imglink,
          userID: session?.user?._id,
        }),
      });
      const data = await res.json();
      console.log(data);

      if (res.ok) {
        router.push("/community");
        handleExitDialog();
        setContent("");
        toast({ variant: "Success", description: "Posted" });
      } else {
        throw toast({ variant: "Error", description: "Failed to Post" });
      }
    } catch (error) {
      toast({ variant: "Error", description: "Failed to Post" });
      console.error(error);
    }
  };

  const imageBase64 = async (file) => {
    const reader = new FileReader();
    await reader.readAsDataURL(file);
    const data = new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });
    return data;
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    const image = await imageBase64(file);
    setImglink(image);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full bg-white p-6 shadow-md sm:max-w-2xl sm:rounded-lg">
        <div
          className="w-full cursor-text rounded-md border px-2 py-2 text-left text-gray-400 focus:border-black focus:outline-none"
          onClick={handleAskShareClick}
        >
          What do you want to ask or share?
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="primary"
              className="mt-4 w-full rounded-md bg-[#8a1538] px-4 py-2 text-white hover:bg-[#8a1538]/90 "
              id="askShareButton"
            >
              Ask / Share
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-center font-bold">
                Create Post
              </DialogTitle>
            </DialogHeader>
            <Textarea
              placeholder="What do you want to ask or share?"
              className="mt-2 text-lg placeholder:text-lg"
              rows="6"
              onChange={(e) => setContent(e.target.value)}
              value={content}
            />
            <Label htmlFor="picture" className="w-max cursor-pointer">
              Attach Image
            </Label>
            <Input
              id="picture"
              type="file"
              onChange={handleUploadImage}
              accept="image/jpeg, image/jpg, image/png"
              className="-mt-2 cursor-pointer file:cursor-pointer"
            />
            <DialogFooter>
              <Button
                onClick={onSubmit}
                className="bg-[#8a1538] hover:bg-[#8a1538]/90"
              >
                Post
              </Button>
            </DialogFooter>
            <DialogClose ref={dialogCloseRef} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
