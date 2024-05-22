import GetData from "./_get-data";

export default function NewsPage({ searchParams }) {
  return (
    <div className="mx-auto flex min-h-screen w-fit flex-col">
      <div className="mt-5 break-all text-center text-3xl font-black">
        News and Updates
      </div>
      <hr className="mx-auto mb-5 mt-3 w-screen max-w-64 border-2 border-solid border-[#FFB61B]" />
      <GetData searchParams={searchParams} />
    </div>
  );
}
