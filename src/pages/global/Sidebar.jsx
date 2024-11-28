import React, { useState } from "react";
import {
  FaHome,
  FaBook,
  FaUser,
  FaTag,
  FaCog,
  FaQuestionCircle,
  FaChalkboardTeacher,
  FaCalendarCheck,
  FaUsers,
  FaFileAlt,
  FaCreditCard,
  FaComment,
  FaNewspaper,
  FaHeadset,
} from "react-icons/fa";
import { HiX, HiMenuAlt3 } from "react-icons/hi";
import {
  Box,
  Collapse,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
  useMediaQuery,
  ListItem,
} from "@mui/material";
import { tokens } from "../../theme";
import { Link } from "react-router";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

const Sidebar = ({
  isSidebarOpen,
  toggleSidebar,
  activeSubMenu,
  setActiveSubMenu,
}) => {
  const [openSections, setOpenSections] = useState({
    bootCamp: false,
    tutorBooking: false,
    enrollments: false,
    reports: false,
    payments: false,
    courses: false,
  });
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md")); // Detect small screens

  const courses = [
    { name: "Manage Course", path: "/course-management" },
    { name: "Add New Course", path: "/add-course" },
    { name: "Course Category", path: "/course-category" },
    { name: "Coupons", path: "/coupons" },
  ];

  const tutorTraining = [
    { name: "Manage BootCamp", path: "/bootcamp-management" },
    { name: "Trainer Enrollment", path: "/trainer-enrollment" },
  ];
  const tutorBooking = [
    { name: "Manage Bookings", path: "/manage-bookings" },
    { name: "Booking History", path: "/booking-history" },
  ];

  const enrollments = [
    { name: "Manage Enrollments", path: "/manage-enrollments" },
    { name: "Pending Enrollments", path: "/pending-enrollments" },
  ];
  const reports = [
    { name: "Student Reports", path: "/student-reports" },
    { name: "Instructor Reports", path: "/instructor-reports" },
  ];

  const payments = [
    { name: "Student Reports", path: "/student-reports" },
    { name: "Instructor Reports", path: "/instructor-reports" },
  ];
  const [open, setOpen] = React.useState("");
  console.log("aaa", activeSubMenu);

  // const handleClick = () => {
  //   setOpen(!open);
  //   setActiveSubMenu(!activeSubMenu);
  // };
  const handleClick = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        // When sidebar is closed, apply width 0 to hide it completely
        width: isSidebarOpen || !isSmallScreen ? "250px" : "0", // Apply transition only when sidebar toggles
        transition: "width 0.3s ease", // Smooth animation for width
      }}
      style={{
        backgroundColor: colors.primary[400],
        color: colors.grey[100],
      }}
    >
      <Drawer
        variant={isSmallScreen ? "temporary" : "persistent"} // Use temporary drawer on small screens
        anchor="left"
        open={isSmallScreen ? isSidebarOpen : true} // Only open drawer on small screens when toggled
        onClose={toggleSidebar} // Handle close on small screens
        sx={{
          width: "250px",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: "250px",
            transition: "width 0.3s ease", // Ensure smooth transition for drawer width
          },
        }}
      >
        {/* Sidebar Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            padding: "10px",
            margin: "20px",
            borderBottom: "1px solid gray",
            borderColor: colors.grey[500],
          }}
        >
          <Typography variant="h3" color={colors.grey[100]}>
            Educa
          </Typography>

          {isSmallScreen && (
            <IconButton onClick={toggleSidebar}>
              <HiX className="text-2xl cursor-pointer text-gray-500" />
            </IconButton>
          )}
        </Box>

        <List>
          <ListItem
            button
            component={Link}
            to="/"
            onClick={() => setActiveSubMenu("Dashboard")}
            sx={{
              color:
                activeSubMenu === "Dashboard" ? "#6870fa" : colors.grey[100],
              backgroundColor:
                activeSubMenu === "Dashboard"
                  ? colors.grey[900]
                  : "transparent",
            }}
          >
            <ListItemIcon>
              <FaHome
                className="text-blue-500"
                // sx={{
                //   color:
                //     activeSubMenu === "Dashboard"
                //       ? "#6870fa"
                //       : colors.grey[100],
                //   backgroundColor:
                //     activeSubMenu === "Dashboard"
                //       ? colors.grey[100]
                //       : "transparent",
                // }}
              />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>

          <ListItemButton onClick={() => handleClick("courses")}>
            <ListItemIcon>
              <FaChalkboardTeacher className="text-indigo-500" />
            </ListItemIcon>
            <ListItemText primary="Courses" />
            {openSections.courses ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openSections.courses} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {courses?.map((item) => (
                <ListItemButton
                  sx={{
                    pl: 4,
                    backgroundColor:
                      activeSubMenu === item.name ? "#e0e0e0" : "transparent",
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                    },
                  }}
                  button
                  component={Link}
                  to={item.path}
                  onClick={() => setActiveSubMenu(`${item.name}`)}
                >
                  <ListItemText primary={item.name} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>

          <ListItem
            button
            component={Link}
            to="/tutor-training"
            onClick={() => setActiveSubMenu("Tutor Training")}
            sx={{
              color:
                activeSubMenu === "Tutor Training"
                  ? "#6870fa"
                  : colors.grey[100],
              backgroundColor:
                activeSubMenu === "Tutor Training"
                  ? colors.grey[900]
                  : "transparent",
            }}
          >
            <ListItemIcon>
              <FaUser
                className="text-purple-500"
                // sx={{
                //   color:
                //     activeSubMenu === "Tutor Training"
                //       ? "#6870fa"
                //       : colors.grey[100],
                // }}
              />
            </ListItemIcon>
            <ListItemText
              primary="Tutor Training"
              sx={{
                color:
                  activeSubMenu === "Tutor Training"
                    ? "#6870fa"
                    : colors.grey[100],
              }}
            />
          </ListItem>

          <ListItem
            button
            component={Link}
            to="/ebooks"
            onClick={() => setActiveSubMenu("Ebooks")}
            sx={{
              color: activeSubMenu === "Ebooks" ? "#6870fa" : colors.grey[100],
              backgroundColor:
                activeSubMenu === "Ebooks" ? colors.grey[900] : "transparent",
            }}
          >
            <ListItemIcon>
              <FaBook
                className="text-orange-500"
                // sx={{
                //   color:
                //     activeSubMenu === "Ebooks" ? "#6870fa" : colors.grey[100],
                // }}
              />
            </ListItemIcon>
            <ListItemText
              primary="Ebooks"
              sx={{
                color:
                  activeSubMenu === "Ebooks" ? "#6870fa" : colors.grey[100],
              }}
            />
          </ListItem>

          <ListItem
            button
            component={Link}
            to="/affiliates"
            onClick={() => setActiveSubMenu("Affiliates")}
            sx={{
              color:
                activeSubMenu === "Affiliates" ? "#6870fa" : colors.grey[100],
              backgroundColor:
                activeSubMenu === "Affiliates"
                  ? colors.grey[900]
                  : "transparent",
            }}
          >
            <ListItemIcon>
              <FaTag
                className="text-yellow-500"
                // sx={{
                //   color:
                //     activeSubMenu === "Affiliates"
                //       ? "#6870fa"
                //       : colors.grey[100],
                // }}
              />
            </ListItemIcon>
            <ListItemText
              primary="Affiliates"
              sx={{
                color:
                  activeSubMenu === "Affiliates" ? "#6870fa" : colors.grey[100],
              }}
            />
          </ListItem>

          <ListItem
            button
            component={Link}
            to="/support"
            onClick={() => setActiveSubMenu("Support")}
            sx={{
              color: activeSubMenu === "Support" ? "#6870fa" : colors.grey[100],
              backgroundColor:
                activeSubMenu === "Support" ? colors.grey[900] : "transparent",
            }}
          >
            <ListItemIcon>
              <FaQuestionCircle
                className="text-red-500"
                // sx={{
                //   color:
                //     activeSubMenu === "Support" ? "#6870fa" : colors.grey[100],
                // }}
              />
            </ListItemIcon>
            <ListItemText
              primary="Support"
              sx={{
                color:
                  activeSubMenu === "Support" ? "#6870fa" : colors.grey[100],
              }}
            />
          </ListItem>

          <ListItem
            button
            component={Link}
            to="/settings"
            onClick={() => setActiveSubMenu("Settings")}
            sx={{
              color:
                activeSubMenu === "Settings" ? "#6870fa" : colors.grey[100],
              backgroundColor:
                activeSubMenu === "Settings" ? colors.grey[900] : "transparent",
            }}
          >
            <ListItemIcon>
              <FaCog
                sx={{
                  color:
                    activeSubMenu === "Settings" ? "#6870fa" : colors.grey[100],
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary="Settings"
              sx={{
                color:
                  activeSubMenu === "Settings" ? "#6870fa" : colors.grey[100],
              }}
            />
          </ListItem>

          <Typography
            variant="h6"
            color={colors.grey[300]}
            sx={{ m: "15px 0 5px 20px" }}
          >
            Data
          </Typography>

          <ListItemButton onClick={() => handleClick("bootCamp")}>
            <ListItemIcon>
              <FaChalkboardTeacher className="text-indigo-500" />
            </ListItemIcon>
            <ListItemText primary="BootCamp Team Training" />
            {openSections.bootCamp ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openSections.bootCamp} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {tutorTraining?.map((item) => (
                <ListItemButton
                  sx={{
                    pl: 4,
                    backgroundColor:
                      activeSubMenu === item.name ? "#e0e0e0" : "transparent",
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                    },
                  }}
                  button
                  component={Link}
                  to={item.path}
                  onClick={() => setActiveSubMenu(`${item.name}`)}
                >
                  <ListItemText primary={item.name} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>

          <ListItemButton onClick={() => handleClick("tutorBooking")}>
            <ListItemIcon>
              <FaCalendarCheck className="text-teal-500" />
            </ListItemIcon>
            <ListItemText primary="Tutor Booking" />
            {openSections.tutorBooking ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openSections.tutorBooking} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {tutorBooking?.map((item) => (
                <ListItemButton
                  sx={{
                    pl: 4,
                    backgroundColor:
                      activeSubMenu === item.name ? "#e0e0e0" : "transparent",
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                    },
                  }}
                  button
                  component={Link}
                  to={item.path}
                  onClick={() => setActiveSubMenu(`${item.name}`)}
                >
                  <ListItemText primary={item.name} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>

          <ListItemButton onClick={() => handleClick("enrollments")}>
            <ListItemIcon>
              <FaUsers className="text-yellow-600" />
            </ListItemIcon>
            <ListItemText primary="Enrollments" />
            {openSections.enrollments ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openSections.enrollments} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {enrollments?.map((item) => (
                <ListItemButton
                  sx={{
                    pl: 4,
                    backgroundColor:
                      activeSubMenu === item.name ? "#e0e0e0" : "transparent",
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                    },
                  }}
                  button
                  component={Link}
                  to={item.path}
                  onClick={() => setActiveSubMenu(`${item.name}`)}
                >
                  <ListItemText primary={item.name} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>

          <ListItemButton onClick={() => handleClick("reports")}>
            <ListItemIcon>
              <FaFileAlt className="text-gray-600" />
            </ListItemIcon>
            <ListItemText primary="Reports" />
            {openSections.reports ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openSections.reports} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {reports?.map((item) => (
                <ListItemButton
                  sx={{
                    pl: 4,
                    backgroundColor:
                      activeSubMenu === item.name ? "#e0e0e0" : "transparent",
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                    },
                  }}
                  button
                  component={Link}
                  to={item.path}
                  onClick={() => setActiveSubMenu(`${item.name}`)}
                >
                  <ListItemText primary={item.name} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>

          <ListItemButton onClick={() => handleClick("payments")}>
            <ListItemIcon>
              <FaCreditCard className="text-gray-500" />
            </ListItemIcon>
            <ListItemText primary="Offline Payment" />
            {openSections.payments ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openSections.payments} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {payments?.map((item) => (
                <ListItemButton
                  sx={{
                    pl: 4,
                    backgroundColor:
                      activeSubMenu === item.name ? "#e0e0e0" : "transparent",
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                    },
                  }}
                  button
                  component={Link}
                  to={item.path}
                  onClick={() => setActiveSubMenu(`${item.name}`)}
                >
                  <ListItemText primary={item.name} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>

          <ListItem
            button
            component={Link}
            to="/Message"
            onClick={() => setActiveSubMenu("Message")}
            sx={{
              color: activeSubMenu === "Message" ? "#6870fa" : colors.grey[100],
              backgroundColor:
                activeSubMenu === "Message" ? colors.grey[900] : "transparent",
            }}
          >
            <ListItemIcon>
              <FaComment
                sx={{
                  color:
                    activeSubMenu === "Message" ? "#6870fa" : colors.grey[100],
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary="Message"
              sx={{
                color:
                  activeSubMenu === "Message" ? "#6870fa" : colors.grey[100],
              }}
            />
          </ListItem>

          <ListItem
            button
            component={Link}
            to="/news-letter"
            onClick={() => setActiveSubMenu("News Letter")}
            sx={{
              color:
                activeSubMenu === "News Letter" ? "#6870fa" : colors.grey[100],
              backgroundColor:
                activeSubMenu === "News Letter"
                  ? colors.grey[900]
                  : "transparent",
            }}
          >
            <ListItemIcon>
              <FaNewspaper
                sx={{
                  color:
                    activeSubMenu === "News Letter"
                      ? "#6870fa"
                      : colors.grey[100],
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary="News Letter"
              sx={{
                color:
                  activeSubMenu === "News Letter"
                    ? "#6870fa"
                    : colors.grey[100],
              }}
            />
          </ListItem>

          <Typography
            variant="h6"
            color={colors.grey[300]}
            sx={{ m: "15px 0 5px 20px" }}
          >
            Pages
          </Typography>

          <ListItem
            button
            component={Link}
            to="/customer-support"
            onClick={() => setActiveSubMenu("Customer Support")}
            sx={{
              color:
                activeSubMenu === "Customer Support"
                  ? "#6870fa"
                  : colors.grey[100],
              backgroundColor:
                activeSubMenu === "Customer Support"
                  ? colors.grey[900]
                  : "transparent",
            }}
          >
            <ListItemIcon>
              <FaHeadset
                className="text-red-500"
                // sx={{
                //   color:
                //     activeSubMenu === "Customer Support"
                //       ? "#6870fa"
                //       : colors.grey[100],
                // }}
              />
            </ListItemIcon>
            <ListItemText
              primary="Customer Support"
              sx={{
                color:
                  activeSubMenu === "Customer Support"
                    ? "red"
                    : colors.grey[100],
              }}
            />
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
