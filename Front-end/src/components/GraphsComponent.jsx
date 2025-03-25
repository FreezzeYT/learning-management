import React from "react";
import Chart from "react-apexcharts";

const GraphComponent = () => {
  const studentCourseData = {
    series: [
      {
        name: "Count",
        data: [104, 1200, 89],
      },
    ],
    options: {
      chart: {
        type: "bar",
      },
      xaxis: {
        categories: ["Courses", "Students", "Instructors"],
      },
      colors: ["#3182CE"],
    },
  };

  const performanceData = {
    series: [
      {
        name: "Average Score",
        data: [72, 75, 78, 80, 85, 83],
      },
    ],
    options: {
      chart: {
        type: "line",
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      },
      stroke: {
        curve: "smooth",
        width: 3,
      },
      colors: ["#E53E3E"],
    },
  };

  const PieData = {
    series: [250, 180, 220, 150, 200, 200],
    options: {
      chart: {
        type: "pie",
      },
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      colors: [
        "#E53E3E",
        "#3182CE",
        "#F59E0B",
        "#10B981",
        "#8B5CF6",
        "#EC4899",
      ],
    },
  };

  return (
    <div className="container mx-auto mt-10">
      <h3 className="text-3xl font-semibold text-center mb-6">
        Dashboard Overview
      </h3>

      <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
        {/* Bar Chart */}
        <div className="bg-white shadow-md p-4 rounded-lg w-full md:w-1/2">
          <h4 className="text-xl font-semibold text-center mb-2">
            User & Course Distribution
          </h4>
          <Chart
            options={studentCourseData.options}
            series={studentCourseData.series}
            type="bar"
            height={300}
          />
        </div>

        {/* Line Chart */}
        <div className="bg-white shadow-md p-4 rounded-lg w-full md:w-1/2">
          <h4 className="text-xl font-semibold text-center mb-2">
            Performance Over Time
          </h4>
          <Chart
            options={performanceData.options}
            series={performanceData.series}
            type="line"
            height={300}
          />
        </div>
        {/* Pie Chart */}
        <div className="bg-white shadow-md p-4 rounded-lg w-full md:w-1/2">
          <h4 className="text-xl font-semibold text-center mb-2">
            No. of Students over months
          </h4>
          <Chart
            options={PieData.options}
            series={PieData.series}
            type="pie"
            height={300}
          />
        </div>
      </div>
    </div>
  );
};

export default GraphComponent;
