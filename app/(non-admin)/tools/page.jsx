import PasswordChecker from "@/components/PasswordChecker";
import Urlchecker from "@/components/Urlchecker";
export default function ToolsPage() {
  return (
    <div className="h-max  items-center bg-[#f7f7e3]">
      <PasswordChecker />
      <Urlchecker></Urlchecker>
    </div>
  );
}
