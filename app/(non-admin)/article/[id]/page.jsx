import Article from "@/components/Article";

const getContentById = async (id) => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/content/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topic");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export default async function ArticlePage({ params }) {
  const { id } = params;
  const { content } = await getContentById(id);
  const { title, tags, author, date, body, imageL, link } = content;

  return (
    <div className="h-max bg-[#f7f7e3]">
      <Article
        id={id}
        title={title}
        tags={tags}
        author={author}
        date={date}
        body={body}
        link={link}
        imageL={imageL}
      />
    </div>
  );
}
