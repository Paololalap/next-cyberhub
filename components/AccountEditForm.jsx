"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function EditContentForm({ firstName, lastName, username, profilePic }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [newFirstName, setNewFirstName] = useState(firstName);
  const [newLastName, setNewLastName] = useState(lastName);
  const [newUsername, setNewUsername] = useState(username);
  const [newProfilePic, setNewProfilePic] = useState(profilePic);

  const router = useRouter();

  const onSubmit = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/admin-user", {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          newFirstName,
          newLastName,
          newUsername,
          newProfilePic,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update user");
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
    setNewProfilePic(image);
  };

  return (
    <div className="grid min-h-screen place-items-center mt-2">
      <form
        className="w-96 rounded-lg border-t-[6px] border-[#8a1538] p-4 shadow-2xl sm:w-[30rem] md:w-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="mx-auto mt-3 w-full text-center text-3xl">
          Update User
        </h1>
        <Avatar className="size-[250px] mx-auto border-2 border-black">
          <AvatarImage src={profilePic} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <input
          type="file"
          {...register("attachFile")}
          onChange={handleUploadImage}
          className="block w-full text-sm text-slate-500
              file:mr-4 file:rounded-full file:border-0 file:bg-[#8a1538] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[#FFB61B] hover:file:scale-[1.01] hover:file:cursor-pointer hover:file:bg-[#00563F]"
        />
        <div className="relative mt-6">
          <input
            {...register("newFirstName")}
            placeholder="First Name"
            id="newFirstName"
            type="text"
            className="peer h-10 w-full cursor-text border-b-2 border-gray-200 text-gray-900 placeholder-transparent placeholder:select-none focus:border-[#8a1538] focus:outline-none"
            onChange={(e) => setNewFirstName(e.target.value)}
            value={newFirstName}
          />
          <label
            htmlFor="newFirstName"
            className="absolute -top-3.5 left-0 cursor-text text-sm  text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
          >
            First Name:
          </label>
        </div>
        <div className="relative mt-6">
          <input
            {...register("newLastName")}
            placeholder="Last Name"
            id="newLastName"
            type="text"
            className="peer h-10 w-full cursor-text border-b-2 border-gray-200 text-gray-900 placeholder-transparent placeholder:select-none focus:border-[#8a1538] focus:outline-none"
            onChange={(e) => setNewLastName(e.target.value)}
            value={newLastName}
          />
          <label
            htmlFor="newLastName"
            className="absolute -top-3.5 left-0 cursor-text text-sm  text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
          >
            Last Name:
          </label>
        </div>
        <div className="relative mt-6">
          <input
            {...register("newUsername")}
            placeholder="Username"
            id="newUsername"
            type="text"
            className="peer h-10 w-full cursor-text border-b-2 border-gray-200 text-gray-900 placeholder-transparent placeholder:select-none focus:border-[#8a1538] focus:outline-none"
            onChange={(e) => setNewUsername(e.target.value)}
            value={newUsername}
          />
          <label
            htmlFor="newUsername"
            className="absolute -top-3.5 left-0 cursor-text text-sm  text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
          >
            Username:
          </label>
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

export default EditContentForm;
