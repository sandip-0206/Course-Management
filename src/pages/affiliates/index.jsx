import { Divider, useTheme } from "@mui/material";
import React, { useState } from "react";
import {
  FaUserPlus,
  FaEdit,
  FaTrash,
  FaRegCheckCircle,
  FaRegTimesCircle,
} from "react-icons/fa";
import { tokens } from "../../theme";

const Affiliates = () => {
  const [affiliates, setAffiliates] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [promocode, setPromocode] = useState("");
  const [status, setStatus] = useState("Active");
  const [formError, setFormError] = useState("");

  // Handle form submission to add a new affiliate
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !promocode) {
      setFormError("All fields are required.");
      return;
    }

    const newAffiliate = {
      id: Date.now(),
      name,
      email,
      promocode,
      status,
    };

    setAffiliates([...affiliates, newAffiliate]);

    // Clear form fields
    setName("");
    setEmail("");
    setPromocode("");
    setStatus("Active");
    setFormError(""); // Clear error message if form is valid
  };

  // Toggle the status between Active and Inactive
  const toggleStatus = (id) => {
    setAffiliates(
      affiliates.map((affiliate) =>
        affiliate.id === id
          ? {
              ...affiliate,
              status: affiliate.status === "Active" ? "Inactive" : "Active",
            }
          : affiliate
      )
    );
  };

  // Delete an affiliate
  const deleteAffiliate = (id) => {
    setAffiliates(affiliates.filter((affiliate) => affiliate.id !== id));
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <div
      className="p-6 rounded-lg shadow-md space-y-6 h-screen overflow-y-auto"
      style={{
        color: colors.primary[100],
      }}
    >
      <h2 className="text-xl font-semibold dark:text-white">
        Affiliate Management
      </h2>

      {/* Add Affiliate Form */}
      <form
        onSubmit={handleSubmit}
        className="p-4 rounded-lg shadow-md"
        style={{
          backgroundColor: colors.primary[400],
          color: colors.primary[100],
        }}
      >
        <div className="space-y-4">
          <div>
            <label className="block  dark:text-white">Affiliate Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded-md dark:bg-gray-600 dark:text-white"
              placeholder="Enter Affiliate's Name"
              style={{
                backgroundColor: colors.primary[700],
                color: colors.primary[100],
              }}
            />
          </div>

          <div>
            <label className="block  dark:text-white">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-md dark:bg-gray-600 dark:text-white"
              placeholder="Enter Affiliate's Email"
              style={{
                backgroundColor: colors.primary[700],
                color: colors.primary[100],
              }}
            />
          </div>

          <div>
            <label className="block  dark:text-white">Promocode</label>
            <input
              type="text"
              value={promocode}
              onChange={(e) => setPromocode(e.target.value)}
              className="w-full p-2 border rounded-md dark:bg-gray-600 dark:text-white"
              placeholder="Enter Affiliate's Promocode"
              style={{
                backgroundColor: colors.primary[700],
                color: colors.primary[100],
              }}
            />
          </div>

          <div>
            <label className="block  dark:text-white">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-2 border rounded-md dark:bg-gray-600 dark:text-white"
              style={{
                backgroundColor: colors.primary[700],
                color: colors.primary[100],
              }}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {formError && (
            <p className="text-red-500 text-sm mt-2">{formError}</p>
          )}

          <div className="mt-4">
            <button
              type="submit"
              className="px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
              style={{
                backgroundColor: colors.greenAccent[700],
                color: colors.primary[401],
              }}
            >
              Add Affiliate
            </button>
          </div>
        </div>
      </form>

      <Divider />

      {/* Affiliates List */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold dark:text-white">
          Registered Affiliates
        </h3>

        {affiliates.length > 0 ? (
          affiliates.map((affiliate) => (
            <div
              key={affiliate.id}
              className="flex flex-wrap gap-4 justify-between items-center p-4 dark:bg-gray-700 rounded-lg shadow-md"
              style={{
                backgroundColor: colors.primary[400],
                color: colors.primary[100],
              }}
            >
              <div className="flex items-center space-x-4">
                <FaUserPlus className="text-blue-500" />
                <div>
                  <h4 className="text-lg font-semibold  dark:text-white">
                    {affiliate.name}
                  </h4>
                  <p className="dark:text-gray-300">{affiliate.email}</p>
                  <p className="dark:text-gray-400">
                    Promocode: {affiliate.promocode}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <span
                  className={`px-2 py-1 rounded-full text-sm ${
                    affiliate.status === "Active"
                      ? "bg-green-200 text-green-600"
                      : "bg-red-200 text-red-600"
                  }`}
                >
                  {affiliate.status}
                </span>

                <button
                  onClick={() => toggleStatus(affiliate.id)}
                  className="text-yellow-500 hover:text-yellow-700"
                >
                  <FaEdit />
                </button>

                <button
                  onClick={() => deleteAffiliate(affiliate.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="dark:text-gray-300">No affiliates registered yet.</p>
        )}
      </div>
    </div>
  );
};

export default Affiliates;
