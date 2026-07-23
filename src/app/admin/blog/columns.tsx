// src/app/admin/blog/columns.tsx
import { ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';
import { BlogPost } from '@/types/post';

export const BlogColumns: ColumnDef<BlogPost>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => (
      <div className="max-w-xs">
        <p className="truncate font-medium text-gray-900 dark:text-white">{row.original.title}</p>
        {row.original.tags?.length > 0 && (
          <p className="truncate text-xs text-gray-400 dark:text-gray-500">
            {row.original.tags.join(', ')}
          </p>
        )}
      </div>
    ),
  },
  {
    accessorKey: 'author',
    header: 'Author',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status || 'unknown'; // Add fallback value
      return (
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
            status === 'published'
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
              : status === 'draft'
              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'
              : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100' // Style for unknown status
          }`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      return date.toLocaleDateString();
    },
  },
  {
    accessorKey: 'views',
    header: 'Views',
    cell: ({ row }) => {
      return row.original.views ? row.original.views.toLocaleString() : 'N/A'; // Add fallback for undefined values
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row, table }) => {
      const post = row.original;
      const onEdit = table.options.meta?.onEdit; // Access onEdit from meta
      const onDelete = table.options.meta?.onDelete; // Access onDelete from meta

      return (
        <div className="flex items-center gap-1">
          <button
            onClick={() => onEdit && onEdit(post)}
            aria-label="Edit post"
            title="Edit"
            className="rounded-md p-1.5 text-gray-500 hover:bg-blue-50 hover:text-blue-600 dark:text-gray-400 dark:hover:bg-blue-900/30 dark:hover:text-blue-400"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete && onDelete(post._id.toString())}
            aria-label="Delete post"
            title="Delete"
            className="rounded-md p-1.5 text-gray-500 hover:bg-red-50 hover:text-red-600 dark:text-gray-400 dark:hover:bg-red-900/30 dark:hover:text-red-400"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      );
    },
  },
];