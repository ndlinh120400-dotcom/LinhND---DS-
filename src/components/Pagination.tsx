import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between mt-4 text-xs text-gray-700 font-medium space-y-2 sm:space-y-0">
      {/* Items count indicator */}
      <div>
        Hiển thị <span className="font-bold">{startItem}-{endItem}</span> trong tổng số{' '}
        <span className="font-bold">{totalItems}</span>
      </div>

      {/* Page Navigation Buttons */}
      <div className="inline-flex rounded-md shadow-2xs divide-x divide-gray-200 border border-gray-300 overflow-hidden bg-white">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1.5 hover:bg-gray-50 text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
        >
          Trước
        </button>

        {pages.map((page) => {
          const isActive = page === currentPage;
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-3 py-1.5 cursor-pointer font-bold transition-colors ${
                isActive
                  ? 'bg-[#0284C7] text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          );
        })}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
          className="px-3 py-1.5 hover:bg-gray-50 text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
        >
          Sau
        </button>
      </div>
    </div>
  );
};
