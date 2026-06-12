"use client";

import { useEffect, useState } from "react";
import { PREVIEW_BYPASS_COOKIE } from "@/lib/site-mode";

function readBypassCookie(): boolean {
  if (typeof document === "undefined") return false;
  return document.cookie.split("; ").some((part) => part === `${PREVIEW_BYPASS_COOKIE}=1`);
}

export function usePreviewBypass(initial = false): boolean {
  const [bypass, setBypass] = useState(initial || readBypassCookie());

  useEffect(() => {
    setBypass(initial || readBypassCookie());
  }, [initial]);

  return bypass;
}
