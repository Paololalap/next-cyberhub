import MoreInfo from "@/components/MoreInfo";

const getContentById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/content/${id}`, {
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

export default async function ViewMore({ params }) {
  const { id } = params;
  const { content } = await getContentById(id);
  const { title, tags, author, date, description, body, imageL } =
    content;

  return (
    <div className="h-max bg-[#f7f7e3]">
    <MoreInfo
      id={id}
      title={title}
      tags={tags}
      author={author}
      date={date}
      description={description}
      body={body}
      imageL={imageL}
    /></div>
  );
}
