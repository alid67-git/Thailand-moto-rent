import SunCalc from "suncalc";

/** Phuket merkez koordinatları */
const PHUKET_LAT = 7.8804;
const PHUKET_LNG = 98.3923;

export function getPhuketSunTimes(date = new Date()) {
  return SunCalc.getTimes(date, PHUKET_LAT, PHUKET_LNG);
}

/** Gün batımından gün doğumuna kadar true (Phuket saati) */
export function isPhuketNight(date = new Date()): boolean {
  const { sunrise, sunset } = getPhuketSunTimes(date);
  return date < sunrise || date >= sunset;
}

export function msUntilPhuketThemeChange(date = new Date()): number {
  const { sunrise, sunset } = getPhuketSunTimes(date);
  const night = isPhuketNight(date);
  let next: Date;
  if (night) {
    if (date < sunrise) {
      next = sunrise;
    } else {
      const tomorrow = new Date(date);
      tomorrow.setDate(tomorrow.getDate() + 1);
      next = getPhuketSunTimes(tomorrow).sunrise;
    }
  } else {
    next = sunset;
  }
  return Math.max(1000, next.getTime() - date.getTime());
}
