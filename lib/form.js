import { WEB3FORMS_KEY } from "./config";

// Returns "sent" | "sent-nofile" | "error"
export async function sendForm(fields, file) {
  const post = async (withFile) => {
    const fd = new FormData();
    fd.append("access_key", WEB3FORMS_KEY);
    fd.append("from_name", "SociaLens Website");
    Object.entries(fields).forEach(([k, v]) => fd.append(k, v));
    if (withFile && file) fd.append("attachment", file);
    try {
      const r = await fetch("https://api.web3forms.com/submit", { method: "POST", body: fd, headers: { Accept: "application/json" } });
      return (await r.json()).success === true;
    } catch { return false; }
  };
  if (await post(true)) return "sent";
  if (file && (await post(false))) return "sent-nofile"; // plan without attachments: still deliver the text
  return "error";
}
