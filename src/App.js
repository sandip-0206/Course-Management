import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import { ColorModeContext, useMode } from "./theme";
import Affiliates from "./pages/affiliates";
import Ebooks from "./pages/eBook";
import ManageEnrollment from "./pages/enroll";
import PendingEnrollment from "./pages/pendingEnroll";
import Settings from "./pages/settings";
import TutorTraining from "./pages/tutorTraining";
import CourseList from "./components/CourseList";
import Dashboard from "./pages/dashboard";
import Sidebar from "./pages/global/Sidebar";
import ManageTutors from "./pages/manageTutors";
import Header from "./components/Header";
import Support from "./pages/support";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState("Dashboard");

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
            activeSubMenu={activeSubMenu}
            setActiveSubMenu={setActiveSubMenu}
          />
          <main className="content">
            <Header
              setIsSidebarOpen={setIsSidebarOpen}
              toggleSidebar={toggleSidebar}
              activeSubMenu={activeSubMenu}
              setActiveSubMenu={setActiveSubMenu}
            />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/affiliates" element={<Affiliates />} />
              <Route path="/course-management" element={<CourseList />} />
              <Route path="/ebooks" element={<Ebooks />} />
              <Route
                path="/manage-enrollments"
                element={<ManageEnrollment />}
              />
              <Route
                path="/pending-enrollments"
                element={<PendingEnrollment />}
              />
              <Route path="/settings" element={<Settings />} />
              <Route path="/tutor-training" element={<TutorTraining />} />
              <Route path="/manage-bookings" element={<ManageTutors />} />
              <Route path="/support" element={<Support />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
