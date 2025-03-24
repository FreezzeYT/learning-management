import React, { useState } from "react";
import axios from "axios";

const Createcourse = () => {
  const [formData, setFormData] = useState({
    courseName: "",
    courseDescription: "",
    tutorName: "",
  });

  const [successMessage, setSuccessMessage] = useState(""); // ✅ Success message state
  const [errorMessage, setErrorMessage] = useState(""); // ✅ Error message state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage(""); // Clear success message
    setErrorMessage(""); // Clear error message

    try {
      const response = await axios.post("http://localhost:5803/course", formData);

      if (response.status === 200 || response.status === 201) { // ✅ API successful
        setSuccessMessage("Course created successfully! 🎉");
        setFormData({ courseName: "", courseDescription: "", tutorName: "" }); // Clear form
      }
    } catch (error) {
      console.error("Error creating course:", error);
      setErrorMessage("Failed to create course. Please try again."); // ✅ Set error message
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create a New Course
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Course Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Course Name</label>
            <input
              type="text"
              name="courseName"
              value={formData.courseName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter course name"
            />
          </div>

          {/* Course Description */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Course Description</label>
            <textarea
              name="courseDescription"
              value={formData.courseDescription}
              onChange={handleChange}
              required
              rows="4"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter course description"
            ></textarea>
          </div>

          {/* Teacher Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Teacher Name</label>
            <input
              type="text"
              name="tutorName"
              value={formData.tutorName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter teacher's name"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Create Course
          </button>

          {successMessage && (
            <p className="text-green-600 text-center text-sm mt-2">{successMessage}</p>
          )}

          {errorMessage && (
            <p className="text-red-600 text-center text-sm mt-2">{errorMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Createcourse;
