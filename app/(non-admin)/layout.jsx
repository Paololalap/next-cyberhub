import { Open_Sans } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const openSans = Open_Sans({ subsets: ["latin"] });

export default function ContentsLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer className={openSans.className} />
    </>
  );
}
