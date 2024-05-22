import PasswordChecker from "@/components/PasswordChecker";
import UrlChecker from "@/components/UrlChecker";

export default function ToolsPage() {
  return (
    <div className="grid w-screen place-items-center py-5">
      <div className="text-center text-3xl font-black">
        Tools
      </div>
      <hr className="mx-auto mb-5 mt-3 w-64 border-2 border-solid border-[#FFB61B]" />
      <PasswordChecker />
      <UrlChecker />
    </div>
  );
}
