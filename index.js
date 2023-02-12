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
  direction: "bottom",
};

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

const gameLoop = () => {
  drawGrid();

  requestAnimationFrame(gameLoop);
};

const init = () => {
  initGrid();
  gameLoop();
};
init();

const newConnection = (from) => {
  for (let i = 0; i < grid.length; i++) {
    if (grid[i].isEmpty()) continue;

    if (grid[i].item.outputY == from.y && grid[i].item.outputX == from.x) {
      console.log(from.item);
      from.item.addOutput(grid[i].item);
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
      grid[i].calcOutput();
      newConnection(grid[i]);
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
