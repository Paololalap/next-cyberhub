import PasswordChecker from "@/components/PasswordChecker";
import UrlChecker from "@/components/UrlChecker";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

export default function ToolsPage() {
  return (
    <div className="min-h-max w-screen grid place-items-center py-5">
      <Suspense fallback={<Loader2 className="mx-auto size-14 animate-spin" />}>
        <PasswordChecker />
      </Suspense>

      <Suspense fallback={<Loader2 className="mx-auto size-14 mt-20 animate-spin" />}>
        <UrlChecker />
      </Suspense>
    </div>
  );
}
