import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ReadMore({ id }) {
  return (
    <Link href={`/article/${id}`} tabIndex={-1}>
      <Button
        className="bg-[#8a1438] hover:bg-[#8a1438]/90"
      >
        Read more
      </Button>
    </Link>
  );
}
