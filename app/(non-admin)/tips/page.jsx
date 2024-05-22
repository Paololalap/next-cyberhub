import GetData from "./_get-data";

export default async function TipsPage({ searchParams }) {
  return (
    <div className="mx-auto flex min-h-screen w-fit flex-col">
      <div className="mt-5 text-center text-3xl font-black">
        Tips and Guides
      </div>
      <hr className="mx-auto mb-5 mt-3 w-64 border-2 border-solid border-[#FFB61B]" />
      <GetData searchParams={searchParams} />
    </div>
  );
}
