import { NextResponse } from 'next/server';
import { signUp } from "@/lib/supabase/auth";

export async function POST(req: Request) {

  try {

    // Parse request body
    const { email, password } = await req.json();

    if (!email || !password) {
      console.error('Registration error: Email and password are required');
      return NextResponse.json({ ok: false,  message: 'Email and password are required' }, { status: 400 });
    }

    // Create new user
    const newUser = await signUp({ email, password });

    return NextResponse.json({ ok: true, message: 'User registered successfully', user: newUser }, { status: 201 });
    
  } catch (err: unknown) {
    console.error('Registration error:', err);
    if (err instanceof Error) {
      return NextResponse.json({ ok: false, message: err.message }, { status: 500 });
    } else {
      return NextResponse.json({ ok: false, message: String(err) }, { status: 500 });
    }
  }
  
}