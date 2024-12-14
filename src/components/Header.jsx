import React, { useState, useRef, useEffect, useContext } from "react";
import {
  IconButton,
  useMediaQuery,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import {
  Menu,
  Search,
  Notifications,
  Settings,
  Brightness4,
  Brightness7,
} from "@mui/icons-material";
import { useNavigate } from "react-router";
import { ColorModeContext, tokens } from "../theme";

const Header = ({
  toggleSidebar,
  isSidebarOpen,
  activeSubMenu,
  isProfileEditable,
  checked,
  setChecked,
}) => {
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

  const handleSearchToggle = () => setIsSearchOpen(!isSearchOpen);

  const handleNotificationToggle = () =>
    setIsNotificationsOpen(!isNotificationsOpen);

  const handleProfileModalToggle = () =>
    setIsProfileModalOpen(!isProfileModalOpen);

  const handleSearchChange = (event) => setSearchQuery(event.target.value);

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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className="flex justify-between items-center p-4"
      style={{
        backgroundColor: colors.primary[400],
        color: colors.grey[100],
      }}
    >
      {/* Hamburger Icon - Visible on small screens */}
      <div className="flex items-center gap-5">
        {isSmallScreen && (
          <IconButton onClick={toggleSidebar}>
            <Menu style={{ color: colors.grey[100] }} />
          </IconButton>
        )}

        {/* Header Title */}
        <div>
          <h1
            className={`text-xl font-bold ${getActiveMenuColor(activeSubMenu)}`}
          >
            {activeSubMenu}
          </h1>
          {activeSubMenu === "Dashboard" && <Greeting />}
        </div>
      </div>

      {/* Icons Section */}
      <div className="flex items-center">
        {/* Search */}
        {!isSmallScreen && (
          <div className="relative">
            <IconButton onClick={handleSearchToggle}>
              <Search style={{ color: colors.grey[100] }} />
            </IconButton>
            {isSearchOpen && (
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search..."
                className="absolute top-0 right-0 transform w-full p-2 border rounded-md"
              />
            )}
          </div>
        )}

        {/* Dark/Light Mode */}
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <Brightness4 style={{ color: colors.greenAccent[600] }} />
          ) : (
            <Brightness7 style={{ color: colors.greenAccent[600] }} />
          )}
        </IconButton>

        {/* Notifications */}
        <IconButton onClick={handleNotificationToggle}>
          <Notifications style={{ color: colors.grey[100] }} />
        </IconButton>

        {/* Settings */}
        <IconButton onClick={() => navigate("/settings")}>
          <Settings style={{ color: colors.grey[100] }} />
        </IconButton>

        {/* Profile Avatar */}
        <IconButton onClick={handleProfileModalToggle}>
          <img
            src="https://placehold.co/40x40"
            alt="User Avatar"
            className="rounded-full"
          />
        </IconButton>
      </div>

      {/* Notifications Modal */}
      {checked && (
        <Dialog open={isNotificationsOpen} onClose={handleNotificationToggle}>
          <DialogTitle>Notifications</DialogTitle>
          <DialogContent>
            <ul>
              <li>New course available!</li>
              <li>Reminder: Course deadline approaching</li>
            </ul>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleNotificationToggle} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Profile Edit Modal */}
      {isProfileEditable && (
        <Dialog open={isProfileModalOpen} onClose={handleProfileModalToggle}>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                fullWidth
                label="Name"
                margin="normal"
                defaultValue="Daniel"
              />
              <TextField
                fullWidth
                label="Email"
                margin="normal"
                defaultValue="daniel@example.com"
                type="email"
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleProfileModalToggle} color="secondary">
              Cancel
            </Button>
            <Button variant="contained" color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

const getActiveMenuColor = (activeSubMenu) => {
  const menuColors = {
    Dashboard: "text-indigo-500",
    "Tutor Training": "text-purple-500",
    Ebooks: "text-orange-500",
    Affiliates: "text-yellow-500",
    Support: "text-red-500",
    Settings: "text-gray-500",
    "BootCamp Team Training": "text-indigo-500",
    "Tutor Booking": "text-green-500",
    Enrollments: "text-yellow-500",
  };
  return menuColors[activeSubMenu] || "text-gray-500";
};

const Greeting = () => {
  const currentHour = new Date().getHours();
  let greeting = "Good morning";
  if (currentHour >= 12 && currentHour < 17) greeting = "Good afternoon";
  else if (currentHour >= 17) greeting = "Good evening";

  return <p>{greeting}, Daniel!</p>;
};

export default Header;
