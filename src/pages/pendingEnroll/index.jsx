import { IconButton, useTheme } from "@mui/material";
import React, { useState } from "react";
import { FaSearch, FaCheck, FaTimes, FaUserPlus } from "react-icons/fa";
import { tokens } from "../../theme";

const PendingEnrollment = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [pendingEnrollments, setPendingEnrollments] = useState([
    { id: 1, name: "Daniel Smith", email: "daniel@example.com" },
    { id: 2, name: "Sarah Connor", email: "sarah@example.com" },
    { id: 3, name: "John Doe", email: "john@example.com" },
    // More pending enrollments can be added
  ]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredPendingEnrollments = pendingEnrollments.filter(
    (enrollment) =>
      enrollment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      enrollment.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleApproveEnrollment = (id) => {
    // Logic to approve the enrollment
    setPendingEnrollments(
      pendingEnrollments.filter((enrollment) => enrollment.id !== id)
    );
  };

  const handleRejectEnrollment = (id) => {
    // Logic to reject the enrollment
    setPendingEnrollments(
      pendingEnrollments.filter((enrollment) => enrollment.id !== id)
    );
  };

  const handleAddEnrollment = () => {
    // Logic for adding a new pending enrollment (you can prompt a form, for example)
    const newPendingEnrollment = {
      id: pendingEnrollments.length + 1,
      name: "New Pending Student",
      email: "newpendingstudent@example.com",
    };
    setPendingEnrollments([...pendingEnrollments, newPendingEnrollment]);
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <div
      className="p-6 dark:bg-gray-800 rounded-lg shadow-md m-4"
      style={{
        backgroundColor: colors.primary[400],
        color: colors.primary[100],
      }}
    >
      <div className="flex justify-between flex-wrap gap-4 items-center mb-6">
        <h2 className="text-xl font-semibold">Pending Enrollments</h2>

        <div className="flex items-center">
          <input
            type="text"
            className="p-2 border rounded-md mr-4"
            placeholder="Search students..."
            value={searchQuery}
            onChange={handleSearchChange}
            style={{
              backgroundColor: colors.primary[400],
              color: colors.primary[100],
            }}
          />
          <FaSearch className="cursor-pointer" />
          <button
            onClick={handleAddEnrollment}
            className="ml-4 flex items-center px-4 py-2 rounded-md"
            style={{
              backgroundColor: colors.greenAccent[400],
              color: colors.primary[401],
            }}
          >
            <FaUserPlus className="mr-2" />
            Add Pending Enrollment
          </button>
        </div>
      </div>

      <table
        className="min-w-full rounded-lg shadow-md"
        style={{
          backgroundColor: colors.primary[400],
          color: colors.primary[100],
          overflowWrap: "anywhere",
        }}
      >
        <thead>
          <tr className="border-b">
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Email</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPendingEnrollments.map((enrollment) => (
            <tr key={enrollment.id} className="border-b">
              <td className="p-4">{enrollment.name}</td>
              <td className="p-4">{enrollment.email}</td>
              <td className="p-4 flex space-x-4">
                <IconButton
                  size="small"
                  onClick={() => handleApproveEnrollment(enrollment.id)}
                  style={{ color: "green" }}
                >
                  <FaCheck />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => handleRejectEnrollment(enrollment.id)}
                  style={{ color: "red" }}
                >
                  <FaTimes />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredPendingEnrollments.length === 0 && (
        <p className="mt-4 text-center text-gray-600 dark:text-gray-300">
          No pending students found.
        </p>
      )}
    </div>
  );
};

export default PendingEnrollment;
