import { WEB3FORMS_KEY, CLOUDINARY_CLOUD, CLOUDINARY_PRESET } from "./config";

async function uploadFile(file) {
  if (!CLOUDINARY_CLOUD || !CLOUDINARY_PRESET) return null;
  const fd = new FormData();
  fd.append("file", file);
  fd.append("upload_preset", CLOUDINARY_PRESET);
  try {
    const r = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD}/auto/upload`, { method: "POST", body: fd });
    return (await r.json()).secure_url || null;
  } catch { return null; }
}

// Returns "sent" | "sent-nofile" | "error"
export async function sendForm(fields, file) {
  if (file) {
    const url = await uploadFile(file);
    if (url) { fields = { ...fields, message: `${fields.message}\n\nAttachment: ${url}` }; file = null; }
  }
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
