import { AuthProvider } from "@/app/Providers";

export default function UserLayout({ children }) {
  return (
    <>
      <AuthProvider>{children}</AuthProvider>
    </>
  );
}
