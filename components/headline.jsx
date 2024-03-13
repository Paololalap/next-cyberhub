
const getHeadline = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/content", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading topics: ", error);
  }
};
export default async function headline() {
  const { content } = await getHeadline();
  return content.map((t) => (
    <div key={t._id}>
      <a href={t.link} target="_blank">
        <div
          id="headline-container"
          className="group border-2 sm:border-black sm:mx-52 sm:flex sm:flex-row"
        >
          <div id="headline-image" className="sm:w-3/5  ">
            <img className="rounded-md" src={t.imageL} />
          </div>
          <div id="headline-content" className="p-5 sm:w-2/5 sm:p-5">
            <div
              id="headline-title"
              className="group-hover:underline font-bold "
            >
              {t.title}
            </div>
            <div className="flex flex-row mb-5 ">
              <div id="headline-date" className="mr-10">
                <span> {t.date}</span>
              </div>
              <div id="headline-tags">
                <span> {t.tags} </span>
              </div>
            </div>
            <div id="headline-description">
              <span>{t.description}</span>
            </div>
            <div id="readmore" className="flex flex-row-reverse">
              <span>Read more</span>
            </div>
          </div>
        </div>
      </a>
    </div>
  ));
};

 
