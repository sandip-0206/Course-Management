import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register chart elements
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ data }) => {
  return (
    <div className="h-full">
      <Bar data={data} options={{ responsive: true, plugins: { legend: { position: "top" } } }} />
    </div>
  );
};

export default BarChart;
