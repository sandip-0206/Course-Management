import React from "react";

const StatCard = ({ title, value, active, upcoming }) => (
  <div className="bg-white p-4 rounded shadow">
    <h2 className="text-gray-600">{title}</h2>
    <p className="text-2xl font-bold">{value}</p>
    <div className="flex justify-between text-gray-600">
      <span>Active: {active}</span>
      <span>Upcoming: {upcoming}</span>
    </div>
  </div>
);

export default StatCard;
