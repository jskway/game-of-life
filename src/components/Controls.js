import React, { useContext, useState } from "react";
import { makeEmptyGrid, makeRandomGrid, getNeighborCount, makePresetGrid } from "../helpers.js";
import GridContext from "../contexts/gridContext.js";
import CellContext from "../contexts/cellContext.js";
import { getLiveCells } from "../helpers.js";

function Controls({ isRunning, setIsRunning, rows, cols, setGeneration }) {
  const { grid, setGrid } = useContext(GridContext);
  const { setLiveCells } = useContext(CellContext);
  const [timeoutId, setTimeoutId] = useState(null);
  const [ preset, setPreset ] = useState("none");
  const [ interval, setInterval ] = useState(500);

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
        const gliderGrid = makePresetGrid(rows, cols, "glider");
        setGrid(gliderGrid);
        setLiveCells(getLiveCells(rows, cols, gliderGrid));
        break;
      case "exploder":
        const exploderGrid = makePresetGrid(rows, cols, "exploder");
        setGrid(exploderGrid);
        setLiveCells(getLiveCells(rows, cols, exploderGrid));
        break;
      case "none":
        setGrid(makeEmptyGrid());
        break;
      default:
        setGrid(makeEmptyGrid());
    }
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
    }, interval);

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
          <option value="exploder">Exploder</option>
        </select>
      </div>
    </section>
  );
}

export default Controls;
