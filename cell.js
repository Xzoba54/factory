const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

export default class Cell {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.item = null;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x * this.size, this.y * this.size, this.size, this.size);
    if (this.item) {
      this.item.draw();
    }
  }
  addItem(item) {
    this.item = item;
  }
  isEmpty() {
    if (this.item) return false;
    else return true;
  }
}

export class Belt {
  constructor(name, x, y, size, cellSize, color, direction) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.size = size;
    this.cellSize = cellSize;
    this.color = color;
    this.direction = direction;
    this.capacity = 4;
    this.count = 0;
    this.image = new Image();
  }
  setImage(imageURL) {
    this.image.src = imageURL;
  }
  draw() {
    ctx.fillStyle = this.color;
    if (this.direction === "right") {
      // ctx.fillRect(this.x * this.cellSize, this.y * this.cellSize + this.cellSize / 2 - this.size / 2, this.cellSize, this.size);
      ctx.drawImage(this.image, this.x * this.cellSize, this.y * this.cellSize + this.cellSize / 2 - this.size / 2);
    } else if (this.direction === "bottom") {
      ctx.drawImage(this.image, this.x * this.cellSize, this.y * this.cellSize);
    }
    ctx.fillStyle = "orange";
    ctx.font = "30px Arial";
    ctx.fillText(this.count, this.x * this.cellSize + this.cellSize / 2, this.y * this.cellSize + this.cellSize / 2);
  }
}

export class Miner {
  constructor(x, y, size, cellSize, color, output) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.cellSize = cellSize;
    this.color = color;
    this.output = output;
    this.count = 0;
    this.start();
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x * this.cellSize + this.cellSize / 2 - this.size / 2, this.y * this.cellSize + this.cellSize / 2 - this.size / 2, this.size, this.size);

    if (this.output === "right") {
      ctx.fillStyle = "green";
      ctx.fillRect(this.x * this.cellSize + this.cellSize / 2 + this.size / 2, this.y * this.cellSize + this.cellSize / 2 - 20 / 2, 10, 20);
    }
    ctx.fillStyle = "orange";
    ctx.font = "30px Arial";
    ctx.fillText(this.count, this.x * this.cellSize + this.cellSize / 2, this.y * this.cellSize + this.cellSize / 2);
  }
  mine() {
    if (this.count < 100) {
      this.count++;
    }
  }
  start() {
    setInterval(this.mine.bind(this), 1000);
  }
}

export class Chest {
  constructor(x, y, size, cellSize, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.cellSize = cellSize;
    this.color = color;
    this.capacity = 100;
    this.count = 0;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.font = "30px Arial";
    ctx.fillRect(this.x * this.cellSize, this.y * this.cellSize, this.size, this.size);
    ctx.fillStyle = "orange";
    ctx.fillText(this.count, this.x * this.cellSize + this.cellSize / 2, this.y * this.cellSize + this.cellSize / 2);
  }
}
