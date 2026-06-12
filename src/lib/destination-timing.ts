/** Patong çıkışlı — yol ve toplam süre i18n anahtarları */
const TIMING_BY_I18N_BASE: Record<string, { driveKey: string; totalKey: string }> = {
  bigBuddha: {
    driveKey: "destinations.timing.bigBuddha.drive",
    totalKey: "destinations.timing.bigBuddha.total",
  },
  promthep: {
    driveKey: "destinations.timing.promthep.drive",
    totalKey: "destinations.timing.promthep.total",
  },
  sametNangshe: {
    driveKey: "destinations.timing.sametNangshe.drive",
    totalKey: "destinations.timing.sametNangshe.total",
  },
  chalong: {
    driveKey: "destinations.timing.chalong.drive",
    totalKey: "destinations.timing.chalong.total",
  },
  karonViewpoint: {
    driveKey: "destinations.timing.karonViewpoint.drive",
    totalKey: "destinations.timing.karonViewpoint.total",
  },
  windmillViewpoint: {
    driveKey: "destinations.timing.windmillViewpoint.drive",
    totalKey: "destinations.timing.windmillViewpoint.total",
  },
  freedomBeach: {
    driveKey: "destinations.timing.freedomBeach.drive",
    totalKey: "destinations.timing.freedomBeach.total",
  },
  monkeyHill: {
    driveKey: "destinations.timing.monkeyHill.drive",
    totalKey: "destinations.timing.monkeyHill.total",
  },
  phangNga: {
    driveKey: "destinations.timing.phangNga.drive",
    totalKey: "destinations.timing.phangNga.total",
  },
  oldTown: {
    driveKey: "destinations.timing.oldTown.drive",
    totalKey: "destinations.timing.oldTown.total",
  },
  kataBeach: {
    driveKey: "destinations.timing.kataBeach.drive",
    totalKey: "destinations.timing.kataBeach.total",
  },
  karonBeach: {
    driveKey: "destinations.timing.karonBeach.drive",
    totalKey: "destinations.timing.karonBeach.total",
  },
  rawai: {
    driveKey: "destinations.timing.rawai.drive",
    totalKey: "destinations.timing.rawai.total",
  },
  naiHarn: {
    driveKey: "destinations.timing.naiHarn.drive",
    totalKey: "destinations.timing.naiHarn.total",
  },
};

export function getDestinationTimingKeys(
  slug: string,
  i18nBase: string | null,
): { driveKey: string; totalKey: string } | null {
  if (i18nBase && TIMING_BY_I18N_BASE[i18nBase]) {
    return TIMING_BY_I18N_BASE[i18nBase];
  }
  return null;
}

/** @deprecated use useDestinationLabel().driveTime / totalTime */
export function getDestinationTiming(slug: string, legacyDuration: string) {
  return {
    driveTime: legacyDuration,
    totalTime: `${legacyDuration} + visit`,
  };
}
