import { Montserrat } from "next/font/google";
import "./globals.css";
import VideoBackground from "@/components/VideoBackground";
import DownloadProvider from "@/components/DownloadProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SWRegister from "@/components/SWRegister";
import { SITE_URL, SITE_DESC } from "@/lib/site";

const font = Montserrat({ subsets: ["latin"], variable: "--font-sans" });

const SITE_FULL_NAME = "SociaLens Download";
const TITLE = "SociaLens Download – 3D Social App for Windows, Mac, Linux, Android & iPhone";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: "%s | SociaLens" },
  description: SITE_DESC,
  keywords: ["SociaLens", "SociaLens app", "SociaLens download", "3D social app", "social media app", "chat and video calls"],
  applicationName: SITE_FULL_NAME,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website", siteName: SITE_FULL_NAME, title: TITLE, description: SITE_DESC, url: "/",
    images: [{ url: "/blog/hero.jpg", width: 1200, height: 750, alt: "SociaLens app" }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: SITE_DESC, images: ["/blog/hero.jpg"] },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/icons/icon-192.png",
  },
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
