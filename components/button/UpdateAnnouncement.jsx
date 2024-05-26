import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function UpdateButton({ id }) {
  return (
    <Link href={`/edit-announcement/${id}`} tabIndex={-1}>
      <Button
        aria-label="update button"
        className="bg-[#8a1438] hover:bg-[#8a1438]/90"
      >
        Update
      </Button>
    </Link>
  );
}
