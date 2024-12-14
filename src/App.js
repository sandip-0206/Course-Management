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
import Modal from "./components/Modal"; // Import Modal
import BootcampManagement from "./pages/manageBootcamp/ManageBootcamp";
import TrainerEnrollment from "./pages/trainerEnrollment";
import TutorManagement from "./pages/tutorsBooking";
import TutorBookingHistory from "./pages/tutorsBookingHistory";
import InstructorReports from "./pages/reports/InstructorReports";
import StudentProgressReports from "./pages/reports/StudentReport";
import Message from "./pages/message/Message";
import Newsletter from "./pages/newsLetter/NewsLetter";
import CustomerSupport from "./pages/customerSupport/CustomerSupport";
import CashPayment from "./pages/offlinePayment/Cash";
import ChequePayment from "./pages/offlinePayment/Cheque";
import MobilePayment from "./pages/offlinePayment/MobilePayment";
import PaymentSystem from "./pages/offlinePayment/PaymentSystem";
import PaymentHistory from "./pages/offlinePayment/PaymentHistory";
import FrontendConfig from "./pages/newFrontendConfig";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileEditable, setIsProfileEditable] = useState(false);
  const [checked, setChecked] = useState(true);
  const [activeSubMenu, setActiveSubMenu] = useState("Dashboard");

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const handleProfileEditToggle = () => {
    setIsProfileEditable((prev) => !prev);
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div
          className={`app ${
            isProfileEditable ? "bg-black bg-opacity-50" : "transparent"
          }`}
        >
          {/* Overlay */}
          {/* {isProfileEditable && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
          )} */}

          {/* Sidebar */}
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
            activeSubMenu={activeSubMenu}
            setActiveSubMenu={setActiveSubMenu}
            isProfileEditable={isProfileEditable}
          />

          {/* Main Content */}
          <main className="content relative z-50">
            <Header
              setIsSidebarOpen={setIsSidebarOpen}
              toggleSidebar={toggleSidebar}
              activeSubMenu={activeSubMenu}
              setActiveSubMenu={setActiveSubMenu}
              handleProfileEditToggle={handleProfileEditToggle}
              isProfileEditable={isProfileEditable}
              checked={checked}
              setChecked={setChecked}
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
              <Route
                path="/settings"
                element={
                  <Settings
                    isProfileEditable={isProfileEditable}
                    handleProfileEditToggle={handleProfileEditToggle}
                    checked={checked}
                    setChecked={setChecked}
                  />
                }
              />
              <Route path="/tutor-training" element={<TutorTraining />} />
              <Route path="/manage-bookings" element={<TutorManagement />} />
              <Route
                path="/booking-history"
                element={<TutorBookingHistory />}
              />
              <Route path="/support" element={<Support />} />
              <Route
                path="/bootcamp-management"
                element={<BootcampManagement />}
              />
              <Route
                path="/trainer-enrollment"
                element={<TrainerEnrollment />}
              />
              <Route
                path="/instructor-reports"
                element={<InstructorReports />}
              />
              <Route
                path="/student-reports"
                element={<StudentProgressReports />}
              />
              <Route path="/message" element={<Message />} />
              <Route path="/payment-system" element={<PaymentSystem />} />
              <Route path="/payment-history" element={<PaymentHistory />} />
              {/* <Route path="/cash" element={<CashPayment />} />
              <Route path="/cheque" element={<ChequePayment />} />
              <Route path="/mobile-payment" element={<MobilePayment />} /> */}
              <Route path="/news-letter" element={<Newsletter />} />
              <Route path="/customer-support" element={<CustomerSupport />} />
              <Route path="/frontend-config" element={<FrontendConfig />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
