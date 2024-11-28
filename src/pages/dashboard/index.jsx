import React, { useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import {
  FaSearch,
  FaBell,
  FaCog,
  FaDollarSign,
  FaArrowRight,
  FaCalendarAlt,
  FaChevronDown,
  FaBook,
  FaChalkboardTeacher,
  FaUsers,
  FaClipboardList,
} from "react-icons/fa";
import { MdOutlineArrowOutward } from "react-icons/md";
import { HiMenuAlt3 } from "react-icons/hi";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement, // Add this
  LineElement, // Add this
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";

// Register chart elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement, // Register PointElement
  LineElement, // Register LineElement
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ data }) => {
  return (
    <div className="h-full">
      <Line
        data={data}
        options={{ responsive: true, plugins: { legend: { position: "top" } } }}
      />
    </div>
  );
};

const BarChart = ({ data }) => {
  return (
    <div className="h-full">
      <Bar
        data={data}
        options={{ responsive: true, plugins: { legend: { position: "top" } } }}
      />
    </div>
  );
};

const PieChart = ({ data }) => {
  return (
    <div className="h-full">
      <Pie
        data={data}
        options={{ responsive: true, plugins: { legend: { position: "top" } } }}
      />
    </div>
  );
};

const Dashboard = () => {
  const lineChartData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Revenue",
        data: [
          1200, 1900, 3000, 5000, 2000, 3000, 4500, 3200, 4100, 5000, 6000,
          7000,
        ],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  };

  const barChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenue",
        data: [1200, 1900, 3000, 5000, 2000, 3000],
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const requestedWithdrawal = [
    { email: "bockelboy@att.net", name: "Aria Bailey", amount: "$5.22" },
    { email: "samuel99@gmail.com", name: "Samuel Collins", amount: "$7.50" },
    { email: "lisa.doe@example.com", name: "Lisa Doe", amount: "$4.89" },
    { email: "johnwick@continental.com", name: "John Wick", amount: "$10.00" },
  ];

  const topCourses = [
    { title: "Data Science and Machine Learning", sales: "5 Total Sales" },
    { title: "Introduction to Web Development", sales: "8 Total Sales" },
    { title: "Advanced React and Redux", sales: "3 Total Sales" },
    { title: "UI/UX Design Principles", sales: "6 Total Sales" },
    { title: "Python for Data Analysis", sales: "7 Total Sales" },
  ];

  const [sortCriteria, setSortCriteria] = useState("");

  const handleSortChange = (e) => setSortCriteria(e.target.value);

  const [showOptions, setShowOptions] = useState(false);
  const [selectedDate, setSelectedDate] = useState({
    month: "January",
    year: new Date().getFullYear(),
  });

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const pieChartData = {
    labels: [
      "UX/UI Designing",
      "Digital Marketing",
      "AI & Machine Learning",
      "Graphic Design",
    ],
    datasets: [
      {
        data: [300, 50, 100, 80],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],

        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const years = Array.from(
    { length: 30 },
    (_, i) => new Date().getFullYear() - i
  );

  const handleMonthChange = (month) => {
    setSelectedDate((prev) => ({ ...prev, month }));
    setShowOptions(false);
  };

  const handleYearChange = (year) => {
    setSelectedDate((prev) => ({ ...prev, year }));
    setShowOptions(false);
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for toggling sidebar visibility

  // Toggle function for opening and closing the sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  return (
    <div className="flex flex-col lg:flex-row overflowY-auto h-screen">
      {/* Main Dashboard Content */}
      <div className=" flex-1 p-2 ">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {/* Course Card */}

          <div
            className=" rounded-lg shadow-lg "
            style={{
              backgroundColor: colors.primary[400],
              color: colors.grey[100],
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                padding: "5px 0px 0 0px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div className="flex flex-row items-center p-2 gap-2">
                <FaBook className="text-5xl mb-3 text-blue-600" />
                <div className="flex flex-col">
                  <h2 className=" text-lg sm:text-sm font-semibold">Courses</h2>
                  <p
                    className="text-xl sm:text-2xl font-bold  mt-auto"
                    style={{ fontSize: "18px" }}
                  >
                    24
                  </p>
                </div>
              </div>
              <div
                className="flex justify-between text-gray-600 text-sm sm:text-base"
                style={{
                  borderRadius: "4px",
                  padding: "5px",
                  display: "flex",
                  justifyContent: "space-evenly",
                  backgroundColor: "#ebe8e8",
                  backgroundColor: colors.primary[700],
                  color: colors.grey[100],
                }}
              >
                <span>Active: 3</span>
                <span
                  className="h-5 w- text-black"
                  style={{
                    height: "20px",
                    width: "1px",
                    border: "1px solid grey",
                  }}
                ></span>
                <span>Upcoming: 1</span>
              </div>
            </div>
          </div>

          <div
            className="rounded-lg shadow-lg"
            style={{
              backgroundColor: colors.primary[400],
              color: colors.grey[100],
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                padding: "5px 0px 0 0px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div className="flex flex-row items-center p-2 gap-2">
                <FaChalkboardTeacher className="text-5xl text-blue-600 mb-3" />
                <div className="flex flex-col">
                  <h2 className=" text-lg sm:text-sm font-semibold">
                    Number of Lessons
                  </h2>
                  <p
                    className="text-xl sm:text-2xl font-bold  mt-auto"
                    style={{ fontSize: "18px" }}
                  >
                    220
                  </p>
                </div>
              </div>
              <div
                className="flex justify-between  text-sm sm:text-base"
                style={{
                  borderRadius: "4px",
                  padding: "5px",
                  display: "flex",
                  justifyContent: "space-evenly",
                  backgroundColor: "#ebe8e8",
                  backgroundColor: colors.primary[700],
                  color: colors.grey[100],
                }}
              >
                <span>Active: 20</span>
                <span
                  className="h-5 w- text-black"
                  style={{
                    height: "20px",
                    width: "1px",
                    border: "1px solid grey",
                  }}
                ></span>
                <span>Upcoming: 1</span>
              </div>
            </div>
          </div>

          <div
            className="bg-white rounded-lg shadow-lg "
            style={{
              backgroundColor: colors.primary[400],
              color: colors.grey[100],
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                padding: "5px 0px 0 0px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div className="flex flex-row items-center p-2 gap-2">
                <FaBook className="text-5xl text-blue-600 mb-3" />
                <div className="flex flex-col">
                  <h2 className=" text-lg sm:text-sm font-semibold">
                    Number of Enrollments
                  </h2>
                  <p
                    className="text-xl sm:text-2xl font-bold  mt-auto"
                    style={{ fontSize: "18px" }}
                  >
                    67
                  </p>
                </div>
              </div>
              <div
                className="flex justify-between text-sm sm:text-base text-center"
                style={{
                  borderRadius: "4px",
                  padding: "5px",
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  backgroundColor: "#ebe8e8",
                  backgroundColor: colors.primary[700],
                  color: colors.grey[100],
                }}
              >
                <span>Passes: 60</span>
                <span
                  className="h-5 w- text-black"
                  style={{
                    height: "20px",
                    width: "1px",
                    border: "1px solid grey",
                  }}
                ></span>
                <span>New: 7</span>
              </div>
            </div>
          </div>

          {/* Number of Students Card */}

          <div
            className="bg-white rounded-lg shadow-lg "
            style={{
              backgroundColor: colors.primary[400],
              color: colors.grey[100],
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                padding: "5px 0px 0 0px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div className="flex flex-row items-center p-2 gap-2">
                <FaBook className="text-5xl text-blue-600 mb-3" />
                <div className="flex flex-col">
                  <h2 className=" text-lg sm:text-sm font-semibold">
                    Number of Students
                  </h2>
                  <p
                    className="text-xl sm:text-2xl font-bold  mt-auto"
                    style={{ fontSize: "18px" }}
                  >
                    17
                  </p>
                </div>
              </div>
              <div
                className="flex justify-between text-sm sm:text-base "
                style={{
                  borderRadius: "4px",
                  padding: "5px",
                  display: "flex",
                  justifyContent: "space-evenly",
                  backgroundColor: "#ebe8e8",
                  backgroundColor: colors.primary[700],
                  color: colors.grey[100],
                }}
              >
                <span>Active: 12</span>
                <span
                  className="h-5 w- text-black"
                  style={{
                    height: "20px",
                    width: "1px",
                    border: "1px solid grey",
                  }}
                ></span>
                <span>Upcoming: 5</span>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          <div
            className="p-4 rounded shadow"
            style={{
              backgroundColor: colors.primary[400],
            }}
          >
            <h2
              style={{
                color: colors.grey[100],
              }}
            >
              Admin Revenue
            </h2>
            <div className="h-64">
              <LineChart data={lineChartData} />
            </div>
          </div>
          <div
            className="p-4 rounded shadow"
            style={{
              backgroundColor: colors.primary[400],
            }}
          >
            <h2
              style={{
                color: colors.grey[100],
              }}
            >
              Course Sell
            </h2>
            <div className="h-64">
              <BarChart
                data={barChartData}
                style={{
                  color: colors.grey[100],
                }}
              />
            </div>
          </div>
        </div>

        {/* More Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          <div
            className="p-4 rounded shadow"
            style={{
              backgroundColor: colors.primary[400],
              color: colors.primary[100],
            }}
          >
            <div className="flex justify-between mb-3">
              <h2 className="p-2">Requested Withdrawal</h2>
              <div className="relative">
                {/* Trigger */}
                <span
                  className="p-2 cursor-pointer flex items-center p-2 rounded-lg gap-2 border"
                  style={{ color: colors.primary[100] }}
                  onClick={() => setShowOptions((prev) => !prev)}
                >
                  <FaCalendarAlt className="mr-2" />{" "}
                  {`${selectedDate.month} ${selectedDate.year}`}
                  <FaChevronDown className="ml-2" />{" "}
                </span>

                {/* Dropdown */}
                {showOptions && (
                  <div
                    className="absolute top-full mt-2 border rounded shadow-md p-4 z-10 w-48"
                    style={{
                      backgroundColor: colors.primary[400],
                      color: colors.primary[100],
                    }}
                  >
                    {/* Month Selector */}
                    <div className="mb-2">
                      <h3 className="text-sm font-semibold">Select Month</h3>
                      <ul className="mt-1 space-y-1">
                        {months.map((month) => (
                          <li
                            key={month}
                            className={`p-1 text-sm cursor-pointer rounded ${
                              selectedDate.month === month
                                ? "bg-gray-200"
                                : "hover:bg-gray-700"
                            }`}
                            onClick={() => handleMonthChange(month)}
                          >
                            {month}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Year Selector */}
                    <div>
                      <h3 className="text-sm font-semibold">Select Year</h3>
                      <ul className="mt-1 space-y-1 max-h-40 overflow-y-auto">
                        {years.map((year) => (
                          <li
                            key={year}
                            className={`p-1 text-sm cursor-pointer rounded ${
                              selectedDate.year === year
                                ? "bg-gray-200"
                                : "hover:bg-gray-100"
                            }`}
                            onClick={() => handleYearChange(year)}
                          >
                            {year}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
              {/* <h2 className="text-gray-600 p-2">Requested Withdrawal</h2> */}
            </div>

            <ul>
              {requestedWithdrawal.map((entry, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center p-4 shadow rounded-lg border mb-2 hover:bg-gray-700 transition duration-300"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src="https://placehold.co/40x40"
                      alt="User Avatar"
                      className="rounded-full"
                    />
                    <div>
                      <p className="text-sm">{entry.email}</p>
                      <p className=" font-bold">{entry.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* <FaDollarSign className="text-green-500" />
                   <span className=" font-semibold">{entry.amount}</span> */}
                    <div>
                      <p className=" text-sm">{"Requested Amount"}</p>
                      <p className=" font-bold">{entry.amount}</p>
                    </div>
                    <div className="gap-4 p-2 rounded-lg border cursor-pointer">
                      <FaArrowRight className="" />
                    </div>
                  </div>
                </li>
              ))}
              {/* Add more withdrawal entries */}
            </ul>
          </div>
          <div
            className="p-4 rounded shadow"
            style={{
              backgroundColor: colors.primary[400],
              color: colors.primary[100],
            }}
          >
            <div className="flex justify-between">
              <h2 className="p-2">Top Courses</h2>
              <span className="flex items-center font-semibold border p-2 rounded-lg gap-2 text-center">
                See All
                <MdOutlineArrowOutward className="ml-1 text-lg" />
              </span>
            </div>
            <ul>
              {topCourses.map((course, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center p-3 m-2 border rounded-lg  
                  hover:bg-gray-700 transition duration-300 shadow-sm"
                >
                  <div className="flex items-center gap-2">
                    {/* Optional Icon */}
                    <span className="text-blue-500 bg-blue-100 rounded-full p-2">
                      📘
                    </span>
                    <span className="font-medium">{course.title}</span>
                  </div>
                  <span
                    className="font-semibold border p-2 rounded-full 
                        truncate max-w-[120px] overflow-hidden"
                  >
                    {course.sales}
                  </span>
                </li>
              ))}
              {/* Add more course entries */}
            </ul>
          </div>
        </div>

        {/* Pie Chart Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          <div
            className="p-4 rounded shadow"
            style={{
              backgroundColor: colors.primary[400],
              color: colors.primary[100],
            }}
          >
            <h2>Top 10 Best Selling Courses</h2>
            <div className="h-64">
              <PieChart data={pieChartData} />
            </div>
          </div>
          <div
            className="p-4 rounded shadow"
            style={{
              backgroundColor: colors.primary[400],
              color: colors.primary[100],
            }}
          >
            <h2>Course Overview</h2>
            <div className="h-64">
              <PieChart data={pieChartData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
