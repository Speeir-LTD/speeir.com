// src/components/admin/Header.tsx
'use client';

import { useSidebar } from '@/hooks/use-sidebar';

export function AdminHeader() {
  const { toggle } = useSidebar();

  return (
    <div className="sticky top-0 z-10 border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur">
      <div className="flex items-center justify-between h-16 px-4">
        <div className="flex items-center md:hidden">
          <button
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={toggle}
            aria-label="Toggle Sidebar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}