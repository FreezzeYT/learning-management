import React, { useEffect, useState } from "react";
import axios from "axios";
import { BsBookmarkDashFill } from "react-icons/bs";

const LandingPage = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5803/course")
      .then((res) => setCourses(res.data))
      .catch((err) => console.error("Error fetching courses: ", err));
  }, []);

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="fixed w-full bg-blue-600 text-white p-4 flex justify-between items-center shadow-md z-50">
        <h2 className="text-2xl font-bold">Exceed</h2>
        <div className="space-x-6">
          <a href="#home" className="hover:underline">
            Home
          </a>
          <a href="#courses" className="hover:underline">
            Courses
          </a>
          <a href="#about" className="hover:underline">
            About
          </a>
        </div>
        <button
          className="bg-white text-blue-600 px-4 py-2 rounded-md"
          onClick={() => alert("Redirect to Login")}
        >
          Login
        </button>
      </nav>

      <section
        id="home"
        className="h-screen flex items-center justify-center bg-gray-100 text-center"
      >
        <h1 className="text-5xl font-bold">Welcome to Exceed</h1>
        <p>A New way to learn excisting courses !</p>
      </section>

      <section id="courses" className="min-h-screen bg-white py-10">
        <h2 className="text-4xl text-center font-semibold mb-6">
          Available Courses
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          {courses.length === 0 ? (
            <p className="text-gray-600 text-center">No Courses Found!</p>
          ) : (
            courses.map((course) => (
              <div
                key={course._id}
                className="w-64 p-6 bg-white shadow-md rounded-lg text-center hover:bg-gray-100"
              >
                <h3 className="text-xl font-semibold">
                  <BsBookmarkDashFill className="text-center m-auto" />
                  <span className="mt-1 inline-block">{course.courseName}</span>
                </h3>
                <p className="text-gray-600 mt-2 font-bold">
                  {course.courseDescription}
                </p>
              </div>
            ))
          )}
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="h-screen bg-gray-200 flex items-center justify-center text-center"
      >
        <div>
          <h2 className="text-4xl font-semibold mb-4">About Us</h2>
          <p className="text-lg max-w-2xl">
            We are committed to providing high-quality courses to help students
            learn and grow.
          </p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
