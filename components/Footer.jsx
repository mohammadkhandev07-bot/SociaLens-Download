"use client";
import Link from "next/link";
import { useDownload } from "./DownloadProvider";
export default function Footer() {
  const { startDownload } = useDownload();
  return (
    <footer className="mx-auto mt-10 max-w-6xl border-t border-white/10 px-6 py-8">
      <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="SociaLens logo" className="h-11 w-11 object-contain" />
          <div><p className="font-bold">SociaLens</p><p className="text-xs text-white/55">Connect. Discover. Share.</p></div>
        </div>
        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-white/70">
          <Link href="/" className="hover:text-white">Home</Link>
          <Link href="/support" className="hover:text-white">Support</Link>
          <Link href="/core" className="hover:text-white">SociaLens Core</Link>
          <Link href="/blog" className="hover:text-white">Blog</Link>
          <button onClick={startDownload} className="hover:text-white">Download</button>
        </nav>
      </div>
      <p className="mt-6 text-center text-xs text-white/45">© {new Date().getFullYear()} SociaLens. All rights reserved.</p>
    </footer>
  );
}
