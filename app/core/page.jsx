"use client";
import { Download } from "lucide-react";
import { CardArt } from "@/components/Mockups";
import { useDownload } from "@/components/DownloadProvider";

const CARDS = [
  { title: "What is SociaLens?", text: "Immersive 3D social platform to connect & share experiences.", bg: 1, kinds: ["logo", "feed"] },
  { title: "Secure & Private", text: "End-to-end encrypted, zero tracking.", bg: 2, kinds: ["profile"] },
  { title: "Seamless Sync", text: "One click download, sync all devices.", bg: 3, kinds: ["feed", "reels"] },
  { title: "Lightning Fast", text: "Built on Electron.js • 10x faster.", bg: 4, kinds: ["reels"] },
];

export default function Core() {
  const { startDownload } = useDownload();
  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="grid items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <h1 className="grad-text text-5xl font-extrabold tracking-tight sm:text-7xl">SociaLens Core</h1>
          <p className="mt-5 max-w-xl text-lg text-white/75">The engine behind SociaLens — secure, private and built for seamless 3D social connection on every device.</p>
        </div>
        <div className="glass overflow-hidden !rounded-3xl p-1.5"><img src="/blog/post-1.jpg" alt="SociaLens on a phone" className="h-64 w-full rounded-[1.25rem] object-cover" /></div>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {CARDS.map((c, i) => (
          <article key={c.title} className="glass !rounded-2xl p-4 transition hover:-translate-y-1">
            <CardArt bg={c.bg} kinds={c.kinds} img={`/blog/core-${i + 1}.jpg`} h="h-56 sm:h-64" />
            <h2 className="mt-5 px-1 text-2xl font-bold">{c.title}</h2>
            <p className="mb-2 mt-1 px-1 text-white/75">{c.text}</p>
          </article>
        ))}
      </div>
      <div className="glass mt-10 flex flex-col items-center justify-between gap-5 !rounded-2xl p-7 text-center md:flex-row md:text-left">
        <div className="flex items-center gap-4"><img src="/logo.png" alt="SociaLens logo" className="h-14 w-14" />
          <p className="text-xl font-bold">Download for macOS, Windows, Linux &amp; Android — no account required</p></div>
        <button onClick={startDownload} className="btn-neon shrink-0 px-8 py-3"><Download size={18} />Download SociaLens</button>
      </div>
    </section>
  );
}
