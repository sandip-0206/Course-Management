import { useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Collapse,
} from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { FaHome } from "react-icons/fa";
import { ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material";

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const subItems = [
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
  return (
    <Box
      sx={{
        display: "flex",
        background: colors.primary[400],
        height: "100vh",
        width: isCollapsed ? "60px" : "250px",
        transition: "width 0.3s",
      }}
    >
      {/* Sidebar Drawer */}
      <Drawer
        variant="permanent"
        open={true}
        sx={{
          width: isCollapsed ? "60px" : "250px",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: isCollapsed ? "60px" : "250px",
            backgroundColor: colors.primary[400],
            color: colors.grey[100],
            transition: "width 0.3s",
          },
        }}
      >
        {/* Logo and Menu Icon */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            padding: "10px",
            borderBottom: "1px solid",
            borderColor: colors.grey[500],
          }}
        >
          <Typography
            variant="h3"
            color={colors.grey[100]}
            sx={{ display: isCollapsed ? "none" : "block" }}
          >
            Educa
          </Typography>
          <IconButton onClick={handleCollapse} color="inherit">
            <HiX
              className="text-2xl cursor-pointer text-gray-500 hover:text-red-500 lg:hidden"
              onClick={toggleSidebar}
            />
          </IconButton>
        </Box>

        {/* Profile Section */}
        {/* {!isCollapsed && (
          <Box mb="25px" textAlign="center">
            <img
              alt="profile-user"
              width="100px"
              height="100px"
              src={`../../assets/user.png`}
              style={{ cursor: "pointer", borderRadius: "50%" }}
            />
            <Typography
              variant="h2"
              color={colors.grey[100]}
              fontWeight="bold"
              sx={{ m: "10px 0 0 0" }}
            >
              Ed Roh
            </Typography>
            <Typography variant="h5" color={colors.greenAccent[500]}>
              VP Fancy Admin
            </Typography>
          </Box>
        )} */}

        {/* Menu Items */}
        <List>
          <ListItem
            button
            component={Link}
            to="/"
            onClick={() => setSelected("Dashboard")}
          >
            <ListItemIcon>
              <FaHome
                sx={{
                  color:
                    selected === "Dashboard" ? "#6870fa" : colors.grey[100],
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary="Dashboard"
              sx={{
                color: selected === "Dashboard" ? "#6870fa" : colors.grey[100],
              }}
            />
          </ListItem>

          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <FaBook />
            </ListItemIcon>
            <ListItemText primary="Courses" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {subItems?.map((item) => (
                <ListItemButton
                  sx={{ pl: 4 }}
                  button
                  component={Link}
                  to={item.path}
                  onClick={() => setSelected(`${item.name}`)}
                >
                  {/* <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon> */}
                  <ListItemText primary={item.name} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>

          <ListItem
            button
            component={Link}
            to="/tutor-training"
            onClick={() => setSelected("Tutor Training")}
          >
            <ListItemIcon>
              <FaUser
                sx={{
                  color:
                    selected === "Tutor Training"
                      ? "#6870fa"
                      : colors.grey[100],
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary="Tutor Training"
              sx={{
                color:
                  selected === "Tutor Training" ? "#6870fa" : colors.grey[100],
              }}
            />
          </ListItem>

          <ListItem
            button
            component={Link}
            to="/ebooks"
            onClick={() => setSelected("Ebooks")}
          >
            <ListItemIcon>
              <FaBook
                sx={{
                  color: selected === "Ebooks" ? "#6870fa" : colors.grey[100],
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary="Ebooks"
              sx={{
                color: selected === "Ebooks" ? "#6870fa" : colors.grey[100],
              }}
            />
          </ListItem>

          <ListItem
            button
            component={Link}
            to="/affiliates"
            onClick={() => setSelected("Affiliates")}
          >
            <ListItemIcon>
              <FaTag
                sx={{
                  color:
                    selected === "Affiliates" ? "#6870fa" : colors.grey[100],
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary="Affiliates"
              sx={{
                color: selected === "Affiliates" ? "#6870fa" : colors.grey[100],
              }}
            />
          </ListItem>

          <ListItem
            button
            component={Link}
            to="/support"
            onClick={() => setSelected("Support")}
          >
            <ListItemIcon>
              <FaQuestionCircle
                sx={{
                  color: selected === "Support" ? "#6870fa" : colors.grey[100],
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary="Support"
              sx={{
                color: selected === "Support" ? "#6870fa" : colors.grey[100],
              }}
            />
          </ListItem>

          <ListItem
            button
            component={Link}
            to="/settings"
            onClick={() => setSelected("Settings")}
          >
            <ListItemIcon>
              <FaCog
                sx={{
                  color: selected === "Settings" ? "#6870fa" : colors.grey[100],
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary="Settings"
              sx={{
                color: selected === "Settings" ? "#6870fa" : colors.grey[100],
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

          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <FaChalkboardTeacher />
            </ListItemIcon>
            <ListItemText primary="BootCamp Team Training" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {tutorTraining?.map((item) => (
                <ListItemButton
                  sx={{ pl: 4 }}
                  button
                  component={Link}
                  to={item.path}
                  onClick={() => setSelected(`${item.name}`)}
                >
                  {/* <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon> */}
                  <ListItemText primary={item.name} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>

          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <FaCalendarCheck />
            </ListItemIcon>
            <ListItemText primary="Tutor Booking" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {tutorBooking?.map((item) => (
                <ListItemButton
                  sx={{ pl: 4 }}
                  button
                  component={Link}
                  to={item.path}
                  onClick={() => setSelected(`${item.name}`)}
                >
                  {/* <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon> */}
                  <ListItemText primary={item.name} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>

          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <FaUsers />
            </ListItemIcon>
            <ListItemText primary="Enrollments" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {enrollments?.map((item) => (
                <ListItemButton
                  sx={{ pl: 4 }}
                  button
                  component={Link}
                  to={item.path}
                  onClick={() => setSelected(`${item.name}`)}
                >
                  {/* <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon> */}
                  <ListItemText primary={item.name} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>

          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <FaFileAlt />
            </ListItemIcon>
            <ListItemText primary="Reports" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {reports?.map((item) => (
                <ListItemButton
                  sx={{ pl: 4 }}
                  button
                  component={Link}
                  to={item.path}
                  onClick={() => setSelected(`${item.name}`)}
                >
                  {/* <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon> */}
                  <ListItemText primary={item.name} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>

          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <FaCreditCard />
            </ListItemIcon>
            <ListItemText primary="Offline Payment" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {payments?.map((item) => (
                <ListItemButton
                  sx={{ pl: 4 }}
                  button
                  component={Link}
                  to={item.path}
                  onClick={() => setSelected(`${item.name}`)}
                >
                  {/* <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon> */}
                  <ListItemText primary={item.name} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>

          <ListItem
            button
            component={Link}
            to="/Message"
            onClick={() => setSelected("Message")}
          >
            <ListItemIcon>
              <FaComment
                sx={{
                  color: selected === "Message" ? "#6870fa" : colors.grey[100],
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary="Message"
              sx={{
                color: selected === "Message" ? "#6870fa" : colors.grey[100],
              }}
            />
          </ListItem>

          <ListItem
            button
            component={Link}
            to="/news-letter"
            onClick={() => setSelected("NewsLetter")}
          >
            <ListItemIcon>
              <FaNewspaper
                sx={{
                  color:
                    selected === "NewsLetter" ? "#6870fa" : colors.grey[100],
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary="NewsLetter"
              sx={{
                color: selected === "NewsLetter" ? "#6870fa" : colors.grey[100],
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
            onClick={() => setSelected("Customer Support")}
          >
            <ListItemIcon>
              <FaHeadset
                sx={{
                  color:
                    selected === "Customer Support"
                      ? "#6870fa"
                      : colors.grey[100],
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary="Customer Support"
              sx={{
                color:
                  selected === "Customer Support"
                    ? "#6870fa"
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
