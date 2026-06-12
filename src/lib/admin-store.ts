import fs from "fs";
import path from "path";

export interface PartnerRecord {
  id: string;
  companyName: string;
  contactName: string;
  phone: string;
  email: string;
  area: string;
  notes: string;
  motorcycles: PartnerMotorcycle[];
  createdAt: string;
}

export interface PartnerMotorcycle {
  modelId: string;
  modelName: string;
  count: number;
}

export interface FleetOverride {
  id: string;
  brand: string;
  name: string;
  engineCc: number;
  dailyPriceThb: number;
  active: boolean;
}

export interface AdminData {
  partners: PartnerRecord[];
  fleetOverrides: FleetOverride[];
}

const DATA_PATH = path.join(process.cwd(), "src/data/admin-data.json");

function readData(): AdminData {
  try {
    const raw = fs.readFileSync(DATA_PATH, "utf-8");
    return JSON.parse(raw) as AdminData;
  } catch {
    return { partners: [], fleetOverrides: [] };
  }
}

function writeData(data: AdminData) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export function getAdminData(): AdminData {
  return readData();
}

export function savePartner(partner: Omit<PartnerRecord, "id" | "createdAt"> & { id?: string }): PartnerRecord {
  const data = readData();
  const record: PartnerRecord = {
    ...partner,
    id: partner.id ?? `p-${Date.now()}`,
    createdAt: partner.id
      ? data.partners.find((p) => p.id === partner.id)?.createdAt ?? new Date().toISOString()
      : new Date().toISOString(),
  };
  const idx = data.partners.findIndex((p) => p.id === record.id);
  if (idx >= 0) data.partners[idx] = record;
  else data.partners.push(record);
  writeData(data);
  return record;
}

export function deletePartner(id: string) {
  const data = readData();
  data.partners = data.partners.filter((p) => p.id !== id);
  writeData(data);
}

export function saveFleetOverride(moto: Omit<FleetOverride, "id"> & { id?: string }): FleetOverride {
  const data = readData();
  const record: FleetOverride = { ...moto, id: moto.id ?? `m-${Date.now()}` };
  const idx = data.fleetOverrides.findIndex((m) => m.id === record.id);
  if (idx >= 0) data.fleetOverrides[idx] = record;
  else data.fleetOverrides.push(record);
  writeData(data);
  return record;
}

export function deleteFleetOverride(id: string) {
  const data = readData();
  data.fleetOverrides = data.fleetOverrides.filter((m) => m.id !== id);
  writeData(data);
}

export function verifyAdminPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD ?? "tmr-admin-2026";
  return password === expected;
}
