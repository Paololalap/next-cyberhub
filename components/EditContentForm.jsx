"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";

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

  const onSubmit = async (e) => {
    try {
      const res = await fetch(`http://localhost:3000/api/content/${id}`, {
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
    <div className="grid min-h-screen place-items-center">
      <form
        className="w-96 rounded-lg border-t-[6px] border-[#8a1538] p-4 shadow-2xl sm:w-[30rem] md:w-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="mx-auto mt-3 w-full text-center text-3xl">
          Update Entry
        </h1>
        <section className="flex flex-col md:flex-row md:gap-4">
          <div className="flex flex-col">
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
                className="absolute -top-3.5 left-0 cursor-text text-sm  text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
              >
                Title:
              </label>
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
            <div className="relative mt-6">
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
                className="absolute -top-3.5 left-0 cursor-text text-sm  text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
              >
                Author:
              </label>
            </div>
            <input
              {...register("date")}
              id="date"
              type="date"
              className="mt-6 h-10 w-full cursor-text border-b-2 border-gray-200 transition-all focus:border-[#8a1538] focus:outline-none"
              onChange={(e) => setNewDate(e.target.value)}
              value={newDate}
            />
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
            <div className="relative">
              <textarea
                {...register("description")}
                placeholder="Description"
                className="peer mt-6 w-full cursor-text resize-none border-b-2 border-gray-200 text-gray-900 placeholder:select-none focus:border-[#8a1538] focus:outline-none"
                rows="4"
                cols="50"
                id="description"
                onChange={(e) => setNewDescription(e.target.value)}
                value={newDescription}
              />
            </div>
            <input
              type="file"
              {...register("attachFile")}
              onChange={handleUploadImage}
              className="block w-full text-sm text-slate-500
              file:mr-4 file:rounded-full file:border-0 file:bg-[#8a1538] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[#FFB61B] hover:file:scale-[1.01] hover:file:cursor-pointer hover:file:bg-[#00563F]"
            />
            <div className="relative mt-3 inline-block ">
              <span className="text-sm text-gray-400">Type:</span>
              <select
                className="block w-full appearance-none rounded border border-gray-300 bg-white px-2 py-1 text-sm leading-tight shadow  hover:border-gray-400 focus:border-blue-300 focus:outline-none focus:ring"
                onChange={(e) => setNewType(e.target.value)}
                value={newType}
              >
                <option value="News">
                  News
                </option>
                <option value="Tips">Tips</option>
              </select>
            </div>
          </div>
          <div className="flex h-[40vh] w-full items-start justify-start sm:justify-end md:h-auto md:w-[75%] ">
            <textarea
              {...register("body")}
              className="mt-6 h-full w-full cursor-text resize-none rounded-lg border-2 border-gray-200 p-2 text-gray-900 focus:border-[#8a1538]  focus:outline-none md:h-[96%]"
              id="body"
              onChange={(e) => setNewBody(e.target.value)}
              value={newBody}
            />
          </div>
        </section>

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

export default EditContentForm;
