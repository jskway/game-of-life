import React from "react";
import "./App.css";
import Grid from "./components/Grid.js";
import Controls from "./components/Controls.js";
import About from "./components/About.js";

function App() {
  return (
    <div className="App">
      <header>
        <h1>Conway's Game of Life </h1>
      </header>
      <About />
      <Grid />
      <Controls />
    </div>
  );
}

export default App;
