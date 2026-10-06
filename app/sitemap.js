import { SITE_URL } from "@/lib/site";
export const dynamic = "force-static";

export default function sitemap() {
  const now = new Date();
  return ["/", "/support/", "/core/", "/blog/"].map((p) => ({
    url: `${SITE_URL}${p}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: p === "/" ? 1 : 0.7,
  }));
}
