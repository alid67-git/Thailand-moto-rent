import { getModelById } from "@/lib/catalog";
import {
  CANCELLATION_INSURANCE,
  getAddonById,
  INSURANCE_OPTIONS,
  TOPCASE_OPTIONS,
} from "@/lib/addons";
import type { BookingSelection, PriceBreakdown } from "@/types";

export function rentalDays(startDate: string, endDate: string): number {
  if (!startDate || !endDate) return 1;
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  return Math.max(1, diff);
}

export function calculatePrice(selection: BookingSelection): PriceBreakdown | null {
  const model = getModelById(selection.modelId);
  if (!model) return null;

  const days = rentalDays(selection.startDate, selection.endDate);
  const insurance =
    getAddonById(selection.insuranceId, INSURANCE_OPTIONS) ?? INSURANCE_OPTIONS[0];
  const topcase =
    getAddonById(selection.topcaseId, TOPCASE_OPTIONS) ?? TOPCASE_OPTIONS[0];

  const baseRentalThb = model.dailyPriceThb * days;
  const insuranceThb = insurance.pricePerDayThb * days + insurance.priceFlatThb;
  const topcaseThb = topcase.pricePerDayThb * days + topcase.priceFlatThb;
  const cancellationInsuranceThb = selection.cancellationInsurance
    ? CANCELLATION_INSURANCE.priceFlatThb
    : 0;

  const totalThb = baseRentalThb + insuranceThb + topcaseThb + cancellationInsuranceThb;

  return {
    days,
    baseRentalThb,
    insuranceThb,
    topcaseThb,
    cancellationInsuranceThb,
    depositThb: model.depositThb,
    totalThb,
    payNowThb: totalThb,
  };
}

export function formatThb(amount: number): string {
  return `฿${amount.toLocaleString("en-US")}`;
}
