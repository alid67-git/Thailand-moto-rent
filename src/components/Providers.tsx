"use client";

import { AuthProvider } from "@/context/AuthContext";
import { LocaleProvider } from "@/context/LocaleContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { ChunkErrorHandler } from "@/components/ChunkErrorHandler";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Header } from "@/components/Header";
import { usePreviewBypass } from "@/hooks/usePreviewBypass";
import { isSitePreviewEnabled } from "@/lib/site-mode";

function SiteChrome({ children }: { children: React.ReactNode }) {
  const bypass = usePreviewBypass();
  const gated = isSitePreviewEnabled() && !bypass;

  return (
    <>
      <ChunkErrorHandler />
      {!gated && <Header />}
      {children}
      {!gated && <WhatsAppButton />}
    </>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <AuthProvider>
          <SiteChrome>{children}</SiteChrome>
        </AuthProvider>
      </LocaleProvider>
    </ThemeProvider>
  );
}
