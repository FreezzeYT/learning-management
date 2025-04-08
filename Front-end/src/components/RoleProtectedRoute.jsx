// src/routes/RoleProtectedRoute.jsx
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const RoleProtectedRoute = ({ children, role }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const fetchUserRole = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsAuthorized(false);
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get("http://localhost:5803/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userRole = res.data.role;

        if (!role) {
          // if no role is given as the prop then all users can access this route
          setIsAuthorized(true);
        } else if (role === "admin") {
          setIsAuthorized(userRole === "Admin");
        } else if (role === "teacher") {
          setIsAuthorized(userRole === "Teacher" || userRole === "Admin");
        } else if (role === "student") {
          setIsAuthorized(userRole === "Student" || userRole === "Admin");
        } else {
          setIsAuthorized(false); // other role prop has passed
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        setIsAuthorized(false);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, [role]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return isAuthorized ? children : <Navigate to="/notfound" replace />;
};

export default RoleProtectedRoute;
