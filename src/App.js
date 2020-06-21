import React, { useState } from "react";
import "./App.css";
import Grid from "./components/Grid.js";
import Controls from "./components/Controls.js";
import About from "./components/About.js";

function App() {
  const [gridSize, setGridSize] = useState({
    width: 500,
    height: 500,
  });

  const [cellSize, setCellSize] = useState(20);

  return (
    <div className="App">
      <header>
        <h1>Conway's Game of Life </h1>
      </header>
      <About />
      <Grid gridSize={gridSize} cellSize={cellSize} />
      <Controls />
    </div>
  );
}

export default App;
