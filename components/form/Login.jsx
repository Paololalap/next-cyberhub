"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Eye, KeyRound, User } from "lucide-react";
import LogoCircle from "@/public/logo-circle.png";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Image from "next/image";

const formSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export default function LoginForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async () => {
    const { username, password } = form.getValues();
    try {
      const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (res.error) {
        toast({ variant: "Error", description: "Wrong Credentials" });
        return;
      }
      toast({ variant: "Success", description: "Welcome Admin" });
      router.replace("/manage-news");
    } catch (error) {
      toast({ variant: "Error", description: "Failed to Login" });
      console.log(error);
    }
  };

  return (
    <div className="absolute left-1/2 flex min-h-[80vh] -translate-x-1/2 flex-col justify-center bg-white md:left-auto md:right-0 md:min-h-screen md:-translate-x-0 gap-y-10">
      <div className="mx-auto flex items-center gap-x-2">
        <Image src={LogoCircle} alt="UPOU Logo" className="size-[8rem]" />
        <span className="font-bold text-3xl md:text-4xl">Cyberhub</span>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-screen max-w-[420px] space-y-2 px-10"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="group relative">
                    <User className="absolute left-2 top-1/2 size-5 -translate-y-1/2 text-zinc-500 group-focus-within:text-black" />
                    <Input
                      className="pl-9 shadow-inner"
                      placeholder="Username or email"
                      {...field}
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="group relative">
                    <KeyRound className="absolute left-2 top-1/2 size-5 -translate-y-1/2 text-zinc-500 group-focus-within:text-black" />
                    <Input
                      className="px-9 shadow-inner"
                      placeholder="Password"
                      type={showPassword ? "text" : "password"}
                      {...field}
                    />
                    <div className="absolute right-2 top-1/2 grid size-7 -translate-y-1/2 cursor-pointer place-items-center rounded-full group-hover:bg-zinc-200">
                      <Eye
                        className="z-10 size-5 text-zinc-500 group-focus-within:text-black"
                        onClick={() => setShowPassword((prev) => !prev)}
                      />
                    </div>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="h-[57.6px] w-full rounded-[5px] border-[0.8px] bg-[#BA4064] text-[16px] font-medium text-[#E7C6CF] hover:bg-[#70263c]"
          >
            Log in
          </Button>
        </form>
      </Form>
    </div>
  );
}
