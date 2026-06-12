"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useLocale } from "@/context/LocaleContext";

const AuthModal = dynamic(
  () => import("@/components/AuthModal").then((m) => ({ default: m.AuthModal })),
  { ssr: false }
);

export function Header() {
  const { t } = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const navLinks = [
    { href: "/motorcycles", label: t("nav.fleet") },
    { href: "/destinations", label: t("nav.destinations") },
    { href: "/routes", label: t("nav.routes") },
    { href: "/travel-guide", label: t("nav.guide") },
    { href: "/#contact", label: t("footer.contact") },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 pt-safe transition-all duration-300 ${
          scrolled
            ? "border-b border-neutral-200/60 bg-white/95 shadow-lift backdrop-blur-xl dark:border-ink-700/60 dark:bg-ink-950/95"
            : "border-b border-neutral-100 bg-white dark:border-ink-800 dark:bg-ink-950"
        }`}
      >
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-2 px-4 sm:h-16 sm:gap-4 lg:px-6">
          <Link href="/" className="flex shrink-0 items-center gap-2.5 touch-target">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-thai-gradient sm:h-9 sm:w-9">
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-white" stroke="currentColor" strokeWidth="2.5">
                <circle cx="5" cy="17" r="2.5" />
                <circle cx="19" cy="17" r="2.5" />
                <path d="M5.5 17H3V11l3-4h8l4 5h1.5a1.5 1.5 0 010 3H19" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="leading-none">
              <span className="block font-heading text-xs font-extrabold tracking-tight text-ink-950 dark:text-white sm:text-sm">
                Thailand Moto
              </span>
              <span className="block text-[9px] font-semibold uppercase tracking-[0.1em] text-jungle-600 dark:text-jungle-400 sm:text-[10px]">
                Rent
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-neutral-700 transition hover:text-brand-600 dark:text-neutral-300 dark:hover:text-brand-400"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <ThemeToggle />
            <LanguageSwitcher variant="light" compact />

            <Link
              href="/book"
              className="hidden min-h-[44px] items-center rounded-lg bg-thai-gradient px-3 py-2 text-sm font-semibold text-white transition hover:opacity-95 active:scale-[0.98] sm:inline-flex sm:px-4"
            >
              {t("nav.book")}
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="touch-target inline-flex items-center justify-center rounded-lg border border-neutral-200 p-2.5 dark:border-ink-700 lg:hidden"
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? t("nav.closeMenu") : t("nav.openMenu")}
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                {mobileOpen ? (
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {mobileOpen && (
          <>
            <button
              type="button"
              className="fixed inset-0 z-40 bg-ink-950/50 lg:hidden"
              aria-label={t("nav.closeMenu")}
              onClick={() => setMobileOpen(false)}
            />
            <nav className="fixed inset-x-0 top-[calc(3.5rem+env(safe-area-inset-top))] z-50 max-h-[calc(100dvh-3.5rem-env(safe-area-inset-top))] overflow-y-auto border-t border-neutral-200 bg-white px-4 py-4 pb-safe dark:border-ink-700 dark:bg-ink-900 sm:top-[calc(4rem+env(safe-area-inset-top))] lg:hidden">
              <ul className="space-y-1">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex min-h-[48px] items-center rounded-xl px-4 text-base font-medium text-neutral-800 active:bg-neutral-100 dark:text-neutral-100 dark:active:bg-ink-800"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li className="border-t border-neutral-200 pt-3 dark:border-ink-700">
                  <Link
                    href="/book"
                    onClick={() => setMobileOpen(false)}
                    className="flex min-h-[48px] items-center justify-center rounded-xl bg-thai-gradient px-4 text-base font-semibold text-white active:opacity-90"
                  >
                    {t("nav.book")} →
                  </Link>
                </li>
              </ul>
            </nav>
          </>
        )}
      </header>
      <AuthModal />
    </>
  );
}
