import React from "react";
import { FaSquareLetterboxd } from "react-icons/fa6";

const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <FaSquareLetterboxd className="text-3xl text-gray-400 animate-spin-slow" />
    </div>
  );
};

export default Loader;
