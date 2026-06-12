"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { isPhuketNight, msUntilPhuketThemeChange } from "@/lib/sunTimes";

type Theme = "light" | "dark";
type ThemePreference = "auto" | "light" | "dark";

const STORAGE_KEY = "tmr_theme_pref";

interface ThemeContextValue {
  theme: Theme;
  preference: ThemePreference;
  setPreference: (pref: ThemePreference) => void;
  toggleTheme: () => void;
  isAuto: boolean;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
}

function resolveTheme(pref: ThemePreference): Theme {
  if (pref === "auto") return isPhuketNight() ? "dark" : "light";
  return pref;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [preference, setPreferenceState] = useState<ThemePreference>("auto");
  const [theme, setThemeState] = useState<Theme>("light");
  const [ready, setReady] = useState(false);

  const syncTheme = useCallback((pref: ThemePreference) => {
    const next = resolveTheme(pref);
    setThemeState(next);
    applyTheme(next);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as ThemePreference | null;
    const pref = stored === "light" || stored === "dark" ? stored : "auto";
    setPreferenceState(pref);
    syncTheme(pref);
    setReady(true);
  }, [syncTheme]);

  useEffect(() => {
    if (!ready) return;

    syncTheme(preference);

    let timer: ReturnType<typeof setTimeout>;
    const schedule = () => {
      const delay = msUntilPhuketThemeChange();
      timer = setTimeout(() => {
        if (preference === "auto") syncTheme("auto");
        schedule();
      }, delay);
    };
    schedule();

    const onVis = () => {
      if (preference === "auto") syncTheme("auto");
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [preference, ready, syncTheme]);

  const setPreference = useCallback(
    (pref: ThemePreference) => {
      setPreferenceState(pref);
      if (pref === "auto") localStorage.removeItem(STORAGE_KEY);
      else localStorage.setItem(STORAGE_KEY, pref);
      syncTheme(pref);
    },
    [syncTheme]
  );

  const toggleTheme = useCallback(() => {
    if (preference === "auto") {
      setPreference(isPhuketNight() ? "light" : "dark");
    } else {
      setPreference("auto");
    }
  }, [preference, setPreference]);

  const value = useMemo(
    () => ({
      theme: ready ? theme : "light",
      preference,
      setPreference,
      toggleTheme,
      isAuto: preference === "auto",
    }),
    [theme, preference, setPreference, toggleTheme, ready]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
