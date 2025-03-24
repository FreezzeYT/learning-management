import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "../components/Table";
import EditCourseModal from "./EditeCourseModal";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [editCourse, setEditCourse] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5803/course")
      .then((res) => setCourses(res.data))
      .catch((err) => console.error("Error fetching courses: ", err));
  }, []);

  //to delete from the db
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

  // datta gotten from the model is set to the state variable
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
              <div className="flex gap-2">
                <button
                  className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-700"
                  onClick={() => handleEdit(course)}
                >
                  Edit
                </button>
                <button
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700"
                  onClick={() => handleDelete(course._id)}
                >
                  Delete
                </button>
              </div>
            ),
          }))}
        />
      )}

      {/* Edit Modal */}
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
