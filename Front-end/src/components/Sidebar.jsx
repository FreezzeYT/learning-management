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
import { PiStudentFill } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { TbWritingSign } from "react-icons/tb";
import { CiCircleList } from "react-icons/ci";
import FetchProfile from "./Fetchprofile";

const Sidebar = () => {
  const [profVisible, setProfVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeMenus, setActiveMenus] = useState({}); // Track submenus
  const [Usrdata, setUsrdata] = useState({
    name: "",
    role: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const profileRef = useRef(null);
  const buttonRef = useRef(null);

  // Handle click outside profile dropdown
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

  // Fetch user role
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await FetchProfile();
        if (data?.role) {
          console.log(data);
          setUsrdata({ name: data.name, role: data.role });
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };

    fetchData();
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Sidebar menu items based on role
  const menuItems = {
    Admin: [
      {
        name: "Dashboard",
        icon: <MdOutlineDashboard />,
        path: "/pages/dashboard",
      },
      {
        name: "Courses",
        icon: <SiCoursera />,
        subMenu: [
          {
            name: "List Courses",
            path: "/pages/courses/list",
            icon: <CiCircleList />,
          },
          {
            name: "Create Course",
            path: "/pages/courses/create",
            icon: <TbWritingSign />,
          },
        ],
      },
      { name: "Students", icon: <PiStudentFill />, path: "/pages/students" },
      {
        name: "Teachers",
        icon: <FaChalkboardTeacher />,
        path: "/pages/teachers",
      },
    ],
    Instructor: [
      // {
      //   name: "Dashboard",
      //   icon: <MdOutlineDashboard />,
      //   path: "/pages/dashboard",
      // },
      // {
      //   name: "Courses",
      //   icon: <SiCoursera />,
      //   subMenu: [
      //     {
      //       name: "List Courses",
      //       path: "/pages/courses/list",
      //       icon: <CiCircleList />,
      //     },
      //   ],
      // },
      { name: "Students", icon: <PiStudentFill />, path: "/pages/students" },
      {
        name: "Teachers",
        icon: <FaChalkboardTeacher />,
        path: "/pages/teachers",
      },
    ],
    Student: [
      {
        name: "Dashboard",
        icon: <MdOutlineDashboard />,
        path: "/pages/dashboard",
      },
      { name: "Courses", icon: <SiCoursera />, path: "/pages/courses/list" },
    ],
  };

  // Toggle submenu state
  const toggleSubMenu = (menuName) => {
    setActiveMenus((prev) => ({
      ...prev,
      [menuName]: !prev[menuName],
    }));
  };

  return (
    <>
      {/* Profile button */}
      <div
        ref={buttonRef}
        className="w-auto fixed rounded z-10 top-0 right-4 border border-black border-t-0 p-1 bg-gray-100 rounded-b-lg cursor-pointer hover:bg-gray-300 flex flex-nowrap"
        onClick={() => setProfVisible((prev) => !prev)}
      >
        <CgProfile className="w-8 h-8 mt-1 text-center m-auto" />
        <p className="text-center m-auto pl-1">{Usrdata.name}</p>
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
        className={`top-0 bg-gray-100 text-gray-800 min-h-lvh ${
          open ? "min-w-64 max-w-64" : "min-w-20 max-w-20"
        } shadow-sm shadow-black relative duration-300`}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <Link to="/pages/dashboard">
          <h3 className="flex items-center gap-2 text-4xl font-bold cursor-pointer hover:text-gray-300 pt-8 ml-3">
            <FaSquareLetterboxd className="ml-3 text-4xl" />
            {open ? "Exceed" : ""}
          </h3>
        </Link>

        <ul className="text-center mt-16">
          {menuItems[Usrdata.role]?.map((item, index) => (
            <React.Fragment key={index}>
              {item.subMenu ? (
                <>
                  <li
                    className="p-5 text-xl cursor-pointer m-2 hover:bg-blue-700 font-thin hover:rounded-lg hover:text-white text-lg flex items-center gap-2 justify-between"
                    onClick={() => toggleSubMenu(item.name)}
                  >
                    <div className="flex items-center gap-2">
                      {item.icon} {open ? item.name : ""}
                    </div>
                    {open &&
                      (activeMenus[item.name] ? (
                        <FaChevronDown />
                      ) : (
                        <FaChevronRight />
                      ))}
                  </li>
                  {activeMenus[item.name] && open && (
                    <ul className="ml-10">
                      {item.subMenu.map((subItem, subIndex) => (
                        <Link key={subIndex} to={subItem.path}>
                          <li className="p-3 text-lg cursor-pointer m-1 hover:bg-blue-500 hover:rounded-lg hover:text-white flex items-center gap-2">
                            {subItem.icon} {subItem.name}
                          </li>
                        </Link>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link to={item.path}>
                  <li className="p-5 text-xl cursor-pointer m-2 hover:bg-blue-700 font-thin hover:rounded-lg hover:text-white text-lg flex items-center gap-2">
                    {item.icon} {open ? item.name : ""}
                  </li>
                </Link>
              )}
            </React.Fragment>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
