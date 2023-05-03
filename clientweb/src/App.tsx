import React from "react";
import { MainNav } from "./MainNav";
import "./styles/App.css";
import Dashboard from "./Dashboard";
import { Route, Routes } from "react-router";
import { FacultyPage } from "./FacultyPage";
import { CoursesPage } from "./CoursesPage";
import { StudentsPage } from "./StudentsPage";

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
