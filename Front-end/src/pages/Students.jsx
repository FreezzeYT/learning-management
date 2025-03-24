import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "../components/Table";

const Students = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
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
  }, []);

  return (
    <div className="container mx-auto mt-10">
      <h3 className="text-4xl text-center font-poppins">Students</h3>
      <hr className="mb-4" />

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
    </div>
  );
};

export default Students;
