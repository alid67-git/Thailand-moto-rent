import Image from "next/image";
import type { Locale } from "@/i18n/config";

const flagSrc: Record<Locale, string> = {
  tr: "/flags/tr.svg",
  en: "/flags/gb.svg",
  th: "/flags/th.svg",
  de: "/flags/de.svg",
  fr: "/flags/fr.svg",
  ar: "/flags/sa.svg",
  zh: "/flags/zh.svg",
  ru: "/flags/ru.svg",
};

interface FlagIconProps {
  locale: Locale;
  className?: string;
}

export function FlagIcon({ locale, className = "" }: FlagIconProps) {
  return (
    <Image
      src={flagSrc[locale]}
      alt=""
      width={24}
      height={16}
      className={`rounded-sm object-cover shadow-sm ${className}`}
      aria-hidden
    />
  );
}
