import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await axios.post(
        "http://localhost:5803/auth/forgot-password",
        {
          email,
        }
      );

      setMessage(res.data.message);
      setEmail("");

      setTimeout(() => {
        navigate("/verify-otp"); // redirect to OTP page (optional)
      }, 2000);
    } catch (err) {
      console.log(err);
      setError(
        err.response?.data?.message || "Failed to send OTP. Try again later."
      );
    }
  };

  return (
    <div className="bg-slate-50 w-screen h-screen flex justify-center items-center">
      <div className="border border-black p-10 rounded-lg shadow-lg text-center bg-white w-[90%] md:w-[400px]">
        <h3 className="text-2xl font-bold pb-5 font-poppins">
          Forgot Password
        </h3>
        <form onSubmit={handleSendOtp}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-50 border border-gray-600 text-gray-950 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-4"
            placeholder="Enter your email"
            required
          />

          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          {message && <p className="text-green-600 text-sm mb-2">{message}</p>}

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 text-center focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5"
          >
            Send OTP
          </button>
        </form>

        <p className="mt-5 text-gray-600">
          Remember your password?{" "}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => navigate("/")}
          >
            Go back to login
          </span>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
