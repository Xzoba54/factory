import Cell from "./Cell.js";
import { Miner, Belt, Chest } from "./Cell.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
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

const pass = async () => {
  for (let i = 0; i < grid.length; i++) {
    if (!grid[i].item) continue;
    if (grid[i].item.count <= 0) continue;

    for (let j = 0; j < grid.length; j++) {
      if (!grid[j].item) continue;
      // if (grid[j].item.name != "belt") continue;

      if (grid[i].x == grid[j].x - 1 && grid[i].y == grid[j].y) {
        if (grid[j].item.count >= grid[j].item.capacity) continue;

        await delay(0.5);
        grid[i].item.count--;
        grid[j].item.count++;
      }
    }
  }
};

setInterval(() => {
  pass();
}, 1000);

initGrid();
const init = () => {
  drawGrid();
  requestAnimationFrame(init);
};
init();

const handleClick = (e) => {
  const x = Math.floor((e.clientX - canvas.offsetLeft) / cellSize);
  const y = Math.floor((e.clientY - canvas.offsetTop) / cellSize);

  for (let i = 0; i < grid.length; i++) {
    if (!grid[i].isEmpty()) continue;

    if (grid[i].x == x && grid[i].y == y) {
      if (itemSelected.selected === "Miner") {
        const output = "right";
        const newMiner = new Miner(x, y, 40, cellSize, "blue", output);
        grid[i].addItem(newMiner);
      } else if (itemSelected.selected === "Belt") {
        const direction = itemSelected.direction;
        const newBelt = new Belt("belt", x, y, 60, cellSize, "pink", direction);
        if (direction == "right") newBelt.setImage("./beltRight.png");
        if (direction == "bottom") newBelt.setImage("./beltBottom.png");
        grid[i].addItem(newBelt);
      } else if (itemSelected.selected === "Chest") {
        const newChest = new Chest(x, y, 40, cellSize, "purple");
        grid[i].addItem(newChest);
      }
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

window.addEventListener("keydown", (e) => handleKeyboard(e));
window.addEventListener("click", (e) => handleClick(e));

for (const item of items) {
  item.addEventListener("click", (e) => {
    for (const other of items) {
      other.classList.remove("active");
    }
    item.classList.add("active");
    itemSelected.selected = e.target.innerHTML;
  });
}
