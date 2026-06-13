"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useLocale } from "@/context/LocaleContext";

const SUPPORT_EMAIL = "destek@thailand-moto-rent.com";

export default function PartnerPage() {
  const { user, openAuth } = useAuth();

  if (user) {
    return <PartnerDashboard />;
  }

  return <PartnerPublic openAuth={openAuth} />;
}

function PartnerPublic({ openAuth }: { openAuth: (view?: "login" | "register" | "forgot" | "verify") => void }) {
  const { t } = useLocale();

  const benefits = [
    { title: t("partner.benefit1Title"), description: t("partner.benefit1Desc"), icon: "★" },
    { title: t("partner.benefit2Title"), description: t("partner.benefit2Desc"), icon: "⏰" },
    { title: t("partner.benefit3Title"), description: t("partner.benefit3Desc"), icon: "📊" },
  ];

  return (
    <main className="bg-white">
      <section className="relative overflow-hidden bg-ink-950 px-4 py-24 text-white lg:px-6">
        <div className="pointer-events-none absolute inset-0 bg-grid-ink bg-grid opacity-60" />
        <div className="pointer-events-none absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full bg-brand-500/10 blur-[120px]" />

        <div className="relative mx-auto max-w-6xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-1.5 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-white/70">
              {t("partner.portalEyebrow")}
            </span>
          </div>

          <h1 className="font-heading text-5xl font-extrabold leading-[1.08] tracking-tight md:text-6xl">
            {t("partner.portalTitle")}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/60">{t("partner.portalSubtitle")}</p>

          <button
            onClick={() => openAuth("login")}
            className="mt-10 inline-flex rounded-xl bg-brand-500 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-brand-600 active:scale-[0.98]"
          >
            {t("partner.apply")}
          </button>
        </div>
      </section>

      <section className="px-4 py-24 lg:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <span className="eyebrow">{t("partner.whyPartner")}</span>
            <h2 className="section-title mt-3">{t("partner.partnersStrong")}</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="group rounded-2xl border border-neutral-100 bg-white p-6 shadow-lift transition-all duration-300 hover:-translate-y-1 hover:shadow-lift-lg"
              >
                <div className="mb-4 text-3xl">{benefit.icon}</div>
                <h3 className="font-heading text-lg font-bold text-ink-950">{benefit.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-500">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 px-4 py-16 lg:px-6">
        <div className="mx-auto max-w-2xl rounded-3xl border border-neutral-200 bg-white p-8 text-center shadow-lift">
          <h2 className="font-heading text-2xl font-bold text-ink-950">{t("partner.ctaTitle")}</h2>
          <p className="mt-3 text-neutral-600">{t("partner.ctaSubtitle")}</p>
          <button
            onClick={() => openAuth("login")}
            className="mt-6 inline-flex rounded-xl bg-brand-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-600"
          >
            {t("partner.apply")}
          </button>
        </div>
      </section>
    </main>
  );
}

function PartnerDashboard() {
  const { t } = useLocale();
  const { user, logout } = useAuth();

  return (
    <main className="bg-white">
      <section className="border-b border-neutral-200 px-4 py-8 lg:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-heading text-2xl font-bold text-ink-950">
                {t("partner.dashboardWelcome", { name: user?.firstName ?? "" })}
              </h1>
              <p className="mt-1 text-sm text-neutral-600">{t("partner.dashboardPending")}</p>
            </div>
            <button
              onClick={logout}
              className="text-sm font-medium text-neutral-600 transition hover:text-ink-950"
            >
              {t("partner.logout")}
            </button>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 lg:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-6">
            <p className="font-semibold text-yellow-900">{t("partner.pendingTitle")}</p>
            <p className="mt-2 text-sm text-yellow-800">{t("partner.pendingDesc")}</p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-lift">
              <h3 className="font-heading font-bold text-ink-950">{t("partner.statusTitle")}</h3>
              <p className="mt-3 text-sm text-neutral-600">
                {t("partner.statusEmail", { email: user?.email ?? "" })}
              </p>
              <p className="mt-2 text-xs font-semibold text-yellow-600">{t("partner.statusWaiting")}</p>
            </div>

            <div className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-lift">
              <h3 className="font-heading font-bold text-ink-950">{t("partner.contactTitle")}</h3>
              <p className="mt-3 text-sm text-neutral-600">
                {t("partner.contactDesc", { email: SUPPORT_EMAIL })}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
