"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function RemoveBtn({ id,className }) {
  const router = useRouter();
  const removeContent = async () => {
    const confirmed = confirm("Are you sure?");

    if (confirmed) {
      const res = await fetch(`http://localhost:3000/api/content?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh();
      }
    }
  };

  return (
    <Button onClick={removeContent} className={className} variant={"outline"}>
      Delete
    </Button>
  );
}
