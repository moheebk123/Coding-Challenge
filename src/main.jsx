import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import OtpForm from "./pages/OtpForm.jsx";
import CourseList from "./pages/CourseList.jsx";
import Batches from "./pages/Batches.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/otp-form", element: <OtpForm /> },
      { path: "/course-list", element: <CourseList /> },
      { path: "/batches", element: <Batches /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
