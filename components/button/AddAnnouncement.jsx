import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AddAnnouncementButton() {
  return (
    <Link href={"/add-announcement"} tabIndex={-1} className="mx-auto mt-5">
      <Button
        className="bg-[#8a1438] hover:bg-[#8a1438]/90"
        aria-label="add news button"
      >
        Add Announcement
      </Button>
    </Link>
  );
}
