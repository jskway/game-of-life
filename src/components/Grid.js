import React, { useState } from "react";
import Cell from "./Cell.js";
import { makeCells, getGridOffset } from "../helpers.js";

function Grid({ rows, cols, cellSize, grid }, ref) {
  const [cells, setCells] = useState([]);

  const handleClick = (e) => {
    const gridOffset = getGridOffset(ref);
    // MouseEvent.clientX/Y returns
    // The horizontal and vertical coordinates within the App component
    // where the mouse was clicked

    // How many pixels from the left of the Grid the mouse click event occured
    const offsetX = e.clientX - gridOffset.x;

    // How many pixels from the top of the Grid the mouse click event occured
    const offsetY = e.clientY - gridOffset.y;

    // Get the x and y indexes of the cell that was clicked
    const x = Math.floor(offsetX / cellSize);
    const y = Math.floor(offsetY / cellSize);

    // If x and y are within bounds of the grid, toggle the state of that cell
    if (x >= 0 && x <= cols && y >= 0 && y <= rows) {
      grid[y][x] = !grid[y][x];
    }

    // Update the state of the cells based on the updated grid
    setCells(makeCells(rows, cols, grid));
  };

  return (
    <section>
      <div
        onClick={handleClick}
        ref={ref}
        className="grid"
        style={{
          width: cols * cellSize,
          height: rows * cellSize,
          backgroundSize: `${cellSize}px ${cellSize}px`,
        }}
      >
        {cells.map((cell) => (
          <Cell
            className="cell"
            cellSize={cellSize}
            x={cell.x}
            y={cell.y}
            key={`${cell.x}, ${cell.y}`}
          />
        ))}
      </div>
    </section>
  );
}

const forwardedGrid = React.forwardRef(Grid);

export default forwardedGrid;
