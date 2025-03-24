import React, { useEffect, useRef, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { SiCoursera } from "react-icons/si";
import {
  FaSquareLetterboxd,
  FaChevronDown,
  FaChevronRight,
} from "react-icons/fa6";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { TbWritingSign } from "react-icons/tb";
import { CiCircleList } from "react-icons/ci";

const Sidebar = () => {
  const [profVisible, setProfVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [courseMenuOpen, setCourseMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const profileRef = useRef(null);
  const buttonRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      profileRef.current &&
      !profileRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      setProfVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* Profile button */}
      <div
        ref={buttonRef}
        className="w-12 fixed z-10 top-0 right-4 border border-black border-t-0 p-1 bg-gray-100 rounded-b-lg cursor-pointer hover:bg-gray-300"
        onClick={() => setProfVisible((prev) => !prev)}
      >
        <CgProfile className="w-8 h-8 mt-1 text-center m-auto" />
      </div>

      {/* Profile menu */}
      <ul
        ref={profileRef}
        className={`${
          profVisible ? "flex" : "hidden"
        } flex-col z-10 text-center overflow-hidden rounded-lg bg-gray-100 w-32 ml-4 absolute top-[50px] right-2`}
      >
        <li className="cursor-pointer flex justify-center items-center h-[40px] hover:bg-blue-300 hover:rounded-lg p-2">
          View Profile
        </li>
        <li
          className="cursor-pointer flex justify-center items-center h-[40px] hover:bg-orange-500 hover:rounded-lg p-2"
          onClick={() => {
            localStorage.clear();
            sessionStorage.clear();
            navigate("/", { replace: true });
          }}
        >
          Logout
        </li>
      </ul>

      {/* Sidebar */}
      <div
        className={` top-0 bg-gray-100 text-gray-800 min-h-lvh ${
          open ? "min-w-64 max-w-64" : "min-w-20 max-w-20"
        } shadow-sm shadow-black relative duration-300`}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <Link to="/pages/dashboard">
          <h3 className="flex items-center gap-2 text-4xl font-poppins font-bold cursor-pointer hover:text-gray-300 pt-8 ml-3">
            <FaSquareLetterboxd className=" ml-3 text-4xl" />
            {open ? "Exceed" : ""}
          </h3>
        </Link>
        {/* <FaRegArrowAltCircleLeft 
          className={`text-white text-3xl rounded-full absolute -right-3 bg-black cursor-pointer shadow-black border border-black ${!open && "rotate-180"} duration-300`} 
           
        /> */}

        <ul className="text-center mt-16">
          {/* Dashboard */}

          <Link title="Dashboard" to="/pages/dashboard">
            <li
              className={`p-5 text-xl cursor-pointer m-2 hover:bg-blue-700 font-thin text-lg hover:rounded-lg hover:text-white flex items-center gap-2 ${
                location.pathname === "/pages/dashboard"
                  ? "bg-blue-500 text-white rounded-lg"
                  : "bg-transparent"
              }`}
            >
              <MdOutlineDashboard className="w-6 h-6 mt-1" />
              {open ? "Dashboard" : ""}
            </li>
          </Link>

          {/* Courses - Main */}
          <li
            className={`p-5 text-xl cursor-pointer m-2 hover:bg-blue-700 font-thin hover:rounded-lg hover:text-white text-lg flex items-center gap-2 justify-between ${
              location.pathname.includes("/pages/courses")
                ? "bg-blue-500 text-white rounded-lg"
                : "bg-transparent"
            }`}
            onClick={() => setCourseMenuOpen(!courseMenuOpen)}
          >
            <div className="flex items-center gap-2">
              <SiCoursera className="w-6 h-6 mt-1" />
              {open ? "Courses" : ""}
            </div>
            {open && (courseMenuOpen ? <FaChevronDown /> : <FaChevronRight />)}
          </li>

          {/* Courses - Submenu */}
          {courseMenuOpen && open && (
            <ul className="ml-10">
              <Link title="List Courses" to="/pages/courses/list">
                <li
                  className={`p-3 text-lg cursor-pointer m-1 hover:bg-blue-500 hover:rounded-lg hover:text-white flex items-center gap-2 ${
                    location.pathname === "/pages/courses/list"
                      ? "bg-blue-400 text-white rounded-lg"
                      : "bg-transparent"
                  }`}
                >
                  <CiCircleList className="w-6 h-6 mt-1" /> List Courses
                </li>
              </Link>
              <Link title="Create Course" to="/pages/courses/create">
                <li
                  className={`p-3 text-lg cursor-pointer m-1 hover:bg-blue-500 hover:rounded-lg hover:text-white flex items-center gap-2 ${
                    location.pathname === "/pages/courses/create"
                      ? "bg-blue-400 text-white rounded-lg"
                      : "bg-transparent"
                  }`}
                >
                  <TbWritingSign className="w-6 h-6 mt-1" />
                  Create Course
                </li>
              </Link>
            </ul>
          )}

          {/* Students */}
          <Link title="Students" to="/pages/students">
            <li
              className={`p-5 text-xl cursor-pointer m-2 hover:bg-blue-700 font-thin text-lg hover:rounded-lg hover:text-white flex items-center gap-2 ${
                location.pathname === "/pages/students"
                  ? "bg-blue-500 text-white rounded-lg"
                  : "bg-transparent"
              }`}
            >
              <PiStudentFill className="w-6 h-6 mt-1" />
              {open ? "Students" : ""}
            </li>
          </Link>

          {/* Teachers */}
          <Link title="Teachers" to="/pages/teachers">
            <li
              className={`p-5 text-xl cursor-pointer m-2 hover:bg-blue-700 font-thin text-lg hover:rounded-lg hover:text-white flex items-center gap-2 ${
                location.pathname === "/pages/teachers"
                  ? "bg-blue-500 text-white rounded-lg"
                  : "bg-transparent"
              }`}
            >
              <FaChalkboardTeacher className="w-6 h-6 mt-1" />
              {open ? "Teachers" : ""}
            </li>
          </Link>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
