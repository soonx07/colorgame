// Pagination.js
import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        className={`px-4 py-2 bg-gray-600 text-sm text-white rounded-l-lg ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-500"}`}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span className="px-4 py-2 bg-gray-600 text-sm text-white">{currentPage} of {totalPages}</span>
      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        className={`px-4 py-2 bg-gray-600 text-sm text-white rounded-r-lg ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-500"}`}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
