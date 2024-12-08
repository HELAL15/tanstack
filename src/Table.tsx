import { useMemo, useState } from 'react';
import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  flexRender
} from '@tanstack/react-table';
import { useQuery } from '@tanstack/react-query';
import ReactPaginate from 'react-paginate';

const Table = () => {
  const [page, setPage] = useState(1);

  const fetchFaqs = async ({ queryKey }: { queryKey: [string, number] }) => {
    const [, page] = queryKey;
    const res = await fetch(
      `https://backend.smartvision4p.com/ecommerce-multivendor/public/api/faqs?page=${page}`
    );
    return res.json();
  };

  const { data: faqs, isLoading } = useQuery({
    queryKey: ['faqs', page],
    queryFn: fetchFaqs
    // keepPreviousData: true
  });

  const columns = useMemo(
    () => [
      {
        header: 'Answer',
        accessorKey: 'answer_ar'
      },
      {
        header: 'Question',
        accessorKey: 'question_ar'
      }
    ],
    []
  );

  const tableData = faqs?.data?.data || [];
  const totalPages = faqs?.data?.meta?.last_page || 1;

  const { getHeaderGroups, getRowModel } = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel()
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
          {isLoading ? (
            <tr>
              <td colSpan={columns.length}>Loading...</td>
            </tr>
          ) : (
            getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      <ReactPaginate
        onPageChange={({ selected }) => setPage(selected + 1)}
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        containerClassName="pagination"
        activeClassName="active"
      />
    </>
  );
};

export default Table;
