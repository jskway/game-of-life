import React, { useState, createRef } from "react";
import "./App.css";
import Grid from "./components/Grid.js";
import Controls from "./components/Controls.js";
import About from "./components/About.js";
import { makeGrid } from "./helpers.js";

function App() {
  const [gridSize, setGridSize] = useState({
    width: 500,
    height: 500,
  });
  const [cellSize, setCellSize] = useState(20);
  const [isRunning, setIsRunning] = useState(false);
  const gridRef = createRef();

  const rows = gridSize.height / cellSize;
  const cols = gridSize.width / cellSize;

  const gridBuffer = makeGrid(rows, cols);

  return (
    <div className="App">
      <header>
        <h1>Conway's Game of Life </h1>
      </header>
      <About />
      <Grid
        ref={gridRef}
        rows={rows}
        cols={cols}
        cellSize={cellSize}
        grid={gridBuffer}
      />
      <Controls isRunning={isRunning} setIsRunning={setIsRunning} />
    </div>
  );
}

export default App;
