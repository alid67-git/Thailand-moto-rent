import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { deleteFleetOverride, saveFleetOverride } from "@/lib/admin-store";

async function authorized() {
  const c = await cookies();
  return c.get("tmr-admin-session")?.value === "1";
}

export async function POST(request: Request) {
  if (!(await authorized())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  const moto = saveFleetOverride(body);
  return NextResponse.json(moto);
}

export async function DELETE(request: Request) {
  if (!(await authorized())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
  deleteFleetOverride(id);
  return NextResponse.json({ ok: true });
}
