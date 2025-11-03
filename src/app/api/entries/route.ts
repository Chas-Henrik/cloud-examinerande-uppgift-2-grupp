import { NextRequest, NextResponse } from "next/server";
import { createEntry, getEntries } from "@/lib/supabase/queries";

export async function POST(req: NextRequest) {

  // Check for authentication token
  const sb_access_token = req.cookies.get("sb_access_token")?.value;
  if (!sb_access_token) {
    console.error('Create entry error: Unauthorized');
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  const { title, content } = await req.json(); // Parse request body

  const data = await createEntry(sb_access_token, { title, content });

  return NextResponse.json({ ok: true, data: data });
}

export async function GET(req: NextRequest) {

  // Check for authentication token
  const sb_access_token = req.cookies.get("sb_access_token")?.value;
  if (!sb_access_token) {
    console.error('Get entries error: Unauthorized');
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  const data = await getEntries(sb_access_token);

  return NextResponse.json({ ok: true, data: data });
}
