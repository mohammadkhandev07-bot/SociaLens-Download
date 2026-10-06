"use client";
import { useState } from "react";
import { ImagePlus, Send } from "lucide-react";
import { sendForm } from "@/lib/form";
import { CLOUDINARY_CLOUD } from "@/lib/config";

const MAX_MB = CLOUDINARY_CLOUD ? 10 : 5;
const MSG = {
  sent: ["text-fuchsia-300", "Request sent. We'll get back to you on your number."],
  "sent-nofile": ["text-amber-300", "Request sent, but the file couldn't be attached. Please describe the problem in detail."],
  error: ["text-pink-300", "Couldn't send your request. Check your connection and try again."],
  big: ["text-pink-300", `File is too large. Please choose a photo or video under ${MAX_MB} MB.`],
};

export default function Support() {
  const [f, setF] = useState({ name: "", phone: "", message: "" });
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("idle");
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    if (file && file.size > MAX_MB * 1024 * 1024) return setStatus("big");
    setStatus("sending");
    const r = await sendForm({ subject: `SociaLens support request from ${f.name}`, name: f.name, phone: f.phone, message: f.message }, file);
    setStatus(r);
    if (r !== "error") { setF({ name: "", phone: "", message: "" }); setFile(null); e.target.reset(); }
  }

  return (
    <section className="mx-auto max-w-2xl px-6 py-14">
      <h1 className="grad-text text-center text-5xl font-extrabold tracking-tight sm:text-6xl">Support</h1>
      <p className="mt-3 text-center text-white/70">Tell us what went wrong and we'll sort it out.</p>
      <form onSubmit={submit} className="glass mt-9 space-y-5 p-6 sm:p-9">
        <div><label htmlFor="n" className="mb-1.5 block text-sm font-semibold">Your name</label>
          <input id="n" required value={f.name} onChange={set("name")} placeholder="Enter your name" autoComplete="name" className="field" /></div>
        <div><label htmlFor="p" className="mb-1.5 block text-sm font-semibold">Contact number</label>
          <input id="p" type="tel" required pattern="[0-9+\-\s()]{7,18}" value={f.phone} onChange={set("phone")} placeholder="Enter your contact number" autoComplete="tel" className="field" /></div>
        <div><span className="mb-1.5 block text-sm font-semibold">Photo or video of the problem</span>
          <label htmlFor="u" className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-dashed border-fuchsia-400/50 bg-white/5 px-4 py-7 text-center transition hover:bg-white/10 focus-within:border-fuchsia-300">
            <ImagePlus className="text-fuchsia-300" />
            <span className="text-sm text-white/80">{file ? file.name : "Tap to upload a photo or video (optional)"}</span>
            <input id="u" type="file" accept="image/*,video/*" onChange={(e) => setFile(e.target.files?.[0] || null)} className="sr-only" />
          </label></div>
        <div><label htmlFor="m" className="mb-1.5 block text-sm font-semibold">What's the problem?</label>
          <textarea id="m" required rows={5} value={f.message} onChange={set("message")} placeholder="Describe the problem you're facing..." className="field" /></div>
        <button type="submit" disabled={status === "sending"} className="btn-neon w-full py-3.5"><Send size={18} />{status === "sending" ? "Sending..." : "Send request"}</button>
        {MSG[status] && <p role="status" className={`text-center text-sm ${MSG[status][0]}`}>{MSG[status][1]}</p>}
      </form>
    </section>
  );
}
