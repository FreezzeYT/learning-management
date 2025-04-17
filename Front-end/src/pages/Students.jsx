import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "../components/Table";
import ModalForm from "../components/ModalForm";
import Loader from "../components/Loader";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loaderTimer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    axios
      .get("http://localhost:5803/user")
      .then((res) => {
        // Filtering users with role "Student"
        const filteredStudents = res.data.filter(
          (user) => user.role === "Student"
        );
        setStudents(filteredStudents);
      })
      .catch((err) => console.error("Error fetching students: ", err));
    return () => clearTimeout(loaderTimer);
  }, []);

  if (loading) return <Loader />;
  return (
    <div className="container mx-auto mt-10">
      <h3 className="text-4xl text-center font-poppins">Students</h3>
      <hr className="mb-4" />
      {/* Horizontal Line */}
      <div className="flex items-center justify-end border p-2">
        {/* <span class="mr-2">To Enroll new student:</span> */}
        <button
          className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
          onClick={() => setShowModal(true)}
        >
          Enroll
        </button>
      </div>

      {students.length === 0 ? (
        <p className="text-gray-600 mt-2 font-bold text-center">
          No Students Found!
        </p>
      ) : (
        <Table
          heading={["S.No", "Name", "Username", "Enrolled Courses"]}
          data={students.map((student, index) => ({
            sno: index + 1,
            name: student.name,
            username: student.username,
            enrolledCourses: student.enrolledCourses?.join(", ") || "None",
          }))}
        />
      )}
      <ModalForm isOpen={showModal} />
    </div>
  );
};

export default Students;
