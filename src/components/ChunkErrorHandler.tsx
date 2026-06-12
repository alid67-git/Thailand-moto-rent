"use client";

import { useEffect } from "react";

/** Dev ortamında eski chunk cache yüzünden oluşan hatada sayfayı otomatik yeniler. */
export function ChunkErrorHandler() {
  useEffect(() => {
    function handleError(event: ErrorEvent) {
      const msg = event.message ?? "";
      if (msg.includes("ChunkLoadError") || msg.includes("Loading chunk")) {
        const key = "tmr_chunk_reload";
        const last = sessionStorage.getItem(key);
        const now = Date.now();
        if (!last || now - Number(last) > 10000) {
          sessionStorage.setItem(key, String(now));
          window.location.reload();
        }
      }
    }
    window.addEventListener("error", handleError);
    return () => window.removeEventListener("error", handleError);
  }, []);

  return null;
}
