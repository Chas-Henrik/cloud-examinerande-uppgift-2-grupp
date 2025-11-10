import { NextRequest, NextResponse } from "next/server";
import { saveImageFile, saveImageMetadata } from "@/lib/supabase/queries";

// Saves an image file and metadata for a specific entry
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {

  try {

    // Check for authentication token
    const sb_access_token = req.cookies.get("sb_access_token")?.value;
    if (!sb_access_token) {
      console.error('Create entry error: Unauthorized');
      return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const image = await req.blob(); // Parse request body

    const fileData = await saveImageFile(sb_access_token, { image });

    await saveImageMetadata(sb_access_token, { entryId: id, pathName: fileData.path });

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    console.error('entries POST error:', err);
    if (err instanceof Error) {
      return NextResponse.json({ ok: false, message: err.message }, { status: 500 });
    } else {
      return NextResponse.json({ ok: false, message: String(err) }, { status: 500 });
    }
  }
}
