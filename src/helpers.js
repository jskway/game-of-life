// Returns an array filled with (rows-1) nested arrays
// Each nested array will have (cols-1) falses
export const makeGrid = (rows, cols) => {
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
export const makeCells = (rows, cols, grid) => {
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

export const getGridOffset = (gridRef) => {
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
