import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "../components/Table";
import EditCourseModal from "./EditeCourseModal";
import { FiEdit, FiTrash2 } from "react-icons/fi"; // ✅ Imported icons

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [editCourse, setEditCourse] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5803/course")
      .then((res) => setCourses(res.data))
      .catch((err) => console.error("Error fetching courses: ", err));
  }, []);

  const handleDelete = (courseId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?"
    );

    if (!confirmDelete) return;

    axios
      .delete(`http://localhost:5803/course/${courseId}`)
      .then(() => {
        setCourses((prevCourses) =>
          prevCourses.filter((course) => course._id !== courseId)
        );
      })
      .catch((err) => console.error("Error deleting course: ", err));
  };

  const handleEdit = (course) => {
    setEditCourse(course);
  };

  const handleUpdateCourse = (updatedCourse) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course._id === updatedCourse._id ? updatedCourse : course
      )
    );
  };

  return (
    <div className="container mx-auto mt-10">
      <h3 className="text-4xl text-center font-poppins">Courses</h3>
      <hr className="mb-4" />

      {courses.length === 0 ? (
        <p className="text-gray-600 mt-2 font-bold text-center">
          No Courses Found!
        </p>
      ) : (
        <Table
          heading={["S.No", "Course Name", "Description", "Tutor", "Actions"]}
          data={courses.map((course, index) => ({
            sno: index + 1,
            courseName: course.courseName,
            description: course.courseDescription,
            tutor: course.tutorName,
            actions: (
              <div className="flex gap-3">
                <button
                  className="text-blue-600 hover:text-blue-800"
                  onClick={() => handleEdit(course)}
                >
                  <FiEdit size={18} />
                </button>
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => handleDelete(course._id)}
                >
                  <FiTrash2 size={18} />
                </button>
              </div>
            ),
          }))}
        />
      )}

      {editCourse && (
        <EditCourseModal
          course={editCourse}
          onClose={() => setEditCourse(null)}
          onUpdate={handleUpdateCourse}
        />
      )}
    </div>
  );
};

export default Courses;
