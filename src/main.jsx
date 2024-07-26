import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from './App.jsx'
import './index.css'
import OtpForm from './pages/otp-form/OtpForm.jsx';
import CourseList from './pages/course-list/CourseList.jsx';
import Batches from './pages/batches/Batches.jsx';

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
