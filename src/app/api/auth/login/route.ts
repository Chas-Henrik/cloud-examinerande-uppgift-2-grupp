import { NextResponse } from 'next/server';
import { signIn } from "@/lib/supabase/auth";

export async function POST(req: Request) {

  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      console.error('Login error: Email and password are required');
      return NextResponse.json({ ok: false, message: 'Email and password are required' }, { status: 400 });
    }

    const data = await signIn({ email, password });

    // Create response
    const response = NextResponse.json({ ok: true, message: 'Login successful' }, { status: 200 });

    // Set cookie with access token
    response.cookies.set('sb_access_token', data.session.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: data.session.expires_in
    });

    return response;
  } catch (err: unknown) {
    console.error('Login error:', err);
    if (err instanceof Error) {
      return NextResponse.json({ ok: false, message: err.message }, { status: 500 });
    } else {
      return NextResponse.json({ ok: false, message: String(err) }, { status: 500 });
    }
  }

}