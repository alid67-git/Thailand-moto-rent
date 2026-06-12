import type { PlatformRule } from "@/types";

export const PLATFORM_RULES: PlatformRule[] = [
  {
    id: "license-valid",
    category: "license",
    title: "Valid driving license required",
    description:
      "Renters must hold a valid motorcycle IDP (International Driving Permit) or Thai licence. Thai police do not accept home licences alone or other international documents.",
    enforced: true,
  },
  {
    id: "insurance-minimum",
    category: "insurance",
    title: "Minimum insurance coverage",
    description:
      "Every partner must provide third-party liability insurance. Full coverage is recommended for tourists.",
    enforced: true,
  },
  {
    id: "transparent-pricing",
    category: "pricing",
    title: "Transparent daily pricing",
    description:
      "Daily rate, deposit, and extra fees must be shown before booking. Hidden charges are not allowed.",
    enforced: true,
  },
  {
    id: "cancellation-window",
    category: "cancellation",
    title: "24-hour free cancellation",
    description:
      "Customers can cancel free of charge up to 24 hours before pickup unless partner policy states otherwise.",
    enforced: true,
  },
  {
    id: "vehicle-condition",
    category: "vehicle",
    title: "Vehicle safety checklist",
    description:
      "Bikes must pass a safety checklist: brakes, lights, tires, and helmet condition before each rental.",
    enforced: true,
  },
];
