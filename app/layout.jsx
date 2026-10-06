import { Montserrat } from "next/font/google";
import "./globals.css";
import VideoBackground from "@/components/VideoBackground";
import DownloadProvider from "@/components/DownloadProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SWRegister from "@/components/SWRegister";

const font = Montserrat({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = {
  title: "SociaLens — Connect with the world",
  description: "SociaLens is a next-gen 3D social platform. Download for Windows, macOS, Linux, Android and iPhone.",
  manifest: "/manifest.json",
  icons: { icon: "/icons/icon-192.png", apple: "/icons/icon-192.png" },
  appleWebApp: { capable: true, title: "SociaLens", statusBarStyle: "black-translucent" },
};
export const viewport = { themeColor: "#05010a", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={font.variable}>
      <body>
        <VideoBackground />
        <DownloadProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </DownloadProvider>
        <SWRegister />
      </body>
    </html>
  );
}
