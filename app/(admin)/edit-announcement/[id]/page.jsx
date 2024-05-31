import EditAnnounceForm from "@/components/form/EditAnnouncement";

const getAnnouncementById = async (id) => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/announces/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch announcement");
    }

    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default async function EditAnnouncement({ params }) {
  const { id } = params;

  const announce = await getAnnouncementById(id);
  if (!announce) {
    return <div>Error loading announcement</div>;
  }

  const { title, content, startDate, endDate } = announce;

  return (
    <div className="pt-10">
      <EditAnnounceForm
        id={id}
        title={title}
        content={content}
        startDate={startDate}
        endDate={endDate}
      />
    </div>
  );
}
