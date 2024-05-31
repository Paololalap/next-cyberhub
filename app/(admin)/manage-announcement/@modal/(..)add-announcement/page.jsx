"use client";
import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function AddAnnouncementPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [startDate, setStartDate] = useState(
    () => new Date().toISOString().split("T")[0],
  );
  const [endDate, setEndDate] = useState(
    () => new Date().toISOString().split("T")[0],
  );
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const onSubmit = async () => {
    setIsLoading(true);
    if (!title || !content || !startDate || !endDate) {
      toast({ variant: "Warning", description: "All fields are required" });
      return;
    }

    try {
      const res = await fetch(`/api/announces`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          startDate,
          endDate,
        }),
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        router.push("/");
        toast({
          variant: "Success",
          description: "Announcement added successfully",
        });
      } else {
        throw new Error("Failed to add announcement");
      }
    } catch (error) {
      toast({ variant: "Error", description: "Failed to add announcement" });
      console.error(error);
    }
    setIsLoading(false);
  };

  return (
    <Modal>
      <form
        className="mx-auto w-screen max-w-[35rem] rounded-lg border-t-[6px] border-[#8a1538] p-4 shadow-xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="mx-auto mt-3 w-full text-center text-3xl font-bold">
          New Announcement
        </h1>
        <div className="relative mt-6">
          <input
            {...register("title")}
            placeholder="Title"
            id="title"
            type="text"
            className="peer h-10 w-full cursor-text border-b-2 border-gray-200 text-gray-900 placeholder-transparent placeholder:select-none focus:border-[#8a1538] focus:outline-none"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <label
            htmlFor="title"
            className="absolute -top-3.5 left-0 cursor-text text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
          >
            Title:
          </label>
        </div>
        <div className="relative mt-2">
          <textarea
            {...register("content")}
            placeholder="Content"
            id="content"
            className="peer mt-6 w-full cursor-text resize-none border-b-2 border-gray-200 text-gray-900 placeholder-transparent placeholder:select-none focus:border-[#8a1538] focus:outline-none"
            rows="4"
            onChange={(e) => setContent(e.target.value)}
            value={content}
          />
          <label
            htmlFor="content"
            className="absolute -top-1 left-0 cursor-text text-sm text-gray-600 transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-1 peer-focus:text-sm peer-focus:text-gray-600"
          >
            Content:
          </label>
        </div>
        <div className="relative mt-6">
          <label
            htmlFor="startDate"
            className="block text-sm font-medium text-gray-700"
          >
            Start Date
          </label>
          <input
            {...register("startDate")}
            id="startDate"
            type="date"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8a1538] focus:ring-[#8a1538] sm:text-sm"
            onChange={(e) => setStartDate(e.target.value)}
            value={startDate}
          />
        </div>
        <div className="relative mt-6">
          <label
            htmlFor="endDate"
            className="block text-sm font-medium text-gray-700"
          >
            End Date
          </label>
          <input
            {...register("endDate")}
            id="endDate"
            type="date"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8a1538] focus:ring-[#8a1538] sm:text-sm"
            onChange={(e) => setEndDate(e.target.value)}
            value={endDate}
          />
        </div>
        <div className="flex justify-end">
          <Button
            type="submit"
            className="mt-5 h-9 w-fit rounded-md border bg-[#8a1538] text-center text-sm text-[#FFB61B] transition-all hover:bg-[#8a1538]/90"
          >
            {isLoading && <Loader2 className="mr-1 size-4 animate-spin" />}
            Publish
          </Button>
        </div>
      </form>
    </Modal>
  );    
}
