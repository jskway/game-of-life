import React, { useContext, useState } from "react";
import { makeEmptyGrid, makeRandomGrid, getNeighborCount } from "../helpers.js";
import GridContext from "../contexts/gridContext.js";
import CellContext from "../contexts/cellContext.js";
import { getLiveCells } from "../helpers.js";

function Controls({ isRunning, setIsRunning, rows, cols, setGeneration }) {
  const { grid, setGrid } = useContext(GridContext);
  const { setLiveCells } = useContext(CellContext);
  const [timeoutId, setTimeoutId] = useState(null);
  const [ preset, setPreset ] = useState("none");

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
    setGeneration((gen) => gen + 1);
  };

  const clear = () => {
    const emptyGrid = makeEmptyGrid(rows, cols);
    setGrid(emptyGrid);
    setLiveCells(getLiveCells(rows, cols, emptyGrid));
    setGeneration(0);
    setPreset("none");
  };

  const random = () => {
    const randomGrid = makeRandomGrid(rows, cols);
    setGrid(randomGrid);
    setLiveCells(getLiveCells(rows, cols, randomGrid));
  };

  const changePreset = (e) => {
    const preset = e.target.value
    setPreset(preset);

    switch(preset){
      case "glider":
        const gliderGrid = makeGliderGrid();
        setGrid(gliderGrid);
        setLiveCells(getLiveCells( rows, cols, gliderGrid));
        break;
      case "none":
        setGrid(makeEmptyGrid());
        break;
      default:
        setGrid(makeEmptyGrid());
    }
  };

  const makeGliderGrid = () => {
    const gliderGrid = makeEmptyGrid(rows, cols);
    const gliderCoordinates = [
      {x: 12, y: 11},
      {x: 13, y: 12},
      {x: 13, y: 13},
      {x: 12, y: 13},
      {x: 11, y: 13}
    ];

    gliderCoordinates.forEach(coordinate => {
      // y comes first because it represents the row
      // x represents the column
      // The empty grid is initialized in the same manner
      gliderGrid[coordinate.y][coordinate.x] = true;
    });

    return gliderGrid;
  }

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
    setGeneration((gen) => gen + 1);

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
        <button disabled={isRunning ? true : false} onClick={next}>Next</button>
        <button disabled={isRunning ? true : false} onClick={clear}>Clear</button>
        <button disabled={isRunning ? true : false} onClick={random}>Random</button>
        <select disabled={isRunning ? true : false} onChange={changePreset} value={preset}>
          <option value="none">Select a Sample Configuration</option>
          <option value="glider">Glider</option>
        </select>
      </div>
    </section>
  );
}

export default Controls;
