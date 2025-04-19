import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VerifyOtp = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5803/auth/verify-otp", {
        email,
        otp,
      });
      console.log(res.data);
      const tempToken = res.data.tempToken;
      localStorage.setItem("tempToken", tempToken);
      setMessage("OTP Verified! Proceeding to reset password...");
      setError("");

      setTimeout(() => {
        navigate("/reset-password");
      }, 1000);
    } catch (err) {
      setMessage("");
      setError(
        err.response?.data?.message || "Failed to verify OTP. Please try again."
      );
    }
  };

  return (
    <div className="bg-slate-50 w-screen h-screen flex justify-center items-center">
      <div className="border border-black p-10 rounded-lg shadow-lg text-center bg-white w-full max-w-md">
        <h3 className="text-3xl font-poppins font-bold pb-5">Verify OTP</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-50 border border-gray-600 text-gray-950 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-4"
            placeholder="Enter Email"
            required
          />
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="bg-gray-50 border border-gray-600 text-gray-950 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-4"
            placeholder="Enter 6-digit OTP"
            required
          />
          {error && <p className="text-red-500 mb-3">{error}</p>}
          {message && <p className="text-green-600 mb-3">{message}</p>}
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 text-center focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
