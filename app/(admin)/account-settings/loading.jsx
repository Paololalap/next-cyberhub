import { Avatar } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="mx-auto mt-5 w-screen max-w-[24rem] space-y-2 rounded-lg border-t-[6px] border-[#8a1538] p-4 shadow-2xl">
      <h1 className="mx-auto mb-5 mt-3 w-full text-center text-3xl">
        Update User
      </h1>
      <Avatar className="group relative mx-auto size-[250px] cursor-pointer overflow-hidden border-2 border-black">
        <Skeleton className="size-full rounded-full" />
      </Avatar>
      <div className="mt-2">First Name</div>
      <Skeleton className="w-full h-[40px] mt-2"/>
      <div className="mt-2">Last Name</div>
      <Skeleton className="w-full h-[40px] mt-2"/>
      <div className="mt-2">Username</div>
      <Skeleton className="w-full h-[40px] mt-2"/>
      <Skeleton className="w-[80px] h-[40px] mt-2"/>
    </div>
  );
}
