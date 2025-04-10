// src/app/admin/blog/columns.tsx
import { ColumnDef } from '@/components/Admin/data-table';
import { BlogPost } from '@/types/post';

export const BlogColumns: ColumnDef<BlogPost>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'author',
    header: 'Author',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
            status === 'published'
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'
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
      return row.original.views.toLocaleString();
    },
  },
];