import Cell from "./objects/Cell.js";
import Belt from "./objects/Belt.js";
import Miner from "./objects/Miner.js";
import Chest from "./objects/Chest.js";

const canvas = document.querySelector("canvas");
const items = [...document.querySelectorAll(".item")];

canvas.width = 900;
canvas.height = 900;

let grid = [];
const gridSize = 10;
const cellSize = 90;
let itemSelected = {
  selected: "Miner",
  direction: "right",
};

const delay = (t) => new Promise((res) => setTimeout(res, t * 1000));

const initGrid = () => {
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const x = i;
      const y = j;
      let color;
      x == 0 && y == 0 ? (color = "red") : (color = "black");
      const newCell = new Cell(x, y, cellSize, color);
      grid.push(newCell);
    }
  }
};

const drawGrid = () => {
  for (let i = 0; i < grid.length; i++) {
    grid[i].draw();
  }
};

// const pass = async () => {
//   for (let i = 0; i < grid.length; i++) {
//     if (grid[i].isEmpty()) continue;
//     const direction = grid[i].item.direction;

//     for (let j = 0; j < grid.length; j++) {
//       if (grid[j].isEmpty()) continue;
//       let x = 0;
//       let y = 0;
//       if (direction == "right") x = -1;
//       else if (direction == "bottom") y = -1;
//       else if (direction == "left") x = 1;
//       else if (direction == "up") y = 1;

//       if ((grid[i].x == grid[j].x + x && grid[i].y == grid[j].y + y && grid[j].item.name == "belt") || grid[j].item.name == "chest") {
//         if (grid[j].item.isFull()) continue;
//         if (grid[i].item.count <= 0) continue;

//         await delay(1);
//         grid[i].item.count--;
//         grid[j].item.count++;
//       }
//     }
//   }
// };

// const pass = async () => {
//   for (let i = 0; i < grid.length; i++) {
//     if (!grid[i].item) continue;
//     if (grid[i].item.count <= 0) continue;

//     for (let j = 0; j < grid.length; j++) {
//       if (!grid[j].item) continue;
//       // if (grid[j].item.name != "belt") continue;

//       if (grid[i].x == grid[j].x - 1 && grid[i].y == grid[j].y) {
//         if (grid[j].item.count >= grid[j].item.capacity) continue;

//         await delay(0.5);
//         grid[i].item.count--;
//         grid[j].item.count++;
//       }
//     }
//   }
// };

// setInterval(() => {
//   pass();
// }, 1000);

const gameLoop = () => {
  drawGrid();
  // pass();

  requestAnimationFrame(gameLoop);
};

const init = () => {
  initGrid();
  gameLoop();
};
init();

const scanForOutput = (from) => {
  for (let i = 0; i < grid.length; i++) {
    if (grid[i].isEmpty()) continue;

    let direction = from.item.direction;

    let x = 0;
    let y = 0;
    if (direction == "right") x = 1;
    else if (direction == "bottom") y = 1;
    else if (direction == "left") x = -1;
    else if (direction == "up") y = -1;

    if (from.x == grid[i].x + x && from.y == grid[i].y + y) {
      console.log("from");
      console.log(grid[i]);
      grid[i].item.addOutput(from.item);
    }
  }
};

const handleClick = (e) => {
  const x = Math.floor((e.clientX - canvas.offsetLeft) / cellSize);
  const y = Math.floor((e.clientY - canvas.offsetTop) / cellSize);

  for (let i = 0; i < grid.length; i++) {
    if (!grid[i].isEmpty()) continue;

    if (grid[i].x == x && grid[i].y == y) {
      const selected = itemSelected.selected;
      const direction = itemSelected.direction;

      let newItem = null;
      if (selected == "Miner") newItem = new Miner("miner", x, y, cellSize, direction);
      else if (selected == "Belt") newItem = new Belt("belt", x, y, cellSize, direction);
      else if (selected == "Chest") newItem = new Chest("chest", x, y, cellSize, direction);

      grid[i].addItem(newItem);
      scanForOutput(grid[i]);
    }
  }
};

const handleKeyboard = (e) => {
  if (e.key == "r") {
    if (itemSelected.direction == "right") itemSelected.direction = "bottom";
    else if (itemSelected.direction == "bottom") itemSelected.direction = "left";
    else if (itemSelected.direction == "left") itemSelected.direction = "top";
    else if (itemSelected.direction == "top") itemSelected.direction = "right";
  }
};

window.addEventListener("click", (e) => handleClick(e));
window.addEventListener("keydown", (e) => handleKeyboard(e));

for (const item of items) {
  item.addEventListener("click", (e) => {
    for (const other of items) {
      other.classList.remove("active");
    }
    item.classList.add("active");
    itemSelected.selected = e.target.innerHTML;
  });
}
