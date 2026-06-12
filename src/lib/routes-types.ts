export interface SafetyTip {
  icon: string;
  title: string;
  text: string;
}

export type StopAccess = "moto" | "boat" | "walk";

export interface RouteStop {
  order: number;
  name: string;
  description: string;
  /** Çok günlük rotalarda gün numarası */
  day?: number;
  destinationSlug?: string;
  /** Önceki duraktan bu noktaya km (Patong çıkışı için Patong merkezinden) */
  driveKm: number;
  /** Sürüş süresi (dakika) */
  driveMin: number;
  /** Durakta geçirilen süre (dakika) */
  visitMin: number;
  lat?: number;
  lng?: number;
  access?: StopAccess;
  tips?: string;
}

export interface MotorcycleRoute {
  id: string;
  name: string;
  description: string;
  /** Kısa özet — liste kartı */
  tagline: string;
  /** Toplam motosiklet mesafesi (Patong gidiş-dönüş dahil) */
  distance: string;
  totalDriveKm: number;
  totalDriveMin: number;
  totalVisitMin: number;
  /** Sürüş + ziyaret (dakika) */
  totalDayMin: number;
  duration: string;
  difficulty: "Kolay" | "Orta" | "Zor";
  highlights: string;
  recommendedBike: string;
  image: string;
  bestTime: string;
  elevation: string;
  startPoint: string;
  parkingInfo: string;
  fuelEstimate?: string;
  stops: RouteStop[];
  safetyTips: SafetyTip[];
}
