import React from "react";
import { MainNav } from "./MainNav";
import "./styles/App.css";
import Dashboard from "./Dashboard";

function App() {
  return (
    <div className="App">
      <MainNav navItemOptions={["howdy"]} />
      <Dashboard />
    </div>
  );
}

export default App;
