"use client";

import Link from "next/link";
import { useLocale } from "@/context/LocaleContext";
import { APP_VERSION_LABEL } from "@/lib/version";

export function SiteFooter() {
  const { t } = useLocale();

  const companyLinks = [
    { href: "/#about", label: t("nav.about") },
    { href: "/#what-we-do", label: t("nav.whatWeDo") },
    { href: "/#vision", label: t("nav.vision") },
    { href: "/#mission", label: t("nav.mission") },
  ];

  const serviceLinks = [
    { href: "/#prices", label: t("nav.prices") },
    { href: "/#extras", label: t("nav.extras") },
    { href: "/#destinations", label: t("nav.destinations") },
    { href: "/book", label: t("nav.book") },
    { href: "/partner", label: t("nav.partner") },
  ];

  return (
    <footer className="relative overflow-hidden bg-ink-950 px-4 lg:px-6">
      {/* Top accent line */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-500/40 to-transparent" />

      <div className="mx-auto max-w-6xl py-14">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/8">
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-brand-400" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="5" cy="17" r="2.5" />
                  <circle cx="19" cy="17" r="2.5" />
                  <path d="M5.5 17H3V11l3-4h8l4 5h1.5a1.5 1.5 0 010 3H19" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="leading-none">
                <span className="block font-heading text-[15px] font-extrabold text-white">Thailand</span>
                <span className="block text-[11px] font-bold uppercase tracking-[0.1em] text-brand-500">Moto Rent</span>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/40">{t("footer.tagline")}</p>
          </div>

          {/* Company */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/30">
              {t("footer.company")}
            </p>
            <ul className="mt-4 space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/50 transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/30">
              {t("footer.support")}
            </p>
            <ul className="mt-4 space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/50 transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/30">
              {t("footer.legal")}
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-white/50">
              <li>{t("footer.privacy")}</li>
              <li>{t("footer.terms")}</li>
              <li>{t("footer.contact")}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/6 py-6">
        <p className="mx-auto max-w-6xl text-center text-xs text-white/25">
          {t("footer.copyright")} · {APP_VERSION_LABEL}
        </p>
      </div>
    </footer>
  );
}
