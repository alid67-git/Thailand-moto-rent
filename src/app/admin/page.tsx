"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (!res.ok) {
      setError("Hatalı şifre");
      return;
    }
    router.push("/admin/dashboard");
  }

  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="panel w-full max-w-md p-8">
        <h1 className="font-heading text-2xl font-bold text-ink-950 dark:text-neutral-50">Yönetim Paneli</h1>
        <p className="mt-2 text-sm text-muted">Partner ve filo yönetimi — yetkili giriş</p>
        <label className="mt-6 block">
          <span className="text-label">Şifre</span>
          <input
            type="password"
            className="field mt-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </label>
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        <button type="submit" className="btn-primary mt-6 w-full" disabled={loading}>
          {loading ? "Giriş…" : "Giriş yap"}
        </button>
      </form>
    </main>
  );
}
