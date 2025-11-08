'use client';

import { useState } from 'react';
import { ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react';

interface TableRow {
  year: string;
  revenue: number;
  netProfit: number;
  eps: number;
  pe: number;
  roe: number;
  debt: number;
}

export default function DataTable() {
  const [sortField, setSortField] = useState<keyof TableRow>('year');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('');
  const itemsPerPage = 5;

  const data: TableRow[] = [
    { year: 'FY 2024', revenue: 84000, netProfit: 10080, eps: 125.3, pe: 22.7, roe: 14.2, debt: 0.45 },
    { year: 'FY 2023', revenue: 73000, netProfit: 8760, eps: 108.9, pe: 24.1, roe: 13.8, debt: 0.52 },
    { year: 'FY 2022', revenue: 61000, netProfit: 7320, eps: 91.0, pe: 26.3, roe: 13.1, debt: 0.58 },
    { year: 'FY 2021', revenue: 52000, netProfit: 6240, eps: 77.6, pe: 28.9, roe: 12.4, debt: 0.63 },
    { year: 'FY 2020', revenue: 45000, netProfit: 5400, eps: 67.1, pe: 31.2, roe: 11.8, debt: 0.68 },
    { year: 'FY 2019', revenue: 39000, netProfit: 4680, eps: 58.2, pe: 29.8, roe: 11.2, debt: 0.72 },
    { year: 'FY 2018', revenue: 34000, netProfit: 4080, eps: 50.7, pe: 27.5, roe: 10.8, debt: 0.75 },
    { year: 'FY 2017', revenue: 30000, netProfit: 3600, eps: 44.8, pe: 25.9, roe: 10.3, debt: 0.78 },
  ];

  const handleSort = (field: keyof TableRow) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const filteredData = data.filter((row) =>
    row.year.toLowerCase().includes(filter.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    const aVal = a[sortField];
    const bVal = b[sortField];
    const multiplier = sortDirection === 'asc' ? 1 : -1;

    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return aVal.localeCompare(bVal) * multiplier;
    }
    return ((aVal as number) - (bVal as number)) * multiplier;
  });

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  const SortButton = ({ field, label }: { field: keyof TableRow; label: string }) => (
    <button
      onClick={() => handleSort(field)}
      className="flex items-center gap-1 hover:text-teal transition-colors group"
      aria-sort={
        sortField === field
          ? sortDirection === 'asc'
            ? 'ascending'
            : 'descending'
          : 'none'
      }
    >
      <span>{label}</span>
      <ArrowUpDown
        size={14}
        className={`transition-colors ${
          sortField === field ? 'text-teal' : 'text-gray-400 group-hover:text-teal'
        }`}
        aria-hidden="true"
      />
    </button>
  );

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
        <h3 className="text-lg font-bold text-gray-900">Historical Financial Data</h3>
        <input
          type="text"
          placeholder="Filter by year..."
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="input-field max-w-xs"
          aria-label="Filter table by year"
        />
      </div>

      <div className="overflow-x-auto -mx-4 md:mx-0">
        <div className="inline-block min-w-full align-middle">
          <table className="min-w-full divide-y divide-gray-200" role="table">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  <SortButton field="year" label="Year" />
                </th>
                <th scope="col" className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  <SortButton field="revenue" label="Revenue (₹Cr)" />
                </th>
                <th scope="col" className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  <SortButton field="netProfit" label="Net Profit (₹Cr)" />
                </th>
                <th scope="col" className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  <SortButton field="eps" label="EPS (₹)" />
                </th>
                <th scope="col" className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  <SortButton field="pe" label="P/E" />
                </th>
                <th scope="col" className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  <SortButton field="roe" label="ROE (%)" />
                </th>
                <th scope="col" className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  <SortButton field="debt" label="D/E" />
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedData.map((row, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition-colors"
                  tabIndex={0}
                >
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                    {row.year}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-700">
                    {row.revenue.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-700">
                    {row.netProfit.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-700">
                    {row.eps.toFixed(1)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-700">
                    {row.pe.toFixed(1)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-right">
                    <span className={row.roe >= 12 ? 'text-green-600 font-semibold' : 'text-gray-700'}>
                      {row.roe.toFixed(1)}%
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-right">
                    <span className={row.debt <= 0.5 ? 'text-green-600 font-semibold' : 'text-yellow-600 font-semibold'}>
                      {row.debt.toFixed(2)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-sm text-gray-600">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedData.length)} of{' '}
            {sortedData.length} entries
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 text-sm font-semibold bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
              aria-label="Previous page"
            >
              <ChevronLeft size={16} aria-hidden="true" />
              Previous
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1.5 text-sm font-semibold rounded-lg transition-colors ${
                    currentPage === page
                      ? 'bg-teal text-white'
                      : 'bg-white border border-gray-300 hover:bg-gray-50'
                  }`}
                  aria-label={`Page ${page}`}
                  aria-current={currentPage === page ? 'page' : undefined}
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 text-sm font-semibold bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
              aria-label="Next page"
            >
              Next
              <ChevronRight size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
