"use client";

import { AuthProvider } from "@/context/AuthContext";
import { LocaleProvider } from "@/context/LocaleContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { ChunkErrorHandler } from "@/components/ChunkErrorHandler";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Header } from "@/components/Header";

const isPreview = process.env.NEXT_PUBLIC_SITE_PREVIEW !== "false";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <AuthProvider>
          <ChunkErrorHandler />
          {!isPreview && <Header />}
          {children}
          {!isPreview && <WhatsAppButton />}
        </AuthProvider>
      </LocaleProvider>
    </ThemeProvider>
  );
}
