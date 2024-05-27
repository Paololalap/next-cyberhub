"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

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
      toast({
        variant: "Warning",
        description: "Description field is required",
      });
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
      await res.json();

      if (res.ok) {
        handleExitDialog();
        router.back();
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
        <Dialog className="w-screen max-w-[900px]">
          <DialogTrigger asChild>
            <Button
              variant="primary"
              className="mt-4 w-full rounded-md bg-[#8a1538] px-4 py-2 text-white hover:bg-[#8a1538]/90 "
              id="askShareButton"
            >
              Ask / Share
            </Button>
          </DialogTrigger>
          <DialogContent className="flex flex-col gap-2 sm:h-auto sm:w-auto">
            <DialogHeader>
              <DialogTitle className="text-center font-bold">
                Create Post
              </DialogTitle>
            </DialogHeader>
            <Label htmlFor="content">Description</Label>
            <Textarea
              placeholder="What do you want to ask or share?"
              className="max-h-[400px] min-h-[300px] min-w-[800px] max-w-[900px] text-lg placeholder:text-lg md:resize"
              onChange={(e) => setContent(e.target.value)}
              id="content"
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
              className="cursor-pointer file:cursor-pointer"
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
