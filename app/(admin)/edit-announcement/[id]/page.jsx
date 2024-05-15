import EditAnnounceForm from "@/components/EditAnnounceForm";

const getAnnouncementById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/announces/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch announcement");
    }

    return res.json();
  } catch (error) {
    console.error(error);
  }
};

export default async function EditAnnouncement({ params }) {
  const { id } = params;

  const { announces } = await getAnnouncementById(id);
  const { title, content, startDate, endDate } = announces;

  return (
    <EditAnnounceForm
      id={id}
      title={title}
      content={content}
      startDate={startDate}
      endDate={endDate}
    />
  );
}
