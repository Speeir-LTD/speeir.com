// src/components/admin/Header.tsx
'use client';

import { FiMenu, FiSearch, FiLogOut } from 'react-icons/fi';
import { useSidebar } from '@/hooks/use-sidebar';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import Image from 'next/image';

export function AdminHeader() {
  const { toggle } = useSidebar();

  const authorImage = `https://ui-avatars.com/api/?name=ADMINUSER&background=random`;

  return (
    <header className="sticky top-0 z-40 border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg supports-backdrop-blur:bg-white/60">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* Left section - Mobile menu button */}
        <div className="flex items-center lg:hidden">
          <button
            onClick={toggle}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            aria-label="Toggle sidebar"
          >
            <FiMenu className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Center section - Search */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Search..."
            />
          </div>
        </div>

        {/* Right section - Icons and user dropdown */}
        <div className="flex items-center space-x-3">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button className="flex items-center space-x-2 focus:outline-none">
                <Image
                  src={authorImage}
                  alt="Admin"
                  width={36}
                  height={36}
                  className="rounded-full"
                />
                <span className="hidden md:inline-block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Admin User
                </span>
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                align="end"
                sideOffset={8}
                className="w-48 overflow-hidden rounded-xl border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-gray-800 z-50"
              >
                <DropdownMenu.Item
                  onSelect={async () => {
                    await fetch('/api/auth/logout', { method: 'POST' });
                    window.location.href = '/login';
                  }}
                  className="flex cursor-pointer items-center px-4 py-2 text-sm text-red-600 outline-none transition-colors hover:bg-gray-100 dark:text-red-400 dark:hover:bg-gray-700"
                >
                  <FiLogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </div>
    </header>
  );
}