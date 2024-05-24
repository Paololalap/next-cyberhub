import { AuthProvider } from "@/providers/Providers";
import Footer from "@/components/footer/Footer";
import AdminHeader from "@/components/header/AdminHeader";
import { Toaster } from "@/components/ui/toaster";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { openSans } from "@/fonts/fonts";
import Unauthorized from "@/components/Unauthorize";

export default async function AdminLayout({ children }) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin") {
    return <Unauthorized />;
  }
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
