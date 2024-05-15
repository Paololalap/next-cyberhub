'use client'
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

function EditAnnounceForm({
  id,
  title,
  content,
  startDate,
  endDate,
  type,
}) {
  const { register, handleSubmit } = useForm();
  const [newTitle, setNewTitle] = useState(title);
  const [newContent, setNewContent] = useState(content);
  const [newStartDate, setNewStartDate] = useState(startDate);
  const [newEndDate, setNewEndDate] = useState(endDate);
  const router = useRouter();

  const onSubmit = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/announces/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          newTitle,
          newContent,
          newStartDate,
          newEndDate,
        }),
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
    <div className="grid min-h-screen place-items-center">
      <form
        className="w-96 rounded-lg border-t-[6px] border-[#8a1538] p-4 shadow-2xl sm:w-[30rem] md:w-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="mx-auto mt-3 w-full text-center text-3xl">
          Update Announcement
        </h1>
        <div className="relative mt-6">
          <input
            {...register("title")}
            placeholder="Title"
            id="title"
            type="text"
            className="peer h-10 w-full cursor-text border-b-2 border-gray-200 text-gray-900 placeholder-transparent placeholder:select-none focus:border-[#8a1538] focus:outline-none"
            onChange={(e) => setNewTitle(e.target.value)}
            value={newTitle}
          />
          <label
            htmlFor="title"
            className="absolute -top-3.5 left-0 cursor-text text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
          >
            Title:
          </label>
        </div>
        <textarea
          {...register("content")}
          placeholder="Content"
          className="mt-6 h-24 w-full cursor-text resize-none rounded-lg border-2 border-gray-200 p-2 text-gray-900 focus:border-[#8a1538]  focus:outline-none"
          onChange={(e) => setNewContent(e.target.value)}
          value={newContent}
        />
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
            onChange={(e) => setNewStartDate(e.target.value)}
            value={newStartDate}
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
            onChange={(e) => setNewEndDate(e.target.value)}
            value={newEndDate}
          />
        </div>
        <button
          type="submit"
          className="mt-5 h-9 w-full rounded-md border bg-[#8a1538] text-center text-sm text-[#FFB61B] transition-all hover:opacity-95"
        >
          Update
        </button>
      </form>
    </div>
  );
}

export default EditAnnounceForm;
