import { useTheme } from "@mui/material";
import React, { useState } from "react";
import { FaSearch, FaTrash, FaUserPlus } from "react-icons/fa";
import { tokens } from "../../theme";

const ManageEnrollment = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [enrollments, setEnrollments] = useState([
    { id: 1, name: "Daniel Smith", email: "daniel@example.com" },
    { id: 2, name: "Sarah Connor", email: "sarah@example.com" },
    { id: 3, name: "John Doe", email: "john@example.com" },
    // Add more students to simulate data
  ]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredEnrollments = enrollments.filter(
    (enrollment) =>
      enrollment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      enrollment.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRemoveEnrollment = (id) => {
    setEnrollments(enrollments.filter((enrollment) => enrollment.id !== id));
  };

  const handleAddEnrollment = () => {
    // Logic for adding enrollment (you can prompt a form, for example)
    const newEnrollment = {
      id: enrollments.length + 1,
      name: "New Student",
      email: "newstudent@example.com",
    };
    setEnrollments([...enrollments, newEnrollment]);
  };
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <div
      className="p-5 m-2 dark:bg-gray-800 rounded-lg shadow-md"
      style={{
        backgroundColor: colors.primary[400],
        color: colors.primary[100],
      }}
    >
      <div className="flex justify-between flex-wrap items-center mb-6 gap-2">
        <h2 className="text-xl font-semibold dark:text-white">
          Manage Enrollments
        </h2>

        <div className="flex flex-wrap gap-2 items-center">
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
            className="flex items-center px-4 py-2 rounded-md"
            style={{
              backgroundColor: colors.greenAccent[400],
              color: colors.primary[100],
            }}
          >
            <FaUserPlus className="mr-2" />
            Add Enrollment
          </button>
        </div>
      </div>

      <table
        className="min-w-full dark:bg-gray-800 rounded-lg shadow-md "
        style={{
          backgroundColor: colors.primary[400],
          color: colors.primary[100],
          overflowWrap: "anywhere",
        }}
      >
        <thead>
          <tr className="border rounded-md" style={{ borderRadius: "15px" }}>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Email</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEnrollments.map((enrollment) => (
            <tr
              key={enrollment.id}
              className="border"
              style={{ borderRadius: "50%" }}
            >
              <td className="p-4">{enrollment.name}</td>
              <td className="p-4 ">{enrollment.email}</td>
              <td className="p-4">
                <button
                  onClick={() => handleRemoveEnrollment(enrollment.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredEnrollments.length === 0 && (
        <p className="mt-4 text-center text-gray-600 dark:text-gray-300">
          No students found.
        </p>
      )}
    </div>
  );
};

export default ManageEnrollment;
