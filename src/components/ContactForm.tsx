"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/dictionaries";
import { track } from "./analytics";

// Sends the enquiry as a prefilled WhatsApp message, the channel most
// Istanbul buyers use. Swap for an email/CRM endpoint if the client prefers.
export function ContactForm({ t, whatsapp }: { t: Dictionary["contact"]; whatsapp: string }) {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const text = [data.get("message"), "", `${data.get("name")} · ${data.get("phone")}`].join("\n");
    track({ event: "generate_lead", method: "contact_form" });
    window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    setSent(true);
  }

  const field = "mt-1 w-full rounded-lg border border-stone-300 px-3 py-2";
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <label className="block text-sm font-medium">
        {t.name}
        <input name="name" required autoComplete="name" className={field} />
      </label>
      <label className="block text-sm font-medium">
        {t.phone}
        <input name="phone" required type="tel" autoComplete="tel" className={field} />
      </label>
      <label className="block text-sm font-medium">
        {t.message}
        <textarea name="message" required rows={4} className={field} />
      </label>
      <button type="submit" disabled={sent} className="rounded-lg bg-navy px-5 py-2.5 font-medium text-white disabled:opacity-60">
        {t.send}
      </button>
    </form>
  );
}
