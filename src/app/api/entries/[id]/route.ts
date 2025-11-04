import { NextRequest, NextResponse } from "next/server";
import { updateEntry, deleteEntry } from "@/lib/supabase/queries";

export async function PATCH(req: NextRequest, context: { params: Promise<{ id: string }>}) {

  // Check for authentication token
  const sb_access_token = req.cookies.get("sb_access_token")?.value;
  if (!sb_access_token) {
    console.error('Create entry error: Unauthorized');
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;

  const { title, content } = await req.json(); // Parse request body
  
  await updateEntry(sb_access_token, id, { title, content });

  return NextResponse.json({ ok: true, message: "Entry updated successfully" });
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }>}) : Promise<NextResponse> {

  // Check for authentication token
  const sb_access_token = req.cookies.get("sb_access_token")?.value;
  if (!sb_access_token) {
    console.error('Delete entry error: Unauthorized');
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  } 

  const { id } = await context.params;

  await deleteEntry(sb_access_token, id);

  return NextResponse.json({ ok: true, message: "Entry deleted successfully" });
}

