"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast"
 
export const CreatePost = ({author}) => {
  const { toast } = useToast();
  

  const [content, setContent] = useState("");
  const [imglink, setImglink] = useState("");

  const router = useRouter();

  const handleAskShareClick = () => {
    const askShareButton = document.getElementById("askShareButton");
    askShareButton.click();
  };

  const onSubmit = async () => {
    if (!content || !author || !imglink) {
      toast({ variant: "Warning", description: "All fields are required" });
      return;
    } 

    try {
      const res = await fetch("/api/thread", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ author, content, imglink }),
      });
      const data = await res.json();
      console.log(data);

      if (res.ok) {
        router.push("/community");
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
    <div className='flex justify-center items-center'>
      <div className='w-full sm:max-w-2xl p-6 bg-white sm:rounded-lg shadow-md'>
        
        {/* Clickable div triggering the "Ask / Share" button click */}
        <div
          className='w-full px-2 py-2 text-gray-400 text-left border rounded-md focus:outline-none focus:border-black cursor-text'
          onClick={handleAskShareClick} // Add onClick event to trigger "Ask / Share" button click
        >
          What do you want to ask or share?
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant='primary'
              className='w-full px-4 mt-4 py-2 bg-blue-500 text-white rounded-md '
              id='askShareButton' // Add id to the "Ask / Share" button
            >
              Ask / Share
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle className='text-center font-bold'>
                Create Post
              </DialogTitle>
            </DialogHeader>
            <Textarea
              placeholder='What do you want to ask or share?'
              className='placeholder:text-lg text-lg mt-2'
              rows='6'
              onChange={(e) => setContent(e.target.value)}
              value={content}
            />
            <Label htmlFor='picture' className='cursor-pointer w-max'>
              Attach Image
            </Label>
            <Input
              id='picture'
              type='file'
              onChange={handleUploadImage}
              accept='image/jpeg, image/jpg, image/png'
              className='-mt-2 cursor-pointer file:cursor-pointer'
            />
            <DialogFooter>
              <Button onClick={onSubmit}>Post</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
