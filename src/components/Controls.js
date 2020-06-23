import React, { useContext, useState } from "react";
import { makeEmptyGrid, getNeighborCount } from "../helpers.js";
import GridContext from "../contexts/gridContext.js";
import CellContext from "../contexts/cellContext.js";
import { getLiveCells } from "../helpers.js";

function Controls({ isRunning, setIsRunning, rows, cols }) {
  const [timeoutHandler, setTimeoutHandler] = useState(null);

  const { grid, setGrid } = useContext(GridContext);
  const { setLiveCells } = useContext(CellContext);

  const start = () => {
    setIsRunning(true);
    makeNewGeneration(timeoutHandler, cols, rows);
  };

  const stop = () => {
    setIsRunning(false);
    if (timeoutHandler) {
      window.clearTimeout(timeoutHandler);
      setTimeoutHandler(null);
    }
  };

  const next = () => {
    makeNewGeneration(timeoutHandler, cols, rows);
  };

  const makeNewGeneration = (timeoutHandler, cols, rows) => {
    const newGrid = makeEmptyGrid(rows, cols);

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        let neighbors = getNeighborCount(grid, x, y, cols, rows);
        console.log(neighbors);
        if (grid[y][x]) {
          if (neighbors === 2 || neighbors === 3) {
            newGrid[y][x] = true;
          } else {
            newGrid[y][x] = false;
          }
        } else {
          if (!grid[y][x] && neighbors === 3) {
            newGrid[y][x] = true;
          }
        }
      }
    }

    setGrid(newGrid);
    setLiveCells(getLiveCells(rows, cols, newGrid));

    //setTimeoutHandler(
    //  window.setTimeout(() => {
    //    makeNewGeneration(timeoutHandler);
    //  }, 1000)
    //);

    //timeoutHandler = window.setTimeout(() => {
    //  makeNewGeneration(timeoutHandler);
    //}, 1000);
  };

  return (
    <section>
      <h3>Controls</h3>
      <div>
        {isRunning ? (
          <button onClick={stop}>Stop</button>
        ) : (
          <button onClick={start}>Start</button>
        )}
        <button onClick={next}>Next</button>
      </div>
    </section>
  );
}

export default Controls;
