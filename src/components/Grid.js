import React, { useState } from "react";
import Cell from "./Cell.js";

// Returns an array filled with (rows-1) nested arrays
// Each nested array will have (cols-1) falses
const makeGrid = (rows, cols) => {
  let grid = [];
  for (let y = 0; y < rows; y++) {
    grid[y] = [];
    for (let x = 0; x < cols; x++) {
      grid[y][x] = false;
    }
  }

  return grid;
};

// Returns an array of objects
// Each object represents a cell that is 'alive'
// and holds it's x, y grid index
const makeCells = (rows, cols, grid) => {
  let cells = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x]) {
        cells.push({ x, y });
      }
    }
  }
  return cells;
};

//
const getGridOffset = (gridRef) => {
  // gridRef.current is a reference to our Grid on the DOM
  // .getBoundingClientRect() returns an object with the following properties:
  // top: distance from the top of the viewport
  // right: "" right of the viewport
  // bottom: "" bottom of the viewport
  // left: "" left of the viewport
  // width: width of the grid
  // height: height of the grid
  // x: == to this.left
  // y: == to this.top
  const rect = gridRef.current.getBoundingClientRect();

  // window.page[ X || Y ]Offset returns
  // A number representing the number of pixels that the document has already been scrolled from the upper left corner of the window, horizontally and vertically

  return {
    // Grid's distance from the left of the viewport + how far right the user has scrolled
    x: rect.left + window.pageXOffset,
    // Grid's distance from the top of the viewport + how far down the user has scrolled
    y: rect.top + window.pageYOffset,
  };
};

function Grid({ gridSize, cellSize }, ref) {
  const rows = gridSize.height / cellSize;
  const cols = gridSize.width / cellSize;

  const [cells, setCells] = useState([]);
  const [grid, setGrid] = useState(makeGrid(rows, cols));

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
      setGrid([...grid, (grid[y][x] = !grid[y][x])]);
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
          width: gridSize.width,
          height: gridSize.height,
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
