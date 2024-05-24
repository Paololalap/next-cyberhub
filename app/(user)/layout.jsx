import { AuthProvider } from "@/providers/Providers";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

export default function UserLayout({ children }) {
  return (
    <>
      <AuthProvider>
        <Header />
        <main>{children}</main>
        <Footer />
      </AuthProvider>
    </>
  );
}
