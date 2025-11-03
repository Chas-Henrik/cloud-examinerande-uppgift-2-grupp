import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Create response
    const response = NextResponse.json({ ok: true, message: 'Logged out successfully' }, { status: 200 });
    
    // Clear the authentication cookie
    response.cookies.set('sb_access_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      expires: new Date(0), // delete cookie
    });
    
    return response;
  } catch (err: unknown) {
    console.error('Logout error:', err);
    if (err instanceof Error) {
      return NextResponse.json({ ok: false, message: err.message }, { status: 500 });
    } else {
      return NextResponse.json({ ok: false, message: String(err) }, { status: 500 });
    }
  }
}