import React from "react";

const ChartCard = ({ title, children }) => (
  <div className="bg-white p-4 rounded shadow">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-gray-600">{title}</h2>
      <div className="flex items-center">
        <span className="text-gray-600 mr-2">This Year</span>
        <i className="fas fa-ellipsis-h text-gray-600"></i>
      </div>
    </div>
    {children}
  </div>
);

export default ChartCard;
