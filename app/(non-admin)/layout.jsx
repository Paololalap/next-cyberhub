import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { openSans } from "@/fonts/fonts";

export default function ContentsLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer className={openSans.className} />
    </>
  );
}
