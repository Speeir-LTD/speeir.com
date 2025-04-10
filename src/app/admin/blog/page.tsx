// src/app/admin/blog/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { DataTable } from '@/components/Admin/data-table';
import { BlogColumns } from '@/app/admin/blog/columns';
import { PlusIcon, RefreshCwIcon } from 'lucide-react';
import { BlogCreateModal } from '@/app/admin/blog/BlogCreateModal';
import { toast } from 'sonner';

export default function BlogAdminPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/blog/ff`);
      const data = await response.json();
      setPosts(data.data);
    } catch (error) {
      toast.error('Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [searchQuery, statusFilter]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">Blog Management</h1>
        
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 pr-10 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-200"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            <option value="">All Status</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>

          <button
            onClick={fetchPosts}
            className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
          >
            <RefreshCwIcon className="mr-2 h-4 w-4" />
            Refresh
          </button>

          <button
            onClick={() => setIsCreateOpen(true)}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <PlusIcon className="mr-2 h-4 w-4" />
            New Post
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm dark:border-gray-700">
        <DataTable 
          columns={BlogColumns} 
          data={posts} 
          loading={loading}
        />
      </div>

      <BlogCreateModal 
        open={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSuccess={(newPost) => {
          setPosts([newPost, ...posts]);
          toast.success('Post created successfully');
        }}
      />
    </div>
  );
}