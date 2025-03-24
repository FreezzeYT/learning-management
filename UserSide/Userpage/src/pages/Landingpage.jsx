import React from "react";
import Navbar from "../components/Navbar";
import Home from "../components/Home";
import Courses from "../components/Courses";
import About from "../components/About";
import Footer from "../components/Footer";

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <Home />
      <Courses />
      <About />
      <Footer />
    </div>
  );
};

export default LandingPage;
