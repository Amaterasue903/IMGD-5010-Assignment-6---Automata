//Makes the 2d array used to create the grid
function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

let grid;
let cols;
let rows;
let resolution = 10;

function setup() {
  createCanvas(600, 400);
  cols = width / resolution;
  rows = height / resolution;

  grid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      // Sets a random dead or alive state for each cell
      grid[i][j] = floor(random(2));
    }
  }
}

function draw() {
  background(0);

  // Draw the grid
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution;
      if (grid[i][j] == 1) {
        fill(255);
        stroke(0);
        rect(x, y, resolution - 1, resolution - 1);
      }
    }
  }

  //Stores the next state for the cells
  let next = make2DArray(cols, rows);

  // Apply the game of life to cells
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = grid[i][j];
      let neighbors = countNeighbors(grid, i, j);

      if (state == 0 && neighbors == 3) {
        next[i][j] = 1;  // Birth of a new cell
      } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
        next[i][j] = 0;  // Cell dies due to under/overpopulation
      } else {
        next[i][j] = state;  // Cell survives
      }
    }
  }

  grid = next;

  // Mouse interaction: turn squares alive when clicked or clicked and held down
  if (mouseIsPressed) {
    let i = floor(mouseX / resolution);
    let j = floor(mouseY / resolution);

    //Makes sure we only activate the clicked grid over the mouse
    if (i >= 0 && i < cols && j >= 0 && j < rows) {
      grid[i][j] = 1;  
    }
  }
}

// Count to check if cells are dead or alive around given cell
function countNeighbors(grid, x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + cols) % cols;  // Wrap around edges
      let row = (y + j + rows) % rows;  // Wrap around edges
      sum += grid[col][row];
    }
  }
  sum -= grid[x][y];  // Subtract the cell itself from the count
  return sum;
}