import EditContentForm from "@/components/form/EditContent";

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

export default async function EditContent({ params }) {
  const { id } = params;
  const { content } = await getContentById(id);
  const { title, tags, author, date, link, description, body, imageL, type } =
    content;

  return (
    <div className="pt-10">
      <EditContentForm
        id={id}
        title={title}
        tags={tags}
        author={author}
        date={date}
        link={link}
        description={description}
        body={body}
        imageL={imageL}
        type={type}
      />
    </div>
  );
}
