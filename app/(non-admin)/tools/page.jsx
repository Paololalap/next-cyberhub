import PasswordChecker from "@/components/PasswordChecker";
import UrlChecker from "@/components/UrlChecker";
export default function ToolsPage() {
  return (
    <div className="min-h-max w-fit items-center py-5">
      <PasswordChecker />
      <UrlChecker />
    </div>
  );
}
