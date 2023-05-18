import "./styles/App.css";

import React from "react";
import { Route, Routes } from "react-router";

import { CoursesPage } from "./components/layout/CoursesPage";
import Dashboard from "./components/layout/Dashboard";
import { TeachersPage } from "./components/layout/TeachersPage";
import { MainNav } from "./components/layout/MainNav";
import { StudentsPage } from "./components/layout/StudentsPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainNav navItemOptions={[]} />}>
          <Route index element={<Dashboard />} />
          <Route path="teacher" element={<TeachersPage />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="students" element={<StudentsPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
