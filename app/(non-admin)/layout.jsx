import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { openSans } from "@/fonts/fonts";
import { AuthProvider } from "@/providers/Providers";

export default function ContentsLayout({ children }) {
  return (
    <>
      <AuthProvider>
        <Header />
        <main className="bg-[#f7f7e3]">{children}</main>
      </AuthProvider>
      <Footer className={openSans.className} />
    </>
  );
}
