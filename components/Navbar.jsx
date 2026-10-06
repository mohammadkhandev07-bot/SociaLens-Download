"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { useDownload } from "./DownloadProvider";

const LINKS = [["/", "Home"], ["/support", "Support"], ["/core", "SociaLens Core"], ["/blog", "Blog"]];

export default function Navbar() {
  const path = (usePathname() || "/").replace(/(.)\/$/, "$1");
  const [open, setOpen] = useState(false);
  const { startDownload } = useDownload();
  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-6">
      <nav className="glass mx-auto flex max-w-6xl items-center justify-between gap-2 !rounded-2xl bg-white/[0.08] px-3 py-2.5 backdrop-blur-xl sm:px-6 sm:py-3">
        <Link href="/" className="flex min-w-0 items-center gap-2">
          <img src="/logo.png" alt="SociaLens logo" className="h-9 w-9 shrink-0 object-contain sm:h-10 sm:w-10" />
          <span className="truncate text-lg font-bold tracking-tight sm:text-xl">SociaLens</span>
        </Link>
        <ul className="hidden items-center gap-9 md:flex">
          {LINKS.map(([href, label]) => (
            <li key={href}>
              <Link href={href} className={`relative pb-1 text-sm font-semibold transition ${path === href ? "text-white" : "text-white/65 hover:text-white"}`}>
                {label}
                {path === href && (
                  <motion.span layoutId="nav-underline" className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-fuchsia-400 to-violet-400 shadow-[0_0_10px_#d946ef]" />
                )}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex shrink-0 items-center gap-1.5">
          <button onClick={startDownload} aria-label="Download SociaLens" className="btn-neon !px-3.5 !py-2 text-sm sm:!px-5">
            <Download size={16} /><span className="hidden min-[420px]:inline">Download</span>
          </button>
          <button className="p-2 md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">{open ? <X /> : <Menu />}</button>
        </div>
      </nav>
      {open && (
        <div className="glass mx-auto mt-2 max-w-6xl !rounded-2xl bg-black/40 p-3 backdrop-blur-xl md:hidden">
          {LINKS.map(([href, label]) => (
            <Link key={href} href={href} onClick={() => setOpen(false)} className={`block rounded-xl px-4 py-3 font-semibold ${path === href ? "bg-white/10" : "text-white/70"}`}>{label}</Link>
          ))}
        </div>
      )}
    </header>
  );
}
