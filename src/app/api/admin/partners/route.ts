import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { deletePartner, getAdminData, savePartner } from "@/lib/admin-store";

async function authorized() {
  const c = await cookies();
  return c.get("tmr-admin-session")?.value === "1";
}

export async function GET() {
  if (!(await authorized())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(getAdminData());
}

export async function POST(request: Request) {
  if (!(await authorized())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  const partner = savePartner(body);
  return NextResponse.json(partner);
}

export async function DELETE(request: Request) {
  if (!(await authorized())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
  deletePartner(id);
  return NextResponse.json({ ok: true });
}
