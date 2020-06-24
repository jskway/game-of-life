import React, { useContext, useState } from "react";
import { makeEmptyGrid, getNeighborCount } from "../helpers.js";
import GridContext from "../contexts/gridContext.js";
import CellContext from "../contexts/cellContext.js";
import { getLiveCells } from "../helpers.js";

function Controls({ isRunning, setIsRunning, rows, cols, setGeneration }) {
  const { grid, setGrid } = useContext(GridContext);
  const { setLiveCells } = useContext(CellContext);
  const [timeoutId, setTimeoutId] = useState(null);

  const start = () => {
    setIsRunning(true);
    makeNewGenerations(grid, cols, rows);
  };

  const stop = () => {
    clearTimeout(timeoutId);
    setTimeoutId(null);
    setIsRunning(false);
  };

  const next = () => {
    makeGenerationOnce(grid, cols, rows);
  };

  const clear = () => {
    const emptyGrid = makeEmptyGrid(rows, cols);
    setGrid(emptyGrid);
    setLiveCells(getLiveCells(rows, cols, emptyGrid));
    setGeneration(0);
  };

  const makeGenerationOnce = (grid, cols, rows) => {
    const newGrid = makeEmptyGrid(rows, cols);

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        let neighbors = getNeighborCount(grid, x, y, cols, rows);

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
    setGeneration((prevGen) => prevGen + 1);
  };

  const makeNewGenerations = (grid, cols, rows) => {
    const newGrid = makeEmptyGrid(rows, cols);

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        let neighbors = getNeighborCount(grid, x, y, cols, rows);

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
    setGeneration((prevGen) => prevGen + 1);

    const id = setTimeout(() => {
      makeNewGenerations(newGrid, cols, rows);
    }, 1000);

    setTimeoutId(id);
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
        <button onClick={clear}>Clear</button>
      </div>
    </section>
  );
}

export default Controls;
