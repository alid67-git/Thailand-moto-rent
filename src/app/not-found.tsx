"use client";

import Link from "next/link";
import { useLocale } from "@/context/LocaleContext";

export default function NotFound() {
  const { t } = useLocale();

  return (
    <main className="flex min-h-[60vh] items-center justify-center px-4 py-20">
      <div className="mx-auto max-w-md text-center">
        <p className="font-heading text-6xl font-extrabold text-brand-500">404</p>
        <h1 className="mt-4 font-heading text-2xl font-bold text-ink-950 dark:text-white">
          {t("notFound.title")}
        </h1>
        <p className="mt-3 text-neutral-600 dark:text-neutral-300">
          {t("notFound.message")}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex justify-center rounded-xl bg-thai-gradient px-6 py-3 font-bold text-white hover:opacity-95"
          >
            {t("notFound.backHome")}
          </Link>
          <Link
            href="/destinations"
            className="inline-flex justify-center rounded-xl border border-brand-300 px-6 py-3 font-bold text-brand-700 hover:bg-brand-50 dark:border-ink-600 dark:text-white dark:hover:bg-ink-800"
          >
            {t("notFound.destinations")}
          </Link>
        </div>
      </div>
    </main>
  );
}
