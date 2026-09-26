"use client";

import { useEffect } from "react";
import { track } from "./analytics";

// Sends a dataLayer event for any click on an element with data-track.
// Extra data-track-* attributes become event parameters, e.g.
// <a data-track="whatsapp_click" data-track-listing="slug">.
export function ClickTracker() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-track]");
      if (!el) return;
      const params: Record<string, string> = {};
      for (const [key, value] of Object.entries(el.dataset)) {
        if (key.startsWith("track") && key !== "track" && value) {
          params[key.slice(5).toLowerCase()] = value;
        }
      }
      track({ event: el.dataset.track!, ...params });
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
