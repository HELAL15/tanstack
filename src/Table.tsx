import React from 'react';
import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  flexRender,
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
      { name: 'Peter Johnson', age: 22 },
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      {
        header: 'Name',
        accessorKey: 'name',
      },
      {
        header: 'Age',
        accessorKey: 'age',
      },
    ],
    []
  );

  const {
    getHeaderGroups,
    getRowModel,
    setPageIndex,
    getCanPreviousPage,
    previousPage,
    nextPage,
    getState,
    getCanNextPage,
    getPageCount,
  } = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <>
      <table>
        <thead>
          {getHeaderGroups().map((headerGroup) => (
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
          {getRowModel().rows.map((row) => (
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
          onClick={() => setPageIndex(0)}
          disabled={!getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button onClick={() => previousPage()} disabled={!getCanPreviousPage()}>
          {'<'}
        </button>
        <button onClick={() => nextPage()} disabled={!getCanNextPage()}>
          {'>'}
        </button>
        <button
          onClick={() => setPageIndex(getPageCount() - 1)}
          disabled={!getCanNextPage()}
        >
          {'>>'}
        </button>
        <span>
          Page{' '}
          <strong>
            {getState().pagination.pageIndex + 1} of {getPageCount()}
          </strong>
        </span>
      </div>
    </>
  );
};

export default Table;
