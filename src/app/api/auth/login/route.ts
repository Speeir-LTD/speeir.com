import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { createSessionToken, SESSION_COOKIE } from '@/utils/auth';

export async function POST(request: Request) {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

  if (!adminEmail || !adminPasswordHash || !process.env.AUTH_SECRET) {
    console.error('Login attempted but ADMIN_EMAIL/ADMIN_PASSWORD_HASH/AUTH_SECRET are not configured');
    return NextResponse.json({ success: false, error: 'Server not configured' }, { status: 500 });
  }

  let body: { email?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request body' }, { status: 400 });
  }

  const { email, password } = body;
  if (!email || !password) {
    return NextResponse.json({ success: false, error: 'Email and password are required' }, { status: 400 });
  }

  const emailMatches = email.toLowerCase() === adminEmail.toLowerCase();
  const passwordMatches = await bcrypt.compare(password, adminPasswordHash);

  if (!emailMatches || !passwordMatches) {
    return NextResponse.json({ success: false, error: 'Invalid email or password' }, { status: 401 });
  }

  const token = await createSessionToken(adminEmail);
  const response = NextResponse.json({ success: true });
  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });
  return response;
}
