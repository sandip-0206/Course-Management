// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
// import { BrowserRouter, Routes, Route } from "react-router";
// import Dashboard from "./routeComponents/dashboard";
// // import Settings from './routeComponents/settings';
// import Set1 from "./routeComponents/set1";
// import Enroll1 from "./routeComponents/enroll1";
// import PendingEnroll1 from "./routeComponents/pendingEnroll1";
// import EBook1 from "./routeComponents/eBook1";
// import TutorTraining1 from "./routeComponents/tutorTraining1";
// import Affiliates1 from "./routeComponents/affiliates1";
// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <BrowserRouter>
//     <Routes>
//       <Route path="/course-management" element={<App />} />
//       <Route path="/dashboard" element={<Dashboard />} />
//       <Route path="/settings" element={<Set1 />} />
//       <Route path="/manage-enrollments" element={<Enroll1 />} />
//       <Route path="/pending-enrollments" element={<PendingEnroll1 />} />
//       <Route path="/ebooks" element={<EBook1 />} />
//       <Route path="/tutor-training" element={<TutorTraining1 />} />
//       <Route path="/affiliates" element={<Affiliates1 />} />
//       {/* <Route path="/course-category" element={<CourseCategory />} /> */}
//     </Routes>
//   </BrowserRouter>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
