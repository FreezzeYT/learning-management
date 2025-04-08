import React, { useState } from "react";
import { IoEnterOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Fetchprofile from "../components/Fetchprofile";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5803/auth/login", {
        username,
        password,
      });

      localStorage.setItem("token", response.data.access_token);
      const usrData = await Fetchprofile();
      console.log(usrData);
      console.log("#############################");
      setError("");

      if (
        usrData.role === "Admin" ||
        usrData.role === "Student" ||
        usrData.role === "Instructor"
      ) {
        navigate("/pages");
      } else {
        navigate("/notfound");
      }
    } catch (error) {
      setError("Invalid Credentials!");
    }
  };

  return (
    <div className="bg-slate-50 w-screen h-screen flex justify-center items-center">
      <div className="border border-black p-10 rounded-lg shadow-lg text-center bg-white flex flex-col md:flex-row items-center gap-6 md:w-[670px]">
        {/* Vector Illustration */}
        <img
          src="public\login.png"
          alt="Login Illustration"
          className="hidden md:block w-1/2"
        />

        {/* Login Form */}
        <div className="w-full md:w-1/2">
          <h3 className="text-3xl font-poppins font-bold pb-5">Login</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-gray-50 border border-gray-600 text-gray-950 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-4"
              placeholder="Enter Username"
              required
            />
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-50 border border-gray-600 text-gray-950 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-4"
              placeholder="Enter Password"
              required
            />
            {error && <p className="text-red-500 mb-3">{error}</p>}
            <button
              type="submit"
              id="login"
              className="text-white bg-blue-700 hover:bg-blue-800 text-center focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 flex items-center justify-center gap-2"
            >
              <IoEnterOutline className="w-6 h-6" />
              Login
            </button>
          </form>

          {/* Register Redirect */}
          <p className="mt-5 text-gray-600">
            Don't have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => navigate("/register")}
            >
              Register here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
