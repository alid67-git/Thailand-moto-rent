"use client";

import { AuthProvider } from "@/context/AuthContext";
import { LocaleProvider } from "@/context/LocaleContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { ChunkErrorHandler } from "@/components/ChunkErrorHandler";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Header } from "@/components/Header";
import { usePreviewBypass } from "@/hooks/usePreviewBypass";
import { isSitePreviewEnabled } from "@/lib/site-mode";
import type { Locale } from "@/i18n/config";

function SiteChrome({
  children,
  initialPreviewBypass,
}: {
  children: React.ReactNode;
  initialPreviewBypass: boolean;
}) {
  const clientBypass = usePreviewBypass(initialPreviewBypass);
  const bypass = initialPreviewBypass || clientBypass;
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

export function Providers({
  children,
  initialPreviewBypass = false,
  initialLocale,
}: {
  children: React.ReactNode;
  initialPreviewBypass?: boolean;
  initialLocale?: Locale;
}) {
  return (
    <ThemeProvider>
      <LocaleProvider initialLocale={initialLocale}>
        <AuthProvider>
          <SiteChrome initialPreviewBypass={initialPreviewBypass}>
            {children}
          </SiteChrome>
        </AuthProvider>
      </LocaleProvider>
    </ThemeProvider>
  );
}
