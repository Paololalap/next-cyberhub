"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  newFirstName: z.string(),
  newLastName: z.string(),
  newUsername: z.string(),
  newProfilePic: z.string(),
});

export default function EditContentForm({
  firstName,
  lastName,
  username,
  profilePic,
}) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newFirstName: firstName,
      newLastName: lastName,
      newUsername: username,
      newProfilePic: profilePic,
    },
  });

  const router = useRouter();

  const onSubmit = async () => {
    try {
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
    if (file) {
      const image = await imageBase64(file);
      form.setValue("newProfilePic", image);
    }
  };

  return (
    <Form {...form}>
      <form
        className="w-96 rounded-lg border-t-[6px] border-[#8a1538] p-4 shadow-2xl sm:w-[30rem] md:w-auto"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <h1 className="mx-auto mt-3 w-full text-center text-3xl">
          Update User
        </h1>
        <Avatar className="mx-auto size-[250px] border-2 border-black">
          <AvatarImage src={profilePic} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <FormField
          control={form.control}
          name="newProfilePic"
          render={() => (
            <FormItem>
              <FormLabel>Picture</FormLabel>
              <FormControl>
                <Input type="file" onChange={(e) => handleUploadImage(e)} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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

        <Button type="submit">Update</Button>
      </form>
    </Form>
  );
}
