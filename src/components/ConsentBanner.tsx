"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Dictionary } from "@/lib/dictionaries";
import { CONSENT_KEY } from "./analytics";

type Choice = "granted" | "denied";

function readChoice(): Choice | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

export function ConsentBanner({ t, privacyHref }: { t: Dictionary["consent"]; privacyHref: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- consent lives in localStorage, only readable after mount
    setOpen(readChoice() === null);
    const reopen = () => setOpen(true);
    window.addEventListener("open-consent", reopen);
    return () => window.removeEventListener("open-consent", reopen);
  }, []);

  function choose(choice: Choice) {
    try {
      localStorage.setItem(CONSENT_KEY, choice);
    } catch {}
    window.gtag?.("consent", "update", {
      ad_storage: choice,
      ad_user_data: choice,
      ad_personalization: choice,
      analytics_storage: choice,
    });
    setOpen(false);
  }

  if (!open) return null;
  return (
    <div role="dialog" aria-live="polite" className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-2xl rounded-xl border border-stone-200 bg-white p-4 shadow-lg sm:flex sm:items-center sm:gap-4">
      <p className="text-sm text-stone-700">
        {t.text}{" "}
        <Link href={privacyHref} className="underline">
          {t.policy}
        </Link>
      </p>
      <div className="mt-3 flex shrink-0 gap-2 sm:mt-0">
        <button onClick={() => choose("denied")} className="rounded-lg border border-stone-300 px-4 py-2 text-sm">
          {t.decline}
        </button>
        <button onClick={() => choose("granted")} className="rounded-lg bg-navy px-4 py-2 text-sm text-white">
          {t.accept}
        </button>
      </div>
    </div>
  );
}

export function CookieSettingsButton({ label }: { label: string }) {
  return (
    <button onClick={() => window.dispatchEvent(new Event("open-consent"))} className="hover:underline">
      {label}
    </button>
  );
}
