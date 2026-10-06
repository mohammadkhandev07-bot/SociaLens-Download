"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// One shared background video for every page (lives in the layout, so it never restarts on navigation).
export default function VideoBackground() {
  const ref = useRef(null);
  const home = (usePathname() || "/").replace(/(.)\/$/, "$1") === "/";
  useEffect(() => { const v = ref.current; if (v) { v.muted = true; v.play().catch(() => {}); } }, []);
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#05010a]">
      <video ref={ref} src="/video/bg.mp4" poster="/video/poster.jpg" autoPlay muted loop playsInline preload="auto"
        disablePictureInPicture disableRemotePlayback tabIndex={-1} className="h-full w-full object-cover" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,1,10,.1),rgba(5,1,10,.78))]" />
      {/* extra dimming on inner pages so cards and forms stay readable */}
      <div className={`absolute inset-0 bg-[#05010a]/45 transition-opacity duration-700 ${home ? "opacity-0" : "opacity-100"}`} />
    </div>
  );
}
