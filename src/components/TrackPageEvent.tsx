"use client";

import { useEffect } from "react";
import { track } from "./analytics";

// Pushes a dataLayer event when a page mounts, including client-side navigations.
export function TrackPageEvent({ event, params }: { event: string; params?: Record<string, string> }) {
  useEffect(() => {
    track({ event, ...params });
  }, [event, params]);
  return null;
}
