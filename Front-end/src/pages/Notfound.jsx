import React from "react";
import { useNavigate } from "react-router-dom";

const Notfound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-green-100-700">404</h1>
        <p className="text-xl mt-4 text-gray-700">
          Sorry, The page you're looking for doesn't exist.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Go Back
        </button>
        <button
          onClick={() => navigate("/")}
          className="mt-6 px-6 py-2 ml-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Login Page
        </button>
      </div>
    </div>
  );
};

export default Notfound;
