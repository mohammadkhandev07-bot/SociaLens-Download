// Installers live in GitHub Releases (repo: mohammadkhandev07-bot/SociaLens-Download).
// "latest/download/<file>" always points to the newest published release, so new versions
// only need the same 4 file names attached to a new release.
const BASE = "https://github.com/mohammadkhandev07-bot/SociaLens-Download/releases/latest/download";
export const DOWNLOADS = {
  Windows: `${BASE}/SociaLens-Setup.exe`,
  macOS: `${BASE}/SociaLens-Mac.dmg`,
  Linux: `${BASE}/SociaLens-1.0.0.AppImage`,
  Android: `${BASE}/SociaLens.apk`,
};

export function detectOS() {
  if (typeof navigator === "undefined") return "unknown";
  const ua = navigator.userAgent || "";
  if (/iPhone|iPad|iPod/i.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)) return "iOS";
  if (/Android/i.test(ua)) return "Android"; // before Linux: Android UAs contain "Linux"
  if (/Win/i.test(ua)) return "Windows";
  if (/Mac/i.test(ua)) return "macOS";
  if (/Linux|X11|CrOS/i.test(ua)) return "Linux";
  return "unknown";
}
