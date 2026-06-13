export function localizeDifficulty(
  value: string,
  labels: { easy: string; medium: string; hard: string },
): string {
  switch (value) {
    case "Kolay":
      return labels.easy;
    case "Orta":
      return labels.medium;
    case "Zor":
      return labels.hard;
    default:
      return value;
  }
}
