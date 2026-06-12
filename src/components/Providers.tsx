"use client";

import { AuthProvider } from "@/context/AuthContext";
import { LocaleProvider } from "@/context/LocaleContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { ChunkErrorHandler } from "@/components/ChunkErrorHandler";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Header } from "@/components/Header";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <AuthProvider>
          <ChunkErrorHandler />
          <Header />
          {children}
          <WhatsAppButton />
        </AuthProvider>
      </LocaleProvider>
    </ThemeProvider>
  );
}
