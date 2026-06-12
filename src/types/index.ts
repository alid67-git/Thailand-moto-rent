import type { TranslationKey } from "@/i18n/translate";

export type PartnerStatus = "pending" | "approved" | "suspended";

export type BikeStatus = "available" | "rented" | "maintenance" | "retired";

export type BookingStatus =
  | "pending_payment"
  | "confirmed"
  | "active"
  | "completed"
  | "cancelled";

export type MotorcycleCategory = "scooter" | "adventure" | "maxi";

export type AddonCategory = "insurance" | "topcase" | "cancellation";

export interface ServiceLocation {
  id: string;
  provinceKey: TranslationKey;
  areaKey: TranslationKey;
  active: boolean;
  comingSoon?: boolean;
}

export interface Partner {
  id: string;
  name: string;
  locationId: string;
  status: PartnerStatus;
  commissionRate: number;
  minInsuranceRequired: boolean;
  internationalLicenseAccepted: boolean;
}

export interface MotorcycleModel {
  id: string;
  slug: string;
  brand: string;
  name: string;
  fullName: string;
  category: MotorcycleCategory;
  engineCc: number;
  dailyPriceThb: number;
  depositThb: number;
  helmetIncluded: boolean;
  abs: boolean;
  fuelCapacityL: number;
  seatHeightCm: number;
  descriptionKey: TranslationKey;
  bestForKeys: TranslationKey[];
  accentColor: string;
  image: string;
}

export interface AddonOption {
  id: string;
  category: AddonCategory;
  nameKey: TranslationKey;
  descriptionKey: TranslationKey;
  pricePerDayThb: number;
  priceFlatThb: number;
  recommended?: boolean;
  included?: boolean;
}

export interface BookingSelection {
  locationId: string;
  startDate: string;
  endDate: string;
  modelId: string;
  insuranceId: string;
  topcaseId: string;
  cancellationInsurance: boolean;
}

export interface PriceBreakdown {
  days: number;
  baseRentalThb: number;
  insuranceThb: number;
  topcaseThb: number;
  cancellationInsuranceThb: number;
  depositThb: number;
  totalThb: number;
  payNowThb: number;
}

export interface Bike {
  id: string;
  partnerId: string;
  modelId: string;
  status: BikeStatus;
  maxRentalDays: number;
}

export interface Booking {
  id: string;
  bikeId: string;
  partnerId: string;
  customerName: string;
  startDate: string;
  endDate: string;
  totalPriceThb: number;
  status: BookingStatus;
  selection: BookingSelection;
}

export interface PlatformRule {
  id: string;
  category: "license" | "insurance" | "pricing" | "cancellation" | "vehicle";
  title: string;
  description: string;
  enforced: boolean;
}
