import type { Locale } from "./config";
import th from "./messages/th";
import ar from "./messages/ar";
import de from "./messages/de";
import en from "./messages/en";
import fr from "./messages/fr";
import tr from "./messages/tr";
import zh from "./messages/zh";
import ru from "./messages/ru";
import type { Messages } from "./messages/tr";

export const dictionaries: Record<Locale, Messages> = {
  tr,
  en,
  th,
  de,
  fr,
  ar,
  zh,
  ru,
};

export type { Messages };
