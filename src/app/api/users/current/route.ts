import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/supabase/auth";


export async function GET(req: NextRequest) {

  // Check for authentication token
  const sb_access_token = req.cookies.get("sb_access_token")?.value;
  if (!sb_access_token) {
    console.error('Get current user error: Unauthorized');
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  const user = await getCurrentUser(sb_access_token);

  return NextResponse.json({ ok: true, data: user });
}
