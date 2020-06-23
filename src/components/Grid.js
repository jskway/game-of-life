import React, { useContext } from "react";
import Cell from "./Cell.js";
import { getLiveCells, getGridOffset } from "../helpers.js";
import GridContext from "../contexts/gridContext.js";
import SizeContext from "../contexts/sizeContext.js";
import CellContext from "../contexts/cellContext.js";

function Grid({ rows, cols }, ref) {
  const { liveCells, setLiveCells } = useContext(CellContext);

  const { grid, setGrid } = useContext(GridContext);
  const { gridSize } = useContext(SizeContext);

  const { cellSize, height, width } = gridSize;

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
    setLiveCells(getLiveCells(rows, cols, grid));
  };

  return (
    <section>
      <div
        onClick={handleClick}
        ref={ref}
        className="grid"
        style={{
          width,
          height,
          backgroundSize: `${cellSize}px ${cellSize}px`,
        }}
      >
        {liveCells.map((cell) => (
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
