import { Metadata } from 'next';
import AdminLayoutClient from './AdminLayoutClient';

// Admin is also disallowed in robots.ts, but noindex is a stronger,
// belt-and-suspenders signal against a URL getting indexed if it's ever
// discovered/linked from elsewhere.
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: 'https://speeir.com/admin',
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
