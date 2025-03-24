import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "../components/Table";

const Instructors = () => {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5803/user")
      .then((res) => {
        // Filtering users with role "Instructor"
        const filteredInstructors = res.data.filter(
          (user) => user.role === "Instructor"
        );
        setInstructors(filteredInstructors);
      })
      .catch((err) => console.error("Error fetching instructors: ", err));
  }, []);

  return (
    <div className="container mx-auto mt-10">
      <h3 className="text-4xl text-center font-poppins">Instructors</h3>
      <hr className="mb-4" />

      {instructors.length === 0 ? (
        <p className="text-gray-600 mt-2 font-bold text-center">
          No Instructors Found!
        </p>
      ) : (
        <Table
          heading={["S.No", "Name", "Username", "Courses Taught"]}
          data={instructors.map((instructor, index) => ({
            sno: index + 1,
            name: instructor.name,
            username: instructor.username,
            coursesTaught: instructor.coursesTaught?.join(", ") || "None",
          }))}
        />
      )}
    </div>
  );
};

export default Instructors;
