import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";

const GraphComponent = () => {
  const studentCourseData = [
    { category: "Students", count: 1200 },
    { category: "Courses", count: 25 },
  ];

  const performanceData = [
    { month: "Jan", avgScore: 72 },
    { month: "Feb", avgScore: 75 },
    { month: "Mar", avgScore: 78 },
    { month: "Apr", avgScore: 80 },
    { month: "May", avgScore: 85 },
    { month: "Jun", avgScore: 83 },
  ];

  return (
    <div className="container mx-auto mt-10">
      <h3 className="text-3xl font-semibold text-center mb-6">
        Dashboard Overview
      </h3>

      <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
        {/* Bar Chart for Students and Courses */}
        <div className="bg-white shadow-md p-4 rounded-lg w-full md:w-1/2">
          <h4 className="text-xl font-semibold text-center mb-2">
            Students & Courses Count
          </h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={studentCourseData}>
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#3182CE" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart for Performance Trends */}
        <div className="bg-white shadow-md p-4 rounded-lg w-full md:w-1/2">
          <h4 className="text-xl font-semibold text-center mb-2">
            Performance Over Time
          </h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="avgScore"
                stroke="#E53E3E"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default GraphComponent;
