"use client";
import { useState } from "react";
import { Calendar, Clock, Mail } from "lucide-react";
import { CardArt, Laptop } from "@/components/Mockups";
import { sendForm } from "@/lib/form";

const CATS = ["All", "SociaLens Updates", "Features", "Guides", "Community", "Social Media"];
const POSTS = [
  { cat: "Social Media", title: "What is SociaLens? A New Way to Connect, Create and Share", text: "Discover what SociaLens is, its vision, key features and how it's changing the way we share and connect online.", date: "Oct 4, 2026", read: "6 min", bg: 1, kinds: ["logo"] },
  { cat: "Guides", title: "Getting Started With SociaLens: A Beginner's Guide", text: "Learn how to create your account, set up your profile and start exploring posts, reels, stories and more.", date: "Oct 3, 2026", read: "4 min", bg: 2, kinds: ["feed"] },
  { cat: "Features", title: "How to Share Your Moments on SociaLens", text: "Step-by-step guide to sharing photos, videos and posts with your friends and community.", date: "Oct 2, 2026", read: "4 min", bg: 3, kinds: ["feed", "reels"] },
  { cat: "Features", title: "Discover Reels on SociaLens", text: "Explore short videos, find trending content and learn how to create and share your own reels.", date: "Oct 1, 2026", read: "5 min", bg: 4, kinds: ["reels"] },
  { cat: "SociaLens Updates", title: "Stories on SociaLens: Share Your Everyday Moments", text: "Learn how to create stories, what makes them special and how they help you stay closer to your friends.", date: "Sep 30, 2026", read: "4 min", bg: 2, kinds: ["feed", "logo"] },
  { cat: "Guides", title: "Building Your Profile on SociaLens", text: "Add your photo, bio, interests and make your profile stand out in the community.", date: "Sep 29, 2026", read: "5 min", bg: 1, kinds: ["profile"] },
  { cat: "Features", title: "SociaLens Features: Everything You Can Do on the Platform", text: "Posts, reels, stories, messaging, profiles and more — explore all the features in one place.", date: "Sep 28, 2026", read: "7 min", bg: 3, kinds: ["reels", "profile"] },
  { cat: "Community", title: "The Story Behind SociaLens: Our Vision for Social Networking", text: "Why we built SociaLens, what we stand for and where we're headed in the future.", date: "Sep 27, 2026", read: "6 min", bg: 4, kinds: ["logo", "feed"] },
].map((p, i) => ({ ...p, img: `/blog/post-${i + 1}.jpg` }));

export default function Blog() {
  const [cat, setCat] = useState("All");
  const [email, setEmail] = useState("");
  const [st, setSt] = useState("idle");
  const list = cat === "All" ? POSTS : POSTS.filter((p) => p.cat === cat);
  async function subscribe(e) {
    e.preventDefault(); setSt("sending");
    const r = await sendForm({ subject: "New SociaLens newsletter subscriber", email });
    setSt(r === "error" ? "error" : "sent"); if (r !== "error") setEmail("");
  }
  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <span className="glass inline-block !rounded-full px-4 py-1.5 text-sm font-medium text-white/80">SociaLens Blog</span>
          <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">Stories, Updates, Guides &amp; <span className="grad-text">Ideas from SociaLens.</span></h1>
          <p className="mt-5 max-w-lg text-lg text-white/75">Discover the latest SociaLens updates, feature guides, social media tips and stories from the world of SociaLens.</p>
        </div>
        <Laptop img="/blog/hero.jpg" />
      </div>

      <div className="mt-12 flex flex-wrap gap-3" role="tablist">
        {CATS.map((c) => (
          <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)}
            className={`rounded-full border px-5 py-2 text-sm font-semibold transition ${cat === c ? "border-transparent bg-gradient-to-r from-pink-500 to-violet-500 shadow-[0_0_20px_rgba(217,70,239,.6)]" : "border-white/15 bg-white/5 text-white/75 hover:bg-white/10"}`}>{c}</button>
        ))}
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((p) => (
          <article key={p.title} className="glass flex flex-col !rounded-2xl p-3 transition hover:-translate-y-1">
            <div className="relative"><CardArt bg={p.bg} kinds={p.kinds} img={p.img} />
              <span className="absolute left-2 top-2 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 px-3 py-0.5 text-xs font-semibold">{p.cat}</span></div>
            <h2 className="mt-4 px-1 font-bold leading-snug">{p.title}</h2>
            <p className="mt-2 flex-1 px-1 text-sm text-white/70">{p.text}</p>
            <div className="mt-4 flex items-center justify-between px-1 text-xs text-white/55">
              <span className="flex items-center gap-1.5"><Calendar size={13} />{p.date}</span><span className="flex items-center gap-1.5"><Clock size={13} />{p.read} read</span>
            </div>
          </article>
        ))}
      </div>

      <form onSubmit={subscribe} className="glass mt-12 flex flex-col items-center gap-5 !rounded-2xl p-6 md:flex-row">
        <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-fuchsia-500 to-violet-600 shadow-[0_0_24px_rgba(217,70,239,.6)]"><Mail /></div>
        <div className="flex-1 text-center md:text-left"><h2 className="text-xl font-bold">Stay Updated with SociaLens</h2>
          <p className="text-sm text-white/70">Get the latest blog posts, feature updates and news delivered directly to your inbox.</p></div>
        <div className="flex w-full flex-col gap-2 sm:flex-row md:w-auto">
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email address" aria-label="Email address" className="field sm:w-72" />
          <button className="btn-neon" disabled={st === "sending"}>Subscribe</button>
        </div>
        {st === "sent" && <p role="status" className="text-sm text-fuchsia-300">Subscribed!</p>}
        {st === "error" && <p role="alert" className="text-sm text-pink-300">Couldn't subscribe. Try again.</p>}
      </form>
    </section>
  );
}
