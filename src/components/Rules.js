import React from "react";

function Rules() {
  return (
    <section className="rules">
      <h2>Rules</h2>
      <ul>
        <li>Each cell can be 'live' or 'dead'</li>
        <li>
          Each cell interacts with its eight neighbors, which are the cells that
          are horizontally, vertically, and diagonally touching
        </li>
        <li>Any live cell with two OR three live neighbors survives</li>
        <li>Any dead cell with three live neighbors becomes a live cell</li>
        <li>
          All other live cells die in the next generation. Similarly, all other
          dead cells stay dead.
        </li>
        <li>Cells that are off the edge of the grid are assumed to be dead.</li>
      </ul>
    </section>
  );
}

export default Rules;
