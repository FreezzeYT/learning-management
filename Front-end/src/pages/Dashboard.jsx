import React from "react";
import { MdCleaningServices } from "react-icons/md";
import { FaChalkboardTeacher } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";
import { IoBookOutline } from "react-icons/io5";
import GraphComponent from "../components/GraphsComponent";

const Dashboard = () => {
  return (
    <>
      <h3 className="text-4xl text-center font-poppins">Dashboard</h3>
      <div className="flex flex-wrap justify-center gap-6">
        <div className="w-64 p-6 bg-white shadow-md rounded-lg text-center">
          <h3 className="text-xl font-semibold">
            {" "}
            <PiStudentFill className="text-center m-auto" /> Students
          </h3>
          <p className="text-gray-600 mt-2">Total: 1500</p>
        </div>

        <div className="w-64 p-6 bg-white shadow-md rounded-lg text-center">
          <h3 className="text-xl font-semibold">
            {" "}
            <FaChalkboardTeacher className="text-center m-auto" /> Instructors
          </h3>
          <p className="text-gray-600 mt-2"> Total: 85</p>
        </div>

        <div className="w-64 p-6 bg-white shadow-md rounded-lg text-center">
          <h3 className="text-xl font-semibold">
            {" "}
            <IoBookOutline className="text-center m-auto" /> Courses
          </h3>
          <p className="text-gray-600 mt-2">Available: 20</p>
        </div>
      </div>
      <GraphComponent />
    </>
  );
};

export default Dashboard;
