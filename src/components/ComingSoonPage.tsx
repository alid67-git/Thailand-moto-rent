"use client";

import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLocale } from "@/context/LocaleContext";
import { APP_VERSION_LABEL } from "@/lib/version";

export function ComingSoonPage() {
  const { t } = useLocale();

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-ink-950 via-brand-950 to-jungle-950 px-4 py-16 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(0,119,182,0.25),_transparent_55%)]" />
      <div className="pointer-events-none absolute -bottom-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-jungle-600/20 blur-3xl" />

      <div className="relative z-10 flex w-full max-w-lg flex-col items-center text-center">
        <div className="mb-8 flex w-full items-center justify-end">
          <LanguageSwitcher variant="dark" />
        </div>

        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 backdrop-blur-sm">
          <span className="h-2 w-2 animate-pulse rounded-full bg-jungle-400" />
          {t("preview.eyebrow")}
        </div>

        <h1 className="font-heading text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
          {t("preview.title")}
        </h1>

        <p className="mt-4 text-lg text-white/75 sm:text-xl">{t("preview.subtitle")}</p>

        <p className="mt-6 max-w-md text-sm leading-relaxed text-white/55">{t("preview.note")}</p>

        <p className="mt-10 text-xs text-white/40">
          {t("footer.copyright")} · {APP_VERSION_LABEL}
        </p>
      </div>
    </main>
  );
}
