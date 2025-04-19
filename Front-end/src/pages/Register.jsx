import React, { useState } from "react";
import axios from "axios";
import { IoEnterOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Student", // default role
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        "http://localhost:5803/auth/register",
        formData
      );
      setSuccess("Registration successful!");
      setFormData({ name: "", email: "", password: "", role: "Student" });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      console.error("Error:", err);
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="bg-slate-50 w-screen h-screen flex justify-center items-center">
      <div className="border border-black p-10 rounded-lg shadow-lg text-center bg-white flex flex-col md:flex-row items-center gap-6 md:w-[670px]">
        {/* Image on the Side */}
        <img
          src="public/register.jpg"
          alt="Register Illustration"
          className="w-1/2 hidden md:block"
        />

        {/* Form Section */}
        <div className="w-full md:w-1/2">
          <h3 className="text-5xl font-poppins font-bold pb-6">Register</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-600 text-gray-950 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter Full Name"
              required
            />
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-600 text-gray-950 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter Email"
              required
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-600 text-gray-950 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter Password"
              required
            />
            {/* Role Selection Dropdown */}
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-600 text-gray-950 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option value="Student">Student</option>
              <option value="Instructor">Instructor</option>
              <option value="Admin">Admin</option>
            </select>

            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}

            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full px-5 py-2.5 flex items-center justify-center gap-2"
            >
              <IoEnterOutline className="w-6 h-6" /> Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
