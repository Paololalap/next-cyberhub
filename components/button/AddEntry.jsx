import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AddEntry({ children }) {
  return (
    <Link href={"/add-content"} tabIndex={-1} className="mx-auto">
      <Button
        className="bg-[#8a1438] hover:bg-[#8a1438]/90"
        aria-label="add news button"
      >
        {children}
      </Button>
    </Link>
  );
}
