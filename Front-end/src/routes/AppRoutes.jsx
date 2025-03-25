import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Notfound from "../pages/Notfound";
import Layout from "../pages/Layout";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import LoginPage from "../pages/LoginPage";
// import Table from './components/Table'
import Students from "../pages/Students";
import Teachers from "../pages/Teachers";
import Courses from "../pages/Courses";
import Createcourse from "../pages/Createcourse";
import Register from "../pages/Register";
import LandingPage from "../pages/Landingpage";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/pages" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="courses">
            <Route path="list" element={<Courses />} />
            <Route path="create" element={<Createcourse />} />
          </Route>
          <Route path="teachers" element={<Teachers />} />
          <Route path="students" element={<Students />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/*" element={<Notfound />} />
        {/* <Route path='/table' element={<Table/>}/> */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
