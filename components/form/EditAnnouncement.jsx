"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

function EditAnnounceForm({ id, title, content, startDate, endDate }) {
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    setValue("title", title);
    setValue("content", content);
    setValue("startDate", startDate.split("T")[0]);
    setValue("endDate", endDate.split("T")[0]);
  }, [title, content, startDate, endDate, setValue]);

  const router = useRouter();

  const onSubmit = async (data) => {
    const formattedData = {
      ...data,
      startDate: data.startDate.split("T")[0], // Ensure date is in YYYY-MM-DD format
      endDate: data.endDate.split("T")[0], // Ensure date is in YYYY-MM-DD format
    };

    try {
      const res = await fetch(`${process.env.NEXTAUTH_URL}/api/announces/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      if (!res.ok) {
        throw new Error("Failed to update announcement");
      }

      router.push("/");
    } catch (error) {
      console.error("Error updating announcement:", error);
    }
  };

  return (
    <div className="w-screen px-3 pt-10 md:px-0">
      <form
        className="mx-auto rounded-lg border-t-[6px] border-[#8a1538] p-4 shadow-2xl md:w-fit"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="break-word mx-auto mt-3 w-full text-center text-3xl font-bold">
          Update Announcement
        </h1>
        <section className="flex flex-col justify-center md:flex-row md:gap-4">
          <div className="flex flex-col">
            <div className="relative mx-auto mt-6 w-full">
              <input
                {...register("title")}
                placeholder="Title"
                id="title"
                type="text"
                className="peer h-10 w-full cursor-text border-b-2 border-gray-200 text-gray-900 placeholder-transparent placeholder:select-none focus:border-[#8a1538] focus:outline-none"
              />
              <label
                htmlFor="title"
                className="absolute -top-3.5 left-0 cursor-text text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
              >
                Title:
              </label>
            </div>
            <div className="mt-2 w-full md:h-auto">
              <Label htmlFor="content" className="text-sm text-gray-600">
                Body:
              </Label>
              <Textarea
                {...register("content")}
                id="content"
                placeholder="Content"
                className="cursor-text resize-none rounded-lg p-2 text-gray-900 focus:outline-none focus-visible:ring-0 md:min-h-[10rem] md:min-w-[30rem] md:resize"
              />
            </div>
            <div className="relative mt-2 w-full">
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
              />
            </div>
            <div className="relative mt-6 w-full">
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
              />
            </div>
          </div>
        </section>
        <div className="flex justify-end">
          <Button
            type="submit"
            className="mt-3 w-fit rounded-md border bg-[#8a1538] px-5 text-center text-sm text-[#FFB61B] transition-all hover:bg-[#8a1538]/90"
          >
            Update
          </Button>
        </div>
      </form>
    </div>
  );
}

export default EditAnnounceForm;
