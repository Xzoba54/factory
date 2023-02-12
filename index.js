import Cell from "./objects/Cell.js";
import Belt from "./objects/Belt.js";
import Miner from "./objects/Miner.js";
import Chest from "./objects/Chest.js";

const items = [...document.querySelectorAll(".item")];

const canvas = document.querySelector("canvas");

canvas.width = 900;
canvas.height = 900;

let grid = [];
const gridSize = 10;
const cellSize = 90;

let itemSelected = {
  selected: null,
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

const init = async () => {
  initGrid();
  gameLoop();
};
init();

const checkConnections = () => {
  for (let i = 0; i < grid.length; i++) {
    if (grid[i].isEmpty()) continue;
    for (let j = 0; j < grid.length; j++) {
      if (grid[j].isEmpty()) continue;

      if (grid[j].item.outputY == grid[i].y && grid[j].item.outputX == grid[i].x) {
        grid[i].item.addOutput(grid[j].item);
      }
    }
  }
};

const inventory = document.querySelector(".inventory");
let isInventoryOpen = false;

const handleClick = (e) => {
  const x = Math.floor((e.clientX - canvas.offsetLeft) / cellSize);
  const y = Math.floor((e.clientY - canvas.offsetTop) / cellSize);

  for (let i = 0; i < grid.length; i++) {
    // if (grid[i].item?.name == "chest") {
    //   if (!isInventoryOpen) {
    //     console.log(grid[i].item.count);
    //     inventory.style = "display: grid";
    //     isInventoryOpen = true;
    //   } else {
    //     inventory.style = "display: none";
    //     isInventoryOpen = false;
    //   }

    //   continue;
    // }
    // if (grid[i].name == "chest") {
    //   console.log(grid[i].item.slots);
    // }
    if (grid[i].x == x && grid[i].y && grid[i].item && grid[i].item.name == "chest") {
      console.log(grid[i].item.slots);
    }
    if (!grid[i].isEmpty()) continue;

    if (grid[i].x == x && grid[i].y == y) {
      const selected = itemSelected.selected;
      const direction = itemSelected.direction;

      if (!selected) return;

      let newItem = null;
      if (selected == "miner" && grid[i].isResource()) newItem = new Miner("miner", x, y, cellSize, direction, grid[i].resource);
      else if (selected == "belt") newItem = new Belt("belt", x, y, cellSize, direction);
      else if (selected == "chest") newItem = new Chest("chest", x, y, cellSize, direction);

      grid[i].addItem(newItem);
      grid[i].calcOutput();
      checkConnections();
    }
  }
};

const handleKeyboard = (e) => {
  if (e.key == "r") {
    const direction = itemSelected.direction;

    if (direction == "right") itemSelected.direction = "bottom";
    else if (direction == "bottom") itemSelected.direction = "left";
    else if (direction == "left") itemSelected.direction = "top";
    else if (direction == "top") itemSelected.direction = "right";
  }

  if (e.key == "e") {
    isInventoryOpen = false;
    inventory.style = "display: none";
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
    itemSelected.selected = e.target.title;
  });
}
