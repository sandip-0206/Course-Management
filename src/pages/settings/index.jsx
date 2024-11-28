import { IconButton, useMediaQuery, useTheme } from "@mui/material";
import React, { useContext, useState } from "react";
import { FaUser, FaBell, FaPaintBrush, FaCog, FaSearch } from "react-icons/fa"; // Importing icons from react-icons/fa
import { MdDarkMode, MdLightMode } from "react-icons/md"; // Dark and Light mode icons
import { ColorModeContext, tokens } from "../../theme";

const Settings = ({
  handleProfileEditToggle,
  isProfileEditable,
  setIsProfileEditable,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State for sidebar visibility
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const isSmallScreen = useMediaQuery("(max-width:600px)"); // Mobile
  const isMediumScreen = useMediaQuery("(max-width:900px)"); // Tablet

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar state
  };

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark", !isDarkMode);
  };

  const handleNotificationToggle = () => {
    setIsNotificationsEnabled(!isNotificationsEnabled);
  };

  // const handleProfileEditToggle = () => {
  //   setIsProfileEditable(!isProfileEditable);
  // };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white z-10">
      {/* Sidebar */}
      {/* <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} /> */}

      {/* Main Content */}
      <div className={`flex-1 p-6 transition-all duration-300 `} style={{
        backgroundColor:colors.primary[700]
      }}>
        {/* Settings Sections */}
        <div className="space-y-6">
          {/* Profile Settings */}
          <div
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md"
            style={{
              backgroundColor: colors.primary[400],
              color: colors.grey[100],
            }}
          >
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <FaUser className="text-blue-500" /> Profile Settings
            </h2>
            <p className="mt-2  dark:text-gray-300">
              Update your personal information and preferences.
            </p>
            <button
              className={`mt-4 px-4 py-2 rounded text-white ${
                isProfileEditable ? "bg-red-500" : "bg-green-500"
              } transition-colors`}
              onClick={handleProfileEditToggle}
            >
              {isProfileEditable ? "Disable Edit Mode" : "Enable Edit Mode"}
            </button>
          </div>

          {/* Notifications */}
          <div
            className="bg-white dark:bg-white-800 p-4 rounded-lg shadow-md"
            style={{
              backgroundColor: colors.primary[400],
              color: colors.grey[100],
            }}
          >
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <FaBell className="text-yellow-500" /> Notifications
            </h2>
            <p className="mt-2">
              Enable or disable notifications for important updates.
            </p>
            <div className="mt-4 flex justify-between items-center">
              <span>Enable Notifications</span>
              <input
                type="checkbox"
                checked={isNotificationsEnabled}
                onChange={handleNotificationToggle}
                className="toggle-checkbox"
              />
            </div>
          </div>

          {/* Theme Preferences */}
          <div
            className=" p-4 rounded-lg shadow-md"
            style={{
              backgroundColor: colors.primary[400],
              color: colors.grey[100],
            }}
          >
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <FaPaintBrush className="text-green-500" /> Theme Preferences
            </h2>
            <p className="mt-2">Switch between light and dark mode.</p>
            <div className="mt-4 flex justify-between items-center">
              <span>Dark Mode</span>
              {/* <button
                onClick={handleDarkModeToggle}
                className="flex items-center px-4 py-2 rounded bg-blue-500 text-white"
              >
                {isDarkMode ? (
                  <MdLightMode className="mr-2" />
                ) : (
                  <MdDarkMode className="mr-2" />
                )}
                {isDarkMode ? "Light Mode" : "Dark Mode"}
              </button> */}
              <IconButton onClick={colorMode.toggleColorMode}>
                {theme.palette.mode === "dark" ? (
                  <MdDarkMode
                    sx={{
                      color: colors.greenAccent[600],
                      fontSize: isSmallScreen ? "20px" : "26px",
                    }}
                  />
                ) : (
                  <MdLightMode
                    sx={{
                      color: colors.greenAccent[600],
                      fontSize: isSmallScreen ? "20px" : "26px",
                    }}
                  />
                )}
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
