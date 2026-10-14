"use client";
import { useEffect } from "react";

// The site is no longer an installable PWA. This cleans up the service worker and caches
// that earlier versions registered in visitors' browsers.
export default function SWRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistrations().then((rs) => rs.forEach((r) => r.unregister())).catch(() => {});
    }
    if ("caches" in window) {
      caches.keys().then((ks) => ks.forEach((k) => caches.delete(k))).catch(() => {});
    }
  }, []);
  return null;
}
