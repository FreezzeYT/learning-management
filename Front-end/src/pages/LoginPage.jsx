import React, { useState } from 'react';
import { IoEnterOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const fetchProfile = async () => {
    try {
    
      const token = localStorage.getItem("token");
  
      if (!token) {
        console.error("No token found. Please log in.");
        return;
      }
  
    
      const response = await axios.get("http://localhost:5803/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
  
      console.log("Profile Data:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching profile:", error.response?.data || error.message);
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5803/auth/login", {
        username,
        password
      });
      console.log(response.data.token)
      localStorage.setItem("token", response.data.access_token);
      const usrData = await fetchProfile();
      setError("")
      console.log(usrData.role)
      if(usrData.role === "Admin"){
        navigate("/pages")
      }
      else{
        navigate("/notfound")
      }
    } catch (error) {
      setError("Invalid Credentials!");
    }
  };

  return (
    <div className="bg-slate-50 w-screen h-screen flex justify-center items-center">
      <div className="border border-black p-10 rounded-lg shadow-lg text-center bg-slate-50">
        <h3 className="text-5xl font-poppins font-bold pb-10">Login Page</h3>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            id="username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            className="bg-gray-50 border border-gray-600 text-gray-950 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-5" 
            placeholder="Enter Username" 
            required 
          />
          <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="bg-gray-50 border border-gray-600 text-gray-950 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-5" 
            placeholder="Enter Password" 
            required 
          />
          {error && <p className="text-red-500 mb-3">{error}</p>}
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 text-center focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 flex items-center justify-center gap-2">
            <IoEnterOutline className="w-6 h-6" />Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
