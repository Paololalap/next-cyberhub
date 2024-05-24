"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Loading from "./loading";

const formSchema = z.object({
  newFirstName: z.string(),
  newLastName: z.string(),
  newUsername: z.string(),
  newProfilePic: z.string(),
});

async function getUserData() {
  try {
    const response = await fetch("http://localhost:3000/api/admin-user", {
      headers: {
        "Cache-Control": "no-store",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }

    const responseData = await response.json();

    if (!responseData || !responseData.user) {
      throw new Error("User data is missing");
    }

    return responseData.user;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default function AccountSettingsPage() {
  const { toast } = useToast();
  const [user, setUser] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newFirstName: "",
      newLastName: "",
      newUsername: "",
      newProfilePic: "",
    },
  });

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const { newFirstName, newLastName, newUsername, newProfilePic } =
        form.getValues();
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
      setIsLoading(false);
      toast({
        variant: "Success",
        title: "Update profile success!",
      });
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
    if (file && file.type.startsWith("image/")) {
      const image = await imageBase64(file);
      setSelectedImage(image);
      form.setValue("newProfilePic", image);
    } else {
      alert("Please select an image file.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUserData();
      setUser(userData);
      if (userData) {
        form.reset({
          newFirstName: userData.firstName,
          newLastName: userData.lastName,
          newUsername: userData.username,
          newProfilePic: userData.profilePic,
        });
        setSelectedImage(userData.profilePic);
      }
    };
    fetchData();
  }, []);

  if (!user) {
    return <Loading />; // Return null or a loading indicator while data is being fetched
  }

  return (
    <Form {...form}>
      <form
        className="mx-auto mt-5 w-full max-w-[24rem] space-y-2 rounded-lg border-t-[6px] border-[#8a1538] p-4 shadow-2xl sm:w-[30rem] md:w-auto"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <h1 className="mx-auto mb-5 mt-3 w-full text-center text-3xl">
          Update User
        </h1>
        <Avatar
          className="group relative mx-auto size-[250px] cursor-pointer overflow-hidden border-2 border-black"
          onClick={() => {
            const fileInput = document.createElement("input");
            fileInput.type = "file";
            fileInput.accept = "image/*";
            fileInput.addEventListener("change", handleUploadImage);
            fileInput.click();
          }}
        >
          <Image
            src={selectedImage}
            alt="Profile Picture"
            fill
            className="rounded-full object-cover"
            priority
          />
          <AvatarFallback>A</AvatarFallback>
          <div className="invisible absolute size-full rounded-full bg-black/40 transition-all group-hover:visible">
            <Pencil className="absolute left-1/2 top-1/2 z-50 size-10 -translate-x-1/2 -translate-y-1/2 text-white" />
          </div>
        </Avatar>

        <FormField
          control={form.control}
          name="newFirstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="newLastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="newUsername"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="bg-[#8a1538] hover:bg-[#8a1538]/90">
          {isLoading && <Loader2 className="mr-2 size-5 animate-spin" />}
          Update
        </Button>
      </form>
    </Form>
  );
}
