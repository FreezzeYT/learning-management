import React from "react";

const Table = ({ heading, data }) => {
  return (
    <div className="overflow-x-auto flex justify-center">
      <table className="w-full max-w-4xl border border-gray-300 shadow-md rounded-lg mx-auto">
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
          {data.map((row, rowIndex) => (
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
    </div>
  );
};

export default Table;
