import GetData from "./_get-data";
import AddEntry from "@/components/button/AddEntry";

export default function ManageNewsPage({ searchParams }) {
  return (
    <div className="flex min-h-screen w-screen flex-col bg-[#f7f7e3]">
      <div className="mt-5 text-center text-3xl font-black">Manage News and Updates</div>
      <hr className="mx-auto mt-3 w-64 border-2 border-solid border-[#FFB61B]" />
      <AddEntry>Add News Entry</AddEntry>

      <GetData searchParams={searchParams} />
    </div>
  );
}
