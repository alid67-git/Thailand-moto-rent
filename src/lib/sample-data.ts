import type { Bike, Booking, Partner } from "@/types";

export const SAMPLE_PARTNERS: Partner[] = [
  {
    id: "p1",
    name: "Patong Scooter Hub",
    locationId: "phuket-patong",
    status: "approved",
    commissionRate: 0.15,
    minInsuranceRequired: true,
    internationalLicenseAccepted: true,
  },
  {
    id: "p2",
    name: "Kata Beach Motors",
    locationId: "phuket-kata",
    status: "approved",
    commissionRate: 0.12,
    minInsuranceRequired: true,
    internationalLicenseAccepted: true,
  },
  {
    id: "p3",
    name: "Karon Ride Co.",
    locationId: "phuket-karon",
    status: "approved",
    commissionRate: 0.12,
    minInsuranceRequired: true,
    internationalLicenseAccepted: true,
  },
];

export const SAMPLE_BIKES: Bike[] = [
  { id: "b1", partnerId: "p1", modelId: "click-160", status: "available", maxRentalDays: 30 },
  { id: "b2", partnerId: "p1", modelId: "adv-160", status: "available", maxRentalDays: 21 },
  { id: "b3", partnerId: "p1", modelId: "forza-350", status: "available", maxRentalDays: 14 },
  { id: "b4", partnerId: "p2", modelId: "click-160", status: "available", maxRentalDays: 30 },
  { id: "b5", partnerId: "p2", modelId: "adv-160", status: "rented", maxRentalDays: 21 },
];

export const SAMPLE_BOOKINGS: Booking[] = [];
