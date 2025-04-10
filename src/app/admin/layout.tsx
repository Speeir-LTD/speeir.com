// src/app/admin/layout.tsx
'use client';

import { AdminSidebar } from '@/components/Admin/Sidebar';
import { AdminHeader } from '@/components/Admin/Header';
import { MobileSidebar } from '@/components/Admin/MobileSidebar';
import { ThemeProvider } from 'next-themes';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
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
    </ThemeProvider>
  );
}