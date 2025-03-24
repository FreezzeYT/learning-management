import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between">
      <h1 className="text-2xl font-bold">Exceed Learning</h1>
      <div>
        <a href="#home" className="px-4">Home</a>
        <a href="#courses" className="px-4">Courses</a>
        <a href="#about" className="px-4">About Us</a>
      </div>
    </nav>
  );
};

export default Navbar;
