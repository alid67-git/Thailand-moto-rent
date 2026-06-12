"use client";

import { useTheme } from "@/context/ThemeContext";

export function ThemeToggle() {
  const { theme, toggleTheme, isAuto } = useTheme();

  const label = isAuto
    ? "Manuel moda geç (otomatik: Phuket gün batımı/doğumu)"
    : "Otomatik moda dön (gün batımı → dark, gün doğumu → light)";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="touch-target relative flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200 bg-white text-ink-950 transition hover:bg-neutral-50 dark:border-ink-600 dark:bg-ink-800 dark:text-neutral-100 dark:hover:bg-ink-700"
      aria-label={label}
      title={label}
    >
      {isAuto && (
        <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-brand-500 ring-2 ring-white dark:ring-ink-800" />
      )}
      {theme === "dark" ? (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}
