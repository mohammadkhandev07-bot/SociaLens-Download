"use client";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Share, SquarePlus, Smartphone, X } from "lucide-react";
import { DOWNLOADS, detectOS } from "@/lib/platform";

const Ctx = createContext({ os: "unknown", startDownload: () => {} });
export const useDownload = () => useContext(Ctx);

const STEPS = [
  { Icon: Share, title: "Tap the Share button", text: "In Safari, tap the Share icon (↑) in the toolbar." },
  { Icon: SquarePlus, title: "Add to Home Screen", text: "Scroll down the share sheet and select “Add to Home Screen”." },
  { Icon: Smartphone, title: "Launch SociaLens", text: "Open SociaLens straight from your home screen." },
];

export default function DownloadProvider({ children }) {
  const [os, setOs] = useState("unknown");
  const [modal, setModal] = useState(null); // "ios" | "all" | null

  useEffect(() => setOs(detectOS()), []);
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setModal(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const startDownload = useCallback(() => {
    const t = detectOS();
    if (t === "iOS") return setModal("ios");
    const href = DOWNLOADS[t];
    if (!href) return setModal("all");
    const a = document.createElement("a");
    a.href = href;
    a.download = href.split("/").pop();
    document.body.appendChild(a);
    a.click();
    a.remove();
  }, []);

  return (
    <Ctx.Provider value={{ os, startDownload }}>
      {children}
      <AnimatePresence>
        {modal && (
          <motion.div
            className="fixed inset-0 z-[100] grid place-items-center bg-black/60 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setModal(null)}
          >
            <motion.div
              role="dialog" aria-modal="true"
              className="glass w-full max-w-md bg-[#0a0f1f]/85 p-6 sm:p-8"
              initial={{ y: 40, scale: 0.95, opacity: 0 }} animate={{ y: 0, scale: 1, opacity: 1 }} exit={{ y: 40, opacity: 0 }}
              transition={{ type: "spring", damping: 24, stiffness: 260 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setModal(null)} aria-label="Close" className="absolute right-4 top-4 rounded-full p-1.5 text-white/60 hover:bg-white/10 hover:text-white">
                <X size={20} />
              </button>
              {modal === "ios" ? (
                <>
                  <h2 className="grad-text pr-8 text-2xl font-extrabold">Install SociaLens on iPhone</h2>
                  <p className="mt-1 text-sm text-white/60">Three taps, no App Store needed.</p>
                  <ol className="mt-6 space-y-3">
                    {STEPS.map(({ Icon, title, text }, i) => (
                      <li key={title} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                        <div className="relative shrink-0">
                          <div className="absolute inset-0 rounded-xl bg-fuchsia-500/50 blur-lg" />
                          <div className="relative grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-fuchsia-500 to-violet-500">
                            <Icon className="h-6 w-6" />
                          </div>
                        </div>
                        <div>
                          <p className="font-semibold">Step {i + 1}: {title}</p>
                          <p className="text-sm text-white/60">{text}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </>
              ) : (
                <>
                  <h2 className="grad-text text-2xl font-extrabold">Choose your platform</h2>
                  <div className="mt-5 grid gap-3">
                    {Object.entries(DOWNLOADS).map(([name, href]) => (
                      <a key={name} href={href} download className="btn-ghost justify-between">
                        {name} <Download size={16} />
                      </a>
                    ))}
                  </div>
                </>
              )}
              <button onClick={() => setModal(null)} className="btn-neon mt-6 w-full">Got it</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Ctx.Provider>
  );
}
