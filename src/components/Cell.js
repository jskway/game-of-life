import React from "react";

function Cell({ x, y, cellSize }) {
  return (
    // div.cell has a position of absolute
    // +1 and -1 pixel adjusts are for aligning the cells within the grid borders

    <div
      className="cell"
      style={{
        left: `${cellSize * x + 1}px`,
        top: `${cellSize * y + 1}px`,
        width: `${cellSize - 1}px`,
        height: `${cellSize - 1}px`,
      }}
    ></div>
  );
}

export default Cell;
