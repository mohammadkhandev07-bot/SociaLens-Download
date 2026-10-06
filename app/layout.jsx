import { Montserrat } from "next/font/google";
import "./globals.css";
import VideoBackground from "@/components/VideoBackground";
import DownloadProvider from "@/components/DownloadProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SWRegister from "@/components/SWRegister";
import { SITE_URL, SITE_NAME, SITE_DESC } from "@/lib/site";

const font = Montserrat({ subsets: ["latin"], variable: "--font-sans" });

const TITLE = "SociaLens – Download the 3D Social App for Windows, Mac, Linux, Android & iPhone";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: "%s | SociaLens" },
  description: SITE_DESC,
  keywords: ["SociaLens", "SociaLens app", "SociaLens download", "3D social app", "social media app", "chat and video calls"],
  applicationName: SITE_NAME,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website", siteName: SITE_NAME, title: TITLE, description: SITE_DESC, url: "/",
    images: [{ url: "/blog/hero.jpg", width: 1200, height: 750, alt: "SociaLens app" }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: SITE_DESC, images: ["/blog/hero.jpg"] },
  manifest: "/manifest.json",
  icons: { icon: "/icons/icon-192.png", apple: "/icons/icon-192.png" },
  appleWebApp: { capable: true, title: "SociaLens", statusBarStyle: "black-translucent" },
};
export const viewport = { themeColor: "#05010a", width: "device-width", initialScale: 1 };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: SITE_NAME,
  applicationCategory: "SocialNetworkingApplication",
  operatingSystem: "Windows, macOS, Linux, Android, iOS",
  description: SITE_DESC,
  url: SITE_URL,
  image: `${SITE_URL}/logo.png`,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={font.variable}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
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
