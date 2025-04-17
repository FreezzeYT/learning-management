import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Notfound from "../pages/Notfound";
import Layout from "../pages/Layout";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import LoginPage from "../pages/LoginPage";
import Students from "../pages/Students";
import Teachers from "../pages/Teachers";
import Courses from "../pages/Courses";
import Createcourse from "../pages/Createcourse";
import Register from "../pages/Register";
import LandingPage from "../pages/Landingpage";
import ProtectedRoutes from "./ProtectedRoutes";
import RoleProtectedRoute from "../components/RoleProtectedRoute";
import Department from "../pages/Department";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={<LoginPage key={window.location.pathname} />}
        />

        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<LandingPage />} />

        {/* ✅ Protected Routes */}
        <Route
          path="/pages"
          element={
            <ProtectedRoutes>
              <Layout />
            </ProtectedRoutes>
          }
        >
          <Route index element={<Home />} />
          <Route path="courses">
            <Route path="list" element={<Courses />} />
            <Route path="create" element={<Createcourse />} />
          </Route>
          <Route
            path="teachers"
            element={
              <RoleProtectedRoute role="teacher">
                <Teachers />
              </RoleProtectedRoute>
            }
          />
          <Route path="students" element={<Students />} />
          <Route
            path="dashboard"
            element={
              <RoleProtectedRoute role="admin">
                <Dashboard />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="department"
            element={
              <RoleProtectedRoute role="admin">
                <Department />
              </RoleProtectedRoute>
            }
          />
        </Route>

        {/* Fallback */}
        <Route path="/*" element={<Notfound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
