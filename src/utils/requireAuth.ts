import { cookies } from 'next/headers';
import { SESSION_COOKIE, verifySessionToken } from '@/utils/auth';

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return false;
  const session = await verifySessionToken(token);
  return session !== null;
}
