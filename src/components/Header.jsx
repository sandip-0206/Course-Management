import React, { useState, useRef, useEffect, useContext } from "react";
import { HiMenuAlt3 } from "react-icons/hi"; // Hamburger icon
import { FaSearch, FaBell, FaCog } from "react-icons/fa";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import Modal from "./Modal"; // Import Modal component
import { useNavigate } from "react-router";
import { IconButton, useMediaQuery, useTheme } from "@mui/material";
import { ColorModeContext, tokens } from "../theme";

const Header = ({
  toggleSidebar,
  isSidebarOpen,
  activeSubMenu,
  // setActiveSubMenu,
}) => {
  console.log("activeSubMenu", activeSubMenu);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md")); // Detect small screens

  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleNotificationToggle = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
  };

  const handleProfileModalToggle = () => {
    setIsProfileModalOpen(!isProfileModalOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target)
      ) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="flex justify-between items-center p-4 bg-white drop-shadow-md"
      style={{
        backgroundColor: colors.primary[400],
        color: colors.grey[100],
      }}
    >
      {/* Hamburger Icon - only visible on small and medium screens */}
      <div className="flex items-center gap-5 ">
        <div
          className={`text-2xl  cursor-pointer border-zinc-700 ${
            isSidebarOpen ? "hidden" : "lg:hidden"
          }`}
          onClick={toggleSidebar}
        >
          <HiMenuAlt3 />
        </div>

        {/* Header Title */}
        <div>
          <h1
            className={`text-xl font-bold ${
              {
                Dashboard: "text-indigo-500",
                "Tutor Training": "text-purple-500",
                Ebooks: "text-orange-500",
                Affiliates: "text-yellow-500",
                Support: "text-red-500",
                Settings: "text-gray-500",
                "BootCamp Team Training": "text-indigo-500",
                "Tutor Booking": "text-green-500",
                Enrollments: "text-yellow-500",
              }[activeSubMenu] || "text-gray-500" // Default color for other cases
            }`}
          >
            {activeSubMenu}
          </h1>

          {activeSubMenu === "Dashboard" &&
            (() => {
              const currentHour = new Intl.DateTimeFormat("en-US", {
                hour: "numeric",
                hourCycle: "h23",
                timeZone: "Asia/Kolkata", // Set the time zone to India
              }).format(new Date());

              let greeting = "Good morning";
              if (currentHour >= 12 && currentHour < 17) {
                greeting = "Good afternoon";
              } else if (currentHour >= 17) {
                greeting = "Good evening";
              }

              return <p className="">{greeting}, Daniel!</p>;
            })()}
        </div>
      </div>

      {/* Icons and Avatar */}
      <div className="flex items-center">
        {/* Search Icon */}
        {!isSmallScreen && (
          <div className="relative">
            <FaSearch
              className={` mr-4 cursor-pointer ${
                isSearchOpen ? "hidden" : "block"
              }`}
              onClick={handleSearchToggle}
            />
            {isSearchOpen && (
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search..."
                className="absolute top-0 right-1 transform -translate-x-1/2 w-lg p-2 border rounded-md -mt-4"
              />
            )}
          </div>
        )}

        {/* Dark and Light Mode */}
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

        {/* Notifications Icon */}
        <IconButton>
          <FaBell
            className=" cursor-pointer"
            onClick={handleNotificationToggle}
          />
        </IconButton>

        {/* Settings Icon */}
        <IconButton>
          <FaCog
            className="cursor-pointer"
            onClick={() => navigate("/settings")}
          />
        </IconButton>

        {/* Profile Avatar */}
        <div className="relative">
          <img
            src="https://placehold.co/40x40"
            alt="User Avatar"
            className="rounded-full cursor-pointer"
            onClick={handleProfileModalToggle}
          />
        </div>
      </div>

      {/* Modals */}
      <Modal
        isOpen={isNotificationsOpen}
        onClose={handleNotificationToggle}
        title="Notifications"
      >
        <ul className="space-y-2">
          <li className="text-sm ">New course available!</li>
          <li className="text-sm ">Reminder: Course deadline approaching</li>
        </ul>
      </Modal>

      <Modal
        isOpen={isProfileModalOpen}
        onClose={handleProfileModalToggle}
        title="Edit Profile"
      >
        {/* Profile edit content */}
        <form>
          <div className="mb-4">
            <label className="block">Name</label>
            <input type="text" className="border p-2 w-full" />
          </div>
          <div className="mb-4">
            <label className="block">Email</label>
            <input type="email" className="border p-2 w-full" />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Header;
