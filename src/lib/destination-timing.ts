/** Patong çıkışlı — sadece yol süresi ve ziyaret dahil toplam süre */
export const DESTINATION_TIMING: Record<string, { driveTime: string; totalTime: string }> = {
  "big-buddha": { driveTime: "25–35 dk", totalTime: "1–1,5 saat" },
  "promthep-cape": { driveTime: "45–55 dk", totalTime: "2–3 saat (gün batımı)" },
  "samet-nangshe": { driveTime: "50–60 dk", totalTime: "3–5 saat (gün doğumu)" },
  "wat-chalong": { driveTime: "20–30 dk", totalTime: "1–1,5 saat" },
  "karon-viewpoint": { driveTime: "25–35 dk", totalTime: "45–60 dk" },
  "windmill-viewpoint": { driveTime: "40–50 dk", totalTime: "1–1,5 saat" },
  "freedom-beach": { driveTime: "15–20 dk", totalTime: "3–5 saat (tekne/yürüyüş)" },
  "monkey-cave": { driveTime: "1,5–2 saat", totalTime: "4–5 saat" },
  "monkey-hill": { driveTime: "30–40 dk", totalTime: "1–1,5 saat" },
  "khao-sok-national-park": { driveTime: "2,5–3 saat", totalTime: "2 gün önerilir" },
  "phang-nga-bay": { driveTime: "1–1,5 saat", totalTime: "5–7 saat (tekne turu)" },
  "mai-khao-plane-spot": { driveTime: "40–50 dk", totalTime: "2–3 saat" },
  "old-phuket-town": { driveTime: "25–35 dk", totalTime: "2–4 saat" },
  "kata-beach": { driveTime: "25–35 dk", totalTime: "2–4 saat" },
  "karon-beach": { driveTime: "20–30 dk", totalTime: "2–4 saat" },
  "rawai-beach": { driveTime: "40–50 dk", totalTime: "2–3 saat" },
  "nai-harn-beach": { driveTime: "40–50 dk", totalTime: "2–4 saat" },
};

export function getDestinationTiming(slug: string, legacyDuration: string) {
  const known = DESTINATION_TIMING[slug];
  if (known) return known;
  return {
    driveTime: legacyDuration,
    totalTime: `${legacyDuration} + ziyaret (yaklaşık 1–2 saat)`,
  };
}
