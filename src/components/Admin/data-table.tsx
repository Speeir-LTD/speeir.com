// src/components/admin/data-table.tsx
'use client';

import { useState } from 'react';
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from '@tanstack/react-table';

export type { ColumnDef };

declare module '@tanstack/react-table' {
  interface TableMeta<TData> {
    onEdit?: (row: TData) => void;
    onDelete?: (id: string) => void;
  }
}

interface DataTableProps<T> {
  columns: ColumnDef<T, any>[];
  data: T[];
  loading?: boolean;
  onRowClick?: (data: T) => void;
  meta?: Record<string, any>;
}

export function DataTable<T>({
  columns,
  data,
  loading = false,
  onRowClick,
  meta,
}: DataTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    meta,
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  scope="col"
                  className="cursor-pointer select-none px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  <div className="flex items-center">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {{ asc: <span className="ml-1">↑</span>, desc: <span className="ml-1">↓</span> }[
                      header.column.getIsSorted() as string
                    ] ?? null}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
          {loading ? (
            <tr>
              <td colSpan={columns.length} className="px-6 py-4 text-center">
                Loading...
              </td>
            </tr>
          ) : table.getRowModel().rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-6 py-4 text-center">
                No data available
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                onClick={() => onRowClick?.(row.original)}
                className={`hover:bg-gray-50 dark:hover:bg-gray-700 ${
                  onRowClick ? 'cursor-pointer' : ''
                }`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-300"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
