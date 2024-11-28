import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js";

const LineChart = ({ data }) => (
  <div className="h-full">
    <Line data={data} />
  </div>
);

export default LineChart;
