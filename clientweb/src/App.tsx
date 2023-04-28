import React from "react";
import { MainNav } from "./MainNav";
import "./styles/App.css";

function App() {
  return (
    <div className="App">
      <MainNav navItemOptions={["howdy"]} />
    </div>
  );
}

export default App;
