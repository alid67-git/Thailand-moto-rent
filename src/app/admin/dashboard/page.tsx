"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MOTORCYCLE_MODELS } from "@/lib/catalog";
import type { AdminData, FleetOverride, PartnerRecord } from "@/lib/admin-store";

const BASE_MODELS = MOTORCYCLE_MODELS.map((m) => ({ id: m.id, name: m.fullName }));

export default function AdminDashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<AdminData | null>(null);
  const [partnerForm, setPartnerForm] = useState({
    companyName: "",
    contactName: "",
    phone: "",
    email: "",
    area: "Patong",
    notes: "",
    motorcycles: [{ modelId: "click-160", modelName: "Honda Click 160", count: 1 }],
  });
  const [fleetForm, setFleetForm] = useState({
    brand: "Honda",
    name: "",
    engineCc: 160,
    dailyPriceThb: 400,
    active: true,
  });

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/partners");
    if (res.status === 401) {
      router.replace("/admin");
      return;
    }
    setData(await res.json());
  }, [router]);

  useEffect(() => {
    load();
  }, [load]);

  async function logout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.replace("/admin");
  }

  async function addPartner(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/admin/partners", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(partnerForm),
    });
    setPartnerForm({
      companyName: "",
      contactName: "",
      phone: "",
      email: "",
      area: "Patong",
      notes: "",
      motorcycles: [{ modelId: "click-160", modelName: "Honda Click 160", count: 1 }],
    });
    load();
  }

  async function addFleet(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/admin/fleet", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fleetForm),
    });
    setFleetForm({ brand: "Honda", name: "", engineCc: 160, dailyPriceThb: 400, active: true });
    load();
  }

  async function removePartner(id: string) {
    await fetch(`/api/admin/partners?id=${id}`, { method: "DELETE" });
    load();
  }

  async function removeFleet(id: string) {
    await fetch(`/api/admin/fleet?id=${id}`, { method: "DELETE" });
    load();
  }

  if (!data) {
    return (
      <main className="panel-section">
        <p className="text-muted">Yükleniyor…</p>
      </main>
    );
  }

  return (
    <main className="panel-section">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-heading text-3xl font-bold text-ink-950 dark:text-neutral-50">Yönetim Paneli</h1>
            <p className="mt-1 text-muted">Partner firmalar · filo · ek motor modelleri</p>
          </div>
          <button type="button" onClick={logout} className="btn-secondary">
            Çıkış
          </button>
        </div>

        <section className="mb-12">
          <h2 className="font-heading text-xl font-bold text-ink-950 dark:text-neutral-50">Temel filo (katalog)</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {BASE_MODELS.map((m) => (
              <div key={m.id} className="panel p-4">
                <p className="font-semibold text-ink-950 dark:text-neutral-100">{m.name}</p>
                <p className="text-xs text-muted">ID: {m.id}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="grid gap-10 lg:grid-cols-2">
          <section>
            <h2 className="font-heading text-xl font-bold text-ink-950 dark:text-neutral-50">Yeni partner</h2>
            <form onSubmit={addPartner} className="panel mt-4 space-y-3 p-6">
              <input className="field" placeholder="Firma adı" value={partnerForm.companyName} onChange={(e) => setPartnerForm({ ...partnerForm, companyName: e.target.value })} required />
              <input className="field" placeholder="Yetkili adı" value={partnerForm.contactName} onChange={(e) => setPartnerForm({ ...partnerForm, contactName: e.target.value })} required />
              <input className="field" placeholder="Telefon" value={partnerForm.phone} onChange={(e) => setPartnerForm({ ...partnerForm, phone: e.target.value })} />
              <input className="field" placeholder="E-posta" type="email" value={partnerForm.email} onChange={(e) => setPartnerForm({ ...partnerForm, email: e.target.value })} />
              <input className="field" placeholder="Bölge" value={partnerForm.area} onChange={(e) => setPartnerForm({ ...partnerForm, area: e.target.value })} />
              <textarea className="field min-h-[80px]" placeholder="Notlar" value={partnerForm.notes} onChange={(e) => setPartnerForm({ ...partnerForm, notes: e.target.value })} />
              <p className="text-label">Motosikletler</p>
              {partnerForm.motorcycles.map((m, i) => (
                <div key={i} className="flex gap-2">
                  <select
                    className="field flex-1"
                    value={m.modelId}
                    onChange={(e) => {
                      const model = BASE_MODELS.find((x) => x.id === e.target.value);
                      const next = [...partnerForm.motorcycles];
                      next[i] = { ...next[i], modelId: e.target.value, modelName: model?.name ?? "" };
                      setPartnerForm({ ...partnerForm, motorcycles: next });
                    }}
                  >
                    {BASE_MODELS.map((bm) => (
                      <option key={bm.id} value={bm.id}>{bm.name}</option>
                    ))}
                  </select>
                  <input
                    type="number"
                    min={0}
                    className="field w-20"
                    value={m.count}
                    onChange={(e) => {
                      const next = [...partnerForm.motorcycles];
                      next[i] = { ...next[i], count: Number(e.target.value) };
                      setPartnerForm({ ...partnerForm, motorcycles: next });
                    }}
                  />
                </div>
              ))}
              <button type="button" className="btn-secondary text-sm" onClick={() => setPartnerForm({ ...partnerForm, motorcycles: [...partnerForm.motorcycles, { modelId: "click-160", modelName: "Honda Click 160", count: 1 }] })}>
                + Motor satırı
              </button>
              <button type="submit" className="btn-primary w-full">Partner kaydet</button>
            </form>

            <div className="mt-6 space-y-3">
              {data.partners.map((p: PartnerRecord) => (
                <div key={p.id} className="panel p-4">
                  <div className="flex justify-between gap-2">
                    <div>
                      <p className="font-bold text-ink-950 dark:text-neutral-100">{p.companyName}</p>
                      <p className="text-sm text-body">{p.contactName} · {p.area}</p>
                      <p className="text-xs text-muted">{p.phone} · {p.email}</p>
                      <ul className="mt-2 text-sm text-body">
                        {p.motorcycles.map((m) => (
                          <li key={m.modelId}>{m.modelName}: {m.count} adet</li>
                        ))}
                      </ul>
                    </div>
                    <button type="button" className="text-sm text-red-600" onClick={() => removePartner(p.id)}>Sil</button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-ink-950 dark:text-neutral-50">Ek motor modeli</h2>
            <form onSubmit={addFleet} className="panel mt-4 space-y-3 p-6">
              <input className="field" placeholder="Marka" value={fleetForm.brand} onChange={(e) => setFleetForm({ ...fleetForm, brand: e.target.value })} />
              <input className="field" placeholder="Model adı" value={fleetForm.name} onChange={(e) => setFleetForm({ ...fleetForm, name: e.target.value })} required />
              <input className="field" type="number" placeholder="CC" value={fleetForm.engineCc} onChange={(e) => setFleetForm({ ...fleetForm, engineCc: Number(e.target.value) })} />
              <input className="field" type="number" placeholder="Günlük THB" value={fleetForm.dailyPriceThb} onChange={(e) => setFleetForm({ ...fleetForm, dailyPriceThb: Number(e.target.value) })} />
              <button type="submit" className="btn-primary w-full">Model ekle</button>
            </form>

            <div className="mt-6 space-y-3">
              {data.fleetOverrides.map((m: FleetOverride) => (
                <div key={m.id} className="panel flex items-center justify-between p-4">
                  <div>
                    <p className="font-bold text-ink-950 dark:text-neutral-100">{m.brand} {m.name}</p>
                    <p className="text-sm text-body">{m.engineCc} cc · ฿{m.dailyPriceThb}/gün</p>
                  </div>
                  <button type="button" className="text-sm text-red-600" onClick={() => removeFleet(m.id)}>Sil</button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
