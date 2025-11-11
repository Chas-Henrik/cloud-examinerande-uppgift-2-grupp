import { NextRequest, NextResponse } from "next/server";
import { updateEntry, deleteEntry, deleteImageFiles } from "@/lib/supabase/queries";

export async function PATCH(req: NextRequest, context: { params: Promise<{ id: string }>}) {

  try {
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
  } catch (err: unknown) {
    console.error('entries/id PATCH error:', err);
    if (err instanceof Error) {
      return NextResponse.json({ ok: false, message: err.message }, { status: 500 });
    } else {
      return NextResponse.json({ ok: false, message: String(err) }, { status: 500 });
    }
  }
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }>}) : Promise<NextResponse> {

  try {
    // Check for authentication token
    const sb_access_token = req.cookies.get("sb_access_token")?.value;
    if (!sb_access_token) {
      console.error('Delete entry error: Unauthorized');
      return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
    } 

    const { id } = await context.params;

    const deletedData = await deleteEntry(sb_access_token, id);

    await deleteImageFiles(sb_access_token, deletedData)

    return NextResponse.json({ ok: true, message: "Entry deleted successfully" });
  } catch (err: unknown) {
    console.error('entries/id DELETE error:', err);
    if (err instanceof Error) {
      return NextResponse.json({ ok: false, message: err.message }, { status: 500 });
    } else {
      return NextResponse.json({ ok: false, message: String(err) }, { status: 500 });
    }
  }
}

