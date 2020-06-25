import React, { useState, createRef } from "react";
import "./App.css";
import Grid from "./components/Grid.js";
import Controls from "./components/Controls.js";
import About from "./components/About.js";
import Rules from "./components/Rules.js";
import { makeEmptyGrid } from "./helpers.js";
import GridContext from "./contexts/gridContext.js";
import SizeContext from "./contexts/sizeContext.js";
import CellContext from "./contexts/cellContext.js";

function App() {
  const [gridSize, setGridSize] = useState({
    cellSize: 20,
    height: 500,
    width: 500,
  });
  const rows = gridSize.height / gridSize.cellSize;
  const cols = gridSize.width / gridSize.cellSize;

  const [grid, setGrid] = useState(makeEmptyGrid(rows, cols));

  const [liveCells, setLiveCells] = useState([]);

  const [isRunning, setIsRunning] = useState(false);
  const [generation, setGeneration] = useState(0);

  const gridRef = createRef();

  return (
    <div className="App">
      <header>
        <h1>Conway's Game of Life </h1>
      </header>
      <About />
      <SizeContext.Provider value={{ gridSize, setGridSize }}>
        <GridContext.Provider value={{ grid, setGrid }}>
          <CellContext.Provider value={{ liveCells, setLiveCells }}>
            <Grid ref={gridRef} cols={cols} rows={rows} />
            <div
              style={{
                margin: "20px auto",
              }}
            >
              Generation: {generation}
            </div>
            <Controls
              isRunning={isRunning}
              setIsRunning={setIsRunning}
              cols={cols}
              rows={rows}
              setGeneration={setGeneration}
            />
            <Rules />
          </CellContext.Provider>
        </GridContext.Provider>
      </SizeContext.Provider>
    </div>
  );
}

export default App;
