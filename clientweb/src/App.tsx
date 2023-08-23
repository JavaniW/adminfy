import "./styles/App.css";
import "react-toastify/dist/ReactToastify.css";

import React from "react";
import { Route, Routes } from "react-router";

import { CoursesPage } from "./components/layout/CoursesPage";
import Dashboard from "./components/layout/Dashboard";
import { TeachersPage } from "./components/layout/TeachersPage";
import { AdminfyNav } from "./components/layout/AdminfyNav";
import { StudentsPage } from "./components/layout/StudentsPage";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AdminfyNav navItemOptions={[]} />}>
          <Route index element={<Dashboard />} />
          <Route path="teachers" element={<TeachersPage />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="students" element={<StudentsPage />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
