import React from 'react';
import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  flexRender
} from '@tanstack/react-table';

const Table = () => {
  const data = React.useMemo(
    () => [
      { name: 'John Doe', age: 28 },
      { name: 'Jane Smith', age: 34 },
      { name: 'Peter Johnson', age: 22 },
      { name: 'John Doe', age: 28 },
      { name: 'Jane Smith', age: 34 },
      { name: 'Peter Johnson', age: 22 },
      { name: 'John Doe', age: 28 },
      { name: 'Jane Smith', age: 34 },
      { name: 'Peter Johnson', age: 22 },
      { name: 'John Doe', age: 28 },
      { name: 'Jane Smith', age: 34 },
      { name: 'Peter Johnson', age: 22 },
      { name: 'John Doe', age: 28 },
      { name: 'Jane Smith', age: 34 },
      { name: 'Peter Johnson', age: 22 },
      { name: 'John Doe', age: 28 },
      { name: 'Jane Smith', age: 34 },
      { name: 'Peter Johnson', age: 22 },
      { name: 'John Doe', age: 28 },
      { name: 'Jane Smith', age: 34 },
      { name: 'Peter Johnson', age: 22 }
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      {
        header: 'Name',
        accessorKey: 'name' // Key to access the data
      },
      {
        header: 'Age',
        accessorKey: 'age' // Key to access the data
      }
    ],
    []
  );

  const tableInstance = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel()
  });

  return (
    <>
      <table>
        <thead>
          {tableInstance.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {tableInstance.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <button
          onClick={() => tableInstance.setPageIndex(0)}
          disabled={!tableInstance.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
          onClick={() => tableInstance.previousPage()}
          disabled={!tableInstance.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <button
          onClick={() => tableInstance.nextPage()}
          disabled={!tableInstance.getCanNextPage()}
        >
          {'>'}
        </button>
        <button
          onClick={() =>
            tableInstance.setPageIndex(tableInstance.getPageCount() - 1)
          }
          disabled={!tableInstance.getCanNextPage()}
        >
          {'>>'}
        </button>
        <span>
          Page{' '}
          <strong>
            {tableInstance.getState().pagination.pageIndex + 1} of{' '}
            {tableInstance.getPageCount()}
          </strong>
        </span>
      </div>
    </>
  );
};

export default Table;
