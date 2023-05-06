import React from "react";
import { MainNav } from "./components/layout/MainNav";
import "./styles/App.css";
import Dashboard from "./components/layout/Dashboard";
import { Route, Routes } from "react-router";
import { FacultyPage } from "./components/layout/FacultyPage";
import { CoursesPage } from "./components/layout/CoursesPage";
import { StudentsPage } from "./components/layout/StudentsPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainNav navItemOptions={[]} />}>
          <Route index element={<Dashboard />} />
          <Route path="faculty" element={<FacultyPage />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="students" element={<StudentsPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
