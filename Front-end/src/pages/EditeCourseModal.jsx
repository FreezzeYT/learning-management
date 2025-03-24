import React, { useState } from "react";
import axios from "axios";

const EditCourseModal = ({ course, onClose, onUpdate }) => {
  const [updatedCourse, setUpdatedCourse] = useState({ ...course });

  const handleChange = (e) => {
    setUpdatedCourse({ ...updatedCourse, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5803/course/${updatedCourse._id}`,
        updatedCourse
      );
      onUpdate(res.data); // give this back to the courses.jsx
      onClose(); // close the edit dialog
    } catch (err) {
      console.error("Error updating course: ", err);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Edit Course</h2>

        <label className="block mb-2 font-semibold">Course Name</label>
        <input
          type="text"
          name="courseName"
          value={updatedCourse.courseName}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded mb-3"
        />

        <label className="block mb-2 font-semibold">Description</label>
        <input
          type="text"
          name="courseDescription"
          value={updatedCourse.courseDescription}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded mb-3"
        />

        <label className="block mb-2 font-semibold">Tutor Name</label>
        <input
          type="text"
          name="tutorName"
          value={updatedCourse.tutorName}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded mb-4"
        />

        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-600"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
            onClick={handleSubmit}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCourseModal;
