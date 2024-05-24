"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Loader2 } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";

function EditContentForm({
  id,
  title,
  tags,
  author,
  date,
  link,
  description,
  body,
  imageL,
  type,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [newTitle, setNewTitle] = useState(title);
  const [newTags, setNewTags] = useState(tags);
  const [newAuthor, setNewAuthor] = useState(author);
  const [newDate, setNewDate] = useState(date);
  const [newLink, setNewLink] = useState(link);
  const [newDescription, setNewDescription] = useState(description);
  const [newBody, setNewBody] = useState(body);
  const [newImageL, setNewImageL] = useState(imageL);
  const [newType, setNewType] = useState(type);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleTagsChange = (e) => {
    const tagsInput = e.target.value;
    const tagsArray = tagsInput.split(/[,\s]+/);
    setNewTags(tagsArray);
  };

  const handleBackspace = (e) => {
    if (e.keyCode === 8 || e.target.value === " ") {
      setTags((prevTags) => prevTags.slice(0, -1));
    }
  };

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXTAUTH_URL}/api/content/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          newTitle,
          newDescription,
          newTags,
          newAuthor,
          newDate,
          newLink,
          newBody,
          newImageL,
          newType,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update topic");
      }

      router.refresh();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
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
    setNewImageL(image);
  };

  return (
    <div className="w-screen px-3 pt-10 md:px-0">
      <form
        className="mx-auto rounded-lg border-t-[6px] border-[#8a1538] p-4 shadow-2xl sm:w-fit"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="mx-auto mt-3 w-full text-center text-3xl font-bold">
          Update Content
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
                onChange={(e) => setNewTitle(e.target.value)}
                value={newTitle}
              />
              <label
                htmlFor="title"
                className="absolute -top-3.5 left-0 cursor-text text-sm  text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
              >
                Title:
              </label>
            </div>
            <div className="mt-2 w-full md:h-auto">
              <Label htmlFor="content" className="text-sm text-gray-600">
                Body:
              </Label>
              <Textarea
                {...register("body")}
                placeholder="Say something here..."
                className="cursor-text resize-none rounded-lg p-2 text-gray-900 focus:outline-none focus-visible:ring-0 md:min-h-[10rem] md:min-w-[30rem] md:resize"
                id="body"
                onChange={(e) => setNewBody(e.target.value)}
                value={newBody}
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
                value={newTags.join(", ")}
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
                onChange={(e) => setNewAuthor(e.target.value)}
                value={newAuthor}
              />
              <label
                htmlFor="author"
                className="absolute -top-3.5 left-0 cursor-text text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
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
                    !newDate && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {newDate ? format(newDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={newDate}
                  onSelect={setNewDate}
                  initialFocus
                  {...register("newDate")}
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
                onChange={(e) => setNewLink(e.target.value)}
                value={newLink}
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
                onChange={(e) => setNewDescription(e.target.value)}
                value={newDescription}
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
              <span className="text-sm text-gray-400">Type:</span>
              <Select value={newType} onValueChange={setNewType}>
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
            Update
          </Button>
        </div>
      </form>
    </div>
  );
}

export default EditContentForm;
