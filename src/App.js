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
import GithubLogo from "./assets/GitHub-Mark-64px.png";

function App() {
  let height, width;
  if (window.innerWidth > 768) {
    height = 600;
    width = 800;
  } else if (window.innerWidth < 768 && window.innerWidth > 500) {
    height = 500;
    width = 500;
  } else {
    height = 300;
    width = 300;
  }

  const [gridSize, setGridSize] = useState({
    cellSize: 20,
    height,
    width,
  });

  const rows = gridSize.height / gridSize.cellSize;
  const cols = gridSize.width / gridSize.cellSize;
  const midPoint = {
    y: Math.floor(rows / 2),
    x: Math.floor(cols / 2),
  };

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
      <Rules />
      <SizeContext.Provider value={{ gridSize, setGridSize }}>
        <GridContext.Provider value={{ grid, setGrid }}>
          <CellContext.Provider value={{ liveCells, setLiveCells }}>
            <Grid ref={gridRef} cols={cols} rows={rows} isRunning={isRunning} />
            <div className="generation">Generation: {generation}</div>
            <Controls
              isRunning={isRunning}
              setIsRunning={setIsRunning}
              cols={cols}
              rows={rows}
              setGeneration={setGeneration}
              midPoint={midPoint}
            />
          </CellContext.Provider>
        </GridContext.Provider>
      </SizeContext.Provider>
      <footer>
        <a href="https://github.com/jskway/game-of-life">
          <img src={GithubLogo} alt="Github logo" />
        </a>
        <p>Designed & Developed by Jack Kim</p>
      </footer>
    </div>
  );
}

export default App;
