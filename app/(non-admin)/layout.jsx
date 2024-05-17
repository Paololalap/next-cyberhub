import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { openSans } from "@/fonts/fonts";

export default function ContentsLayout({ children }) {
  return (
    <>
      <Header />
      <main className="bg-[#f7f7e3]">{children}</main>
      <Footer className={openSans.className} />
    </>
  );
}
