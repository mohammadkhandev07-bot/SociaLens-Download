"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const ref = useRef(null);
  useEffect(() => { const v = ref.current; if (v) { v.muted = true; v.play().catch(() => {}); } }, []);
  return (
    <section className="relative flex min-h-[calc(100vh-5.5rem)] items-center justify-center px-6 text-center">
      {/* Seamless-loop background video: no controls, no progress bar */}
      <video ref={ref} src="/video/bg.mp4" poster="/video/poster.jpg" autoPlay muted loop playsInline preload="auto"
        disablePictureInPicture disableRemotePlayback aria-hidden tabIndex={-1}
        className="pointer-events-none fixed inset-0 -z-10 h-full w-full object-cover" />
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(5,1,10,.1),rgba(5,1,10,.78))]" />
      <div className="max-w-4xl">
        <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}
          className="grad-text text-5xl font-extrabold leading-[1.05] tracking-tight drop-shadow-[0_0_30px_rgba(217,70,239,.45)] sm:text-6xl lg:text-8xl">
          Step into a social world that feels alive.
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.35 }}
          className="mx-auto mt-7 max-w-2xl text-lg text-white/85 sm:text-xl">
          Chat, call, share moments and discover people in immersive 3D — private by design, fast on every device.
        </motion.p>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.8 }}
          className="mt-6 text-sm font-medium text-fuchsia-200/80">
          Free on Windows · macOS · Linux · Android · iPhone
        </motion.p>
      </div>
    </section>
  );
}
