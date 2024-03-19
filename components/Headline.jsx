import Link from "next/link";
import Image from "next/image";
import GError from "@/app/news/error";
const getHeadline = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/content", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(GError);
    }

    return res.json();
  } catch (error) {
    console.log("Something went wrong! ", error);
  }
};
export default async function headline() {
  const { content } = await getHeadline();

  return content.map((t) => (
    <div key={t._id} className="sm:mx-52">
      <Link href={t.link} target="_blank">
        <div
          id="headline-container"
          className="group p-1 overflow-hidden bg-white border-2 border-solid border-[#00563F] rounded-md  sm:flex sm:flex-row"
        >
          <div
            id="headline-image"
            className="hover:scale-[1.03] transition-all  sm:w-3/5 "
          >
            <Image
              className="rounded-md"
              src={t.imageL}
              alt="/"
              width={640}
              height={334}
              sizes="(min-width: 680px) 640px, calc(94.44vw + 17px)"
            />
          </div>
          <div
            id="headline-content"
            className="flex flex-col justify-between p-5 sm:w-2/5 sm:p-5"
          >
            <div className="flex flex-col">
              <div
                id="headline-title"
                className="group-hover:underline font-bold text-gray-500 "
              >
                {t.title}
              </div>
              <div className="flex flex-row mb-5 ">
                <div id="headline-date" className="text-sm mr-10">
                  <span> {t.date}</span>
                </div>
                <div id="headline-tags" className="text-sm">
                  <span> {t.tags.join(" / ").replace(/,/g, "/,")} </span>
                </div>
              </div>
              <div id="headline-description">
                <span>{t.description}</span>
              </div>
            </div>
            <div id="readmore" className="flex flex-row-reverse">
              <span>Read more</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
   ));
 }  