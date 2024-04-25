import { Open_Sans } from "next/font/google";
import { AuthProvider } from "@/app/Providers";
import Footer from "@/components/Footer";
import AdminHeader from '@/components/AdminHeader'
import { Toaster } from "@/components/ui/toaster";
const openSans = Open_Sans({ subsets: ["latin"] });

export default function AdminLayout({ children }) {
  return (
    <>
      <AuthProvider>
        <AdminHeader />
        {children}
        <Toaster />
      </AuthProvider>
      <Footer className={openSans.className} />
    </>
  );
}
