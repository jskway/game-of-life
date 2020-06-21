import React from "react";

function Grid(props) {
  const { gridSize, cellSize } = props;
  return (
    <section>
      <div
        className="grid"
        style={{
          width: gridSize.width,
          height: gridSize.height,
          backgroundSize: `${cellSize}px ${cellSize}px`,
        }}
      ></div>
    </section>
  );
}

export default Grid;
