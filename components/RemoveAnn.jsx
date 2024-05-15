"use client";

import { useRouter } from "next/navigation";

export default function RemoveAnn({ id }) {
  const router = useRouter();
  const removeContent = async () => {
    const confirmed = confirm("Are you sure?");

    if (confirmed) {
      const res = await fetch(
        `http://localhost:3000/api/announces?id=${id}`,
        {
          method: "DELETE",
        });

      if (res.ok) {
        router.refresh();
      }
    }
  };

  return (
    <button
      onClick={removeContent}
      className="mx-1 rounded-md border-2 border-solid border-[#00563F] p-2"
    >
      Delete
    </button>
  );
}
