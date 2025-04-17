import React, { useState } from "react";

const Table = ({ heading, data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = data.slice(startIndex, startIndex + rowsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleRowsChange = (e) => {
    setRowsPerPage(parseInt(e.target.value));
    setCurrentPage(1); // Reset to first page on change
  };

  const generatePagination = () => {
    const pages = [];

    if (totalPages <= 3) {
      // For fewer than 3 pages, show all page numbers
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show the first page
      pages.push(1);

      // Show current page if it's not too far from the start or end
      if (currentPage >= 2) {
        pages.push(currentPage);
      }

      // Add "..." after current page if there are more pages
      if (currentPage < totalPages - 1) {
        pages.push("...");
      }

      // Always show the last page
      if (!pages.includes(totalPages)) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="overflow-x-auto flex flex-col items-center animate-fade-in w-full">
      <div className="w-full max-w-4xl mb-2 flex justify-between items-center px-2">
        <label className="text-sm text-gray-700">
          Show
          <select
            value={rowsPerPage}
            onChange={handleRowsChange}
            className="mx-2 border border-gray-300 rounded px-2 py-1 text-sm"
          >
            <option value={2}>2</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
          </select>
          entries
        </label>
      </div>

      <table className="w-full max-w-4xl border border-gray-300 shadow-md rounded-lg mb-4">
        <thead>
          <tr className="bg-gray-500 text-white">
            {heading.map((title, index) => (
              <th key={index} className="px-4 py-2 text-left">
                {title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentData.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`${
                rowIndex % 2 === 0 ? "bg-gray-100" : "bg-white"
              } border-b`}
            >
              {Object.values(row).map((cell, cellIndex) => (
                <td key={cellIndex} className="px-4 py-2">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls - Left aligned */}
      <div className="w-full max-w-4xl mb-4 flex justify-end px-2">
        <div className="flex gap-2 items-center">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 border rounded text-sm ${
              currentPage === 1
                ? "text-gray-400 border-gray-300 bg-gray-100 cursor-not-allowed"
                : "text-gray-700 border-gray-400 hover:bg-gray-200"
            }`}
          >
            Prev
          </button>

          {generatePagination().map((page, idx) =>
            page === "..." ? (
              <span key={idx} className="px-2 text-gray-500 text-sm">
                ...
              </span>
            ) : (
              <button
                key={idx}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 border rounded text-sm ${
                  currentPage === page
                    ? "bg-gray-700 text-white"
                    : "bg-white text-gray-700 border-gray-400 hover:bg-gray-200"
                }`}
              >
                {page}
              </button>
            )
          )}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 border rounded text-sm ${
              currentPage === totalPages
                ? "text-gray-400 border-gray-300 bg-gray-100 cursor-not-allowed"
                : "text-gray-700 border-gray-400 hover:bg-gray-200"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;
