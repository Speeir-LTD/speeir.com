"use client";

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const GlobalLoading = () => {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsLoading(true);
    
    // Simulate loading time for route changes
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [pathname]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        {/* Loading spinner */}
        <div className="relative">
          <div className="w-12 h-12 border-4 border-blue-200 dark:border-blue-800 rounded-full animate-spin">
            <div className="absolute top-0 left-0 w-12 h-12 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        </div>
        
        {/* Loading text */}
        <div className="text-center">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Loading...
          </p>
        </div>
      </div>
    </div>
  );
};

export default GlobalLoading;
