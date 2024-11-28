import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register chart elements
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
  return (
    <div className="h-full">
      <Pie data={data} options={{ responsive: true, plugins: { legend: { position: "top" } } }} />
    </div>
  );
};

export default PieChart;
