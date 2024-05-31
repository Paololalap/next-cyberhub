import LatestAnnouncement from "@/components/LatestAnnouncement";
import LatestNews from "@/components/LatestNews";
import LatestTips from "@/components/LatestTips";

export default function HomePage() {
  return (
    <>
      <LatestAnnouncement />
      <div className="md:mx-auto md:flex md:max-w-[75rem]">
        <LatestNews />
        <LatestTips />
      </div>
    </>
  );
}
