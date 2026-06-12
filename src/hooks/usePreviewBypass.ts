"use client";

import { useEffect, useState } from "react";
import { PREVIEW_BYPASS_COOKIE } from "@/lib/site-mode";

export function usePreviewBypass(): boolean {
  const [bypass, setBypass] = useState(false);

  useEffect(() => {
    const hasCookie = document.cookie
      .split("; ")
      .some((part) => part === `${PREVIEW_BYPASS_COOKIE}=1`);
    setBypass(hasCookie);
  }, []);

  return bypass;
}
