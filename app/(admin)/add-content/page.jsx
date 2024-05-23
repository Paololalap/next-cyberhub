"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AddContentPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState(
    () => new Date().toISOString().split("T")[0],
  );
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const [imageL, setImageL] = useState("");
  const [type, setType] = useState("News");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const onSubmit = async () => {
    setIsLoading(true);
    if (!title || !author || !description || !body) {
      toast({ variant: "Warning", description: "All fields are required" });
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/content", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          title,
          tags,
          author,
          date,
          link,
          description,
          body,
          imageL,
          type,
        }),
      });
      const data = await res.json();
      console.log(data);

      if (res.ok) {
        router.push("/");
        toast({ variant: "Success", description: "Add Successful" });
      } else {
        throw toast({ variant: "Error", description: "Failed to Post" });
      }
    } catch (error) {
      toast({ variant: "Error", description: "Failed to Post" });
      console.log(error);
    }
    setIsLoading(false);
  };

  const handleTagsChange = (e) => {
    const tagsInput = e.target.value;
    const tagsArray = tagsInput.split(/[,\s]+/);
    setTags(tagsArray);
  };

  const handleBackspace = (e) => {
    if (e.keyCode === 8 || e.target.value === " ") {
      setTags((prevTags) => prevTags.slice(0, -1));
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
    setImageL(image);
  };

  return (
    <div className="w-screen px-3 pt-10 md:px-0">
      <form
        className="mx-auto rounded-lg border-t-[6px] border-[#8a1538] p-4 shadow-2xl sm:w-fit"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="mx-auto mt-3 w-full text-center text-3xl font-bold">
          New Entry
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
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
              <label
                htmlFor="title"
                className="absolute -top-3.5 left-0 cursor-text text-sm  text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
              >
                Title:
              </label>
            </div>
            <div className="mt-2 w-full md:h-auto">
              <Textarea
                {...register("body")}
                placeholder="Say something here..."
                className="mt-2 cursor-text resize-none rounded-lg p-2 text-gray-900 focus:outline-none focus-visible:ring-0 md:min-h-[10rem] md:min-w-[30rem] md:resize"
                id="body"
                onChange={(e) => setBody(e.target.value)}
                value={body}
              />
            </div>
            <div className="relative mt-6">
              <input
                {...register("tags")}
                placeholder="Tags"
                id="tags"
                type="text"
                className="peer h-10 w-full cursor-text border-b-2 border-gray-200 text-gray-900 placeholder-transparent placeholder:select-none focus:border-[#8a1538] focus:outline-none"
                onChange={handleTagsChange}
                onKeyUp={handleBackspace}
                value={tags.join(", ")}
              />
              <label
                htmlFor="tags"
                className="absolute -top-3.5 left-0 cursor-text text-sm  text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
              >
                Tags:
              </label>
            </div>
            <div className="relative mb-3 mt-6">
              <input
                {...register("author")}
                placeholder="Author"
                id="author"
                type="text"
                className="peer h-10 w-full cursor-text border-b-2 border-gray-200 text-gray-900 placeholder-transparent placeholder:select-none focus:border-[#8a1538] focus:outline-none"
                onChange={(e) => setAuthor(e.target.value)}
                value={author}
              />
              <label
                htmlFor="author"
                className="absolute -top-3.5 left-0 cursor-text text-sm  text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
              >
                Author:
              </label>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !date && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  {...register("date")}
                />
              </PopoverContent>
            </Popover>
            <div className="relative mt-6">
              <input
                {...register("link")}
                placeholder="Link"
                id="link"
                type="text"
                className="peer h-10 w-full cursor-text border-b-2 border-gray-200 text-gray-900 placeholder-transparent placeholder:select-none focus:border-[#8a1538] focus:outline-none"
                onChange={(e) => setLink(e.target.value)}
                value={link}
              />
              <label
                htmlFor="link"
                className="absolute -top-3.5 left-0 cursor-text text-sm  text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
              >
                Link:
              </label>
            </div>
            <div className="relative mt-1">
              <textarea
                {...register("description")}
                placeholder="Description"
                className="peer mt-6 w-full cursor-text resize-none border-b-2 border-gray-200 text-gray-900 placeholder-transparent placeholder:select-none focus:border-[#8a1538] focus:outline-none"
                rows="4"
                cols="50"
                id="description"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
              <label
                htmlFor="description"
                className="absolute left-0 top-1 cursor-text text-sm text-gray-600 transition-all peer-placeholder-shown:top-6  peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-gray-600"
              >
                Description:
              </label>
            </div>
            <Input
              type="file"
              {...register("attachFile")}
              onChange={handleUploadImage}
              accept="image/jpeg, image/jpg, image/png"
              className="w-fit"
            />
            <div className="relative mt-3 inline-block ">
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="News">News</SelectItem>
                    <SelectItem value="Tips">Tips</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>
        <div className="flex justify-end">
          <Button
            type="submit"
            className="mt-3 w-fit rounded-md border bg-[#8a1538] px-5 text-center text-sm text-[#FFB61B] transition-all hover:bg-[#8a1538]/90"
          >
            {isLoading && <Loader2 className="mr-2 size-5 animate-spin" />}
            Publish
          </Button>
        </div>
      </form>
    </div>
  );
}
