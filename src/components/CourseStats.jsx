import { useTheme } from "@mui/material";
import React from "react";
import {
  MdAccessTime,
  MdStar,
  MdPendingActions,
  MdFreeCancellation,
  MdFlightTakeoff,
} from "react-icons/md";
import { tokens } from "../theme";

const CourseStats = () => {
  const stats = [
    {
      title: "Active courses",
      icon: <MdAccessTime className="text-gray-500 text-4xl" />,
    },
    {
      title: "Upcoming courses",
      icon: <MdStar className="text-yellow-500 text-4xl" />,
    },
    {
      title: "Pending courses",
      icon: <MdPendingActions className="text-orange-500 text-4xl" />,
    },
    {
      title: "Free courses",
      icon: <MdFreeCancellation className="text-green-500 text-4xl" />,
    },
    {
      title: "Pilot courses",
      icon: <MdFlightTakeoff className="text-blue-500 text-4xl" />,
    },
  ];
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="p-4 rounded-lg shadow-md flex flex-col items-center text-center 
            transition-transform hover:scale-105"
            style={{
              backgroundColor: colors.primary[400],
              color: colors.primary[100],
            }}
          >
            {/* Icon */}
            <div className="mb-2">{stat.icon}</div>
            {/* Title */}
            <h2 className="text-base sm:text-lg font-semibold mb-1">
              {stat.title}
            </h2>
            {/* Value */}
            <p className="text-lg sm:text-xl md:text-2xl font-bold">24</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseStats;
