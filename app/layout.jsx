import { Toaster } from "@/components/ui/toaster";
import { openSans } from "@/fonts/fonts";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";

export const metadata = {
  title: "Cyberhub",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen w-screen overflow-x-hidden", openSans.className)}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
