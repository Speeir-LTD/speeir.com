'use client';

import { AdminSidebar } from '@/components/Admin/Sidebar';
import { AdminHeader } from '@/components/Admin/Header';
import { MobileSidebar } from '@/components/Admin/MobileSidebar';

// Auth is enforced server-side by src/middleware.ts, which redirects
// unauthenticated requests to /login before this component ever renders.
// Theme is provided by the app-wide ThemeProvider in ClientLayout/Providers,
// which already wraps every route including /admin.
export default function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative flex h-screen bg-gray-50 dark:bg-gray-900">
      <AdminSidebar />
      <MobileSidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminHeader />

        <main className="relative flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-800 transition-colors">
          {children}
        </main>
      </div>
    </div>
  );
}
