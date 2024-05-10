import { AuthProvider } from "@/app/Providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function UserLayout({ children }) {
  return (
    <>
      <AuthProvider>
        <Header />
        <main>{children}</main>
        <Footer/>
      </AuthProvider>
    </>
  );
}
