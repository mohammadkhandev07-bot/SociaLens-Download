"use client";
import { useEffect, useState } from "react";

// true once the real photo exists in /public (drop-in); otherwise the mockup below is shown
function useImg(src) {
  const [ok, setOk] = useState(false);
  useEffect(() => { if (!src) return; const i = new window.Image(); i.onload = () => setOk(true); i.src = src; }, [src]);
  return ok;
}

// Realistic device mockups (bezel, dynamic island, glass glare) carrying the SociaLens logo.
function Screen({ kind }) {
  const bars = <div className="space-y-1.5 p-3"><div className="h-2 w-2/3 rounded bg-white/25" /><div className="h-2 w-1/2 rounded bg-white/15" /></div>;
  if (kind === "profile")
    return (<div className="pt-9 text-center"><div className="mx-auto h-14 w-14 rounded-full bg-gradient-to-br from-pink-400 to-violet-600 ring-2 ring-white/30" /><div className="mx-auto mt-2 h-2 w-16 rounded bg-white/40" />
      <div className="mt-3 flex justify-center gap-3">{[0, 1, 2].map((i) => <div key={i} className="h-5 w-6 rounded bg-white/15" />)}</div>
      <div className="mt-3 grid grid-cols-3 gap-1 px-2">{[...Array(9)].map((_, i) => <div key={i} className="aspect-square rounded bg-gradient-to-br from-fuchsia-500/60 to-purple-900/60" />)}</div></div>);
  if (kind === "reels")
    return (<div className="relative h-full bg-gradient-to-b from-fuchsia-600/70 via-purple-800/70 to-black"><div className="absolute left-1/2 top-1/2 h-0 w-0 -translate-x-1/2 -translate-y-1/2 border-y-[10px] border-l-[16px] border-y-transparent border-l-white/90" />
      <div className="absolute bottom-10 right-2 space-y-3">{[0, 1, 2].map((i) => <div key={i} className="h-5 w-5 rounded-full bg-white/70" />)}</div><div className="absolute bottom-3 left-3">{bars}</div></div>);
  if (kind === "logo")
    return (<div className="grid h-full place-items-center bg-[radial-gradient(circle_at_50%_40%,rgba(192,38,211,.5),transparent_65%)] text-center"><div><img src="/logo.png" alt="SociaLens" className="mx-auto h-14 w-14 drop-shadow-[0_0_18px_#d946ef]" /><p className="mt-1.5 text-xs font-bold">SociaLens</p><div className="mx-auto mt-3 h-4 w-16 rounded-full bg-gradient-to-r from-pink-500 to-violet-500" /></div></div>);
  return (<div className="pt-8"><div className="flex gap-1.5 px-2">{[0, 1, 2, 3].map((i) => <div key={i} className="h-7 w-7 shrink-0 rounded-full bg-gradient-to-br from-pink-400 to-violet-600 ring-1 ring-white/30" />)}</div>
    <div className="mx-2 mt-3 aspect-[4/3] rounded-lg bg-gradient-to-br from-fuchsia-500/70 to-indigo-900/80" />{bars}<div className="mx-2 aspect-[5/2] rounded-lg bg-gradient-to-br from-purple-600/50 to-black" /></div>);
}

export function Phone({ kind = "logo", className = "" }) {
  return (
    <div className={`relative aspect-[9/19] rounded-[1.6rem] bg-gradient-to-b from-zinc-500 via-zinc-800 to-zinc-900 p-[2.5px] shadow-[0_24px_50px_-10px_rgba(217,70,239,.65)] ${className}`}>
      <div className="h-full w-full rounded-[1.45rem] bg-black p-[3px]">
        <div className="relative h-full w-full overflow-hidden rounded-[1.25rem] bg-gradient-to-b from-[#2a0a3d] to-[#0a0210] text-white">
          <div className="absolute left-1/2 top-1.5 z-10 h-1.5 w-7 -translate-x-1/2 rounded-full bg-black" />
          <Screen kind={kind} />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-transparent" />
        </div>
      </div>
    </div>
  );
}

export function Laptop({ img }) {
  const ok = useImg(img);
  if (ok) return <img src={img} alt="SociaLens on a laptop" className="mx-auto w-full max-w-lg [mask-image:radial-gradient(ellipse_at_center,#000_55%,transparent_100%)]" />;
  return (
    <div className="relative mx-auto w-full max-w-md [perspective:1200px]">
      <div className="rounded-t-2xl border border-zinc-600 bg-gradient-to-b from-zinc-700 to-zinc-900 p-2 shadow-[0_0_70px_rgba(217,70,239,.5)] [transform:rotateY(-10deg)_rotateX(3deg)]">
        <div className="grid aspect-[16/10] place-items-center rounded-lg bg-black bg-[url('/blog/bg2.jpg')] bg-cover bg-center">
          <div className="text-center"><img src="/logo.png" alt="SociaLens" className="mx-auto h-20 w-20 drop-shadow-[0_0_24px_#d946ef]" /><p className="mt-1 text-2xl font-extrabold">SociaLens</p></div>
        </div>
      </div>
      <div className="-ml-[4%] h-2.5 w-[108%] rounded-b-xl bg-gradient-to-b from-zinc-500 to-zinc-800 shadow-[0_18px_30px_-8px_rgba(217,70,239,.5)]" />
    </div>
  );
}

// Card artwork: video-frame photo backdrop + one or two phones
export function CardArt({ bg = 1, kinds = ["logo"], img, h = "h-44" }) {
  const ok = useImg(img);
  if (ok) return <img src={img} alt="" loading="lazy" className={`${h} w-full rounded-xl object-cover`} />;
  return (
    <div className={`relative ${h} overflow-hidden rounded-xl bg-cover bg-center`} style={{ backgroundImage: `url(/blog/bg${bg}.jpg)` }}>
      <div className="absolute inset-0 bg-gradient-to-t from-[#05010a]/80 to-transparent" />
      {kinds.map((k, i) => (
        <Phone key={i} kind={k} className={`absolute top-6 w-24 ${kinds.length === 1 ? "left-1/2 -translate-x-1/2" : i === 0 ? "left-[22%] -rotate-6" : "left-[52%] rotate-6 translate-y-3"}`} />
      ))}
    </div>
  );
}
