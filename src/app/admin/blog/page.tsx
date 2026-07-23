'use client';

import { useState, useEffect } from 'react';
import { DataTable } from '@/components/Admin/data-table';
import { BlogColumns } from '@/app/admin/blog/columns';
import { PlusIcon, RefreshCwIcon, SearchIcon, XIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { BlogModal } from './BlogModal'; // Ensure named import
import { toast } from 'sonner';
import { BlogPost } from '@/types/post';

const PAGE_SIZE = 10;

export default function BlogAdminPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null); // Post being edited
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Debounce free-text search so we don't hit the API on every keystroke.
  useEffect(() => {
    const timer = setTimeout(() => setSearchQuery(searchInput), 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // Any filter change should jump back to page 1, otherwise you can land on
  // an out-of-range page with zero results.
  useEffect(() => {
    setPage(1);
  }, [searchQuery, statusFilter]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({ page: String(page), limit: String(PAGE_SIZE) });
      if (searchQuery) params.set('search', searchQuery);
      if (statusFilter) params.set('status', statusFilter);
      const response = await fetch(`/api/blog?${params.toString()}`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to fetch posts');
      setPosts(data.data);
      setTotal(data.total ?? data.data.length);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id: string) => {
    try {
      const confirmed = window.confirm('Are you sure you want to delete this post?'); // Confirmation dialog
      if (!confirmed) return;
      const response = await fetch(`/api/blog?id=${id}`, { method: 'DELETE' });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to delete post');
      setPosts((prev) => prev.filter((post) => post._id.toString() !== id));
      setTotal((prev) => Math.max(0, prev - 1));
      toast.success('Post deleted successfully');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  const editPost = (post: BlogPost) => {
    setEditingPost(post); // Set the post to be edited
    setIsCreateOpen(true); // Open the BlogCreateModal in edit mode
  };

  useEffect(() => {
    fetchPosts();
  }, [page, searchQuery, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Blog Management</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {loading ? 'Loading…' : `${total} post${total === 1 ? '' : 's'} total`}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <SearchIcon className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2 pl-9 pr-9 text-sm shadow-sm transition-all focus:border-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:bg-gray-800"
            />
            {searchInput && (
              <button
                onClick={() => setSearchInput('')}
                aria-label="Clear search"
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-200"
              >
                <XIcon className="h-4 w-4" />
              </button>
            )}
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          >
            <option value="">All Status</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>

          <button
            onClick={fetchPosts}
            disabled={loading}
            className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
          >
            <RefreshCwIcon className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>

          <button
            onClick={() => setIsCreateOpen(true)}
            className="inline-flex items-center justify-center rounded-xl border border-transparent bg-blue-600 px-3 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <PlusIcon className="mr-2 h-4 w-4" />
            New Post
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm dark:border-gray-700">
        <DataTable
          columns={BlogColumns}
          data={posts}
          loading={loading}
          emptyMessage={searchQuery || statusFilter ? 'No posts match your filters' : 'No posts yet'}
          meta={{
            onDelete: deletePost,
            onEdit: editPost,
          }}
        />

        {!loading && total > 0 && (
          <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 dark:border-gray-700 dark:bg-gray-800">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Page {page} of {totalPages}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="inline-flex items-center rounded-lg border border-gray-200 px-2.5 py-1.5 text-sm text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                <ChevronLeftIcon className="h-4 w-4" />
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className="inline-flex items-center rounded-lg border border-gray-200 px-2.5 py-1.5 text-sm text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                <ChevronRightIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      <BlogModal
        open={isCreateOpen}
        mode={editingPost ? 'edit' : 'create'} // Determine mode based on editingPost
        post={editingPost} // Pass the post to be edited
        onClose={() => {
          setIsCreateOpen(false);
          setEditingPost(null); // Reset editingPost after closing
        }}
        onSuccess={(updatedPost) => {
          if (editingPost) {
            // Update the post in the list
            setPosts((prev) =>
              prev.map((p) => (p._id === updatedPost._id ? updatedPost : p))
            );
            toast.success('Post updated successfully');
          } else {
            // Refetch so the new post respects current sort/filter/pagination
            // instead of being spliced in regardless of whether it matches.
            fetchPosts();
            toast.success('Post created successfully');
          }
          setIsCreateOpen(false);
          setEditingPost(null); // Reset editingPost after success
        }}
      />
    </div>
  );
}
