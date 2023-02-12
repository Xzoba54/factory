const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

export default class Cell {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.item = null;
    this.calcOutput();
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x * this.size, this.y * this.size, this.size, this.size);
    if (this.item) {
      this.item.draw();
    }
  }
  calcOutput() {
    if (this.item) {
      if (this.item.direction == "right") {
        this.item.outputX = this.item.x + 1;
        this.item.outputY = this.item.y;
      } else if (this.item.direction == "bottom") {
        this.item.outputX = this.item.x;
        this.item.outputY = this.item.y + 1;
      } else if (this.item.direction == "left") {
        this.item.outputX = this.item.x - 1;
        this.item.outputY = this.item.y;
      } else if (this.item.direction == "top") {
        this.item.outputX = this.item.x;
        this.item.outputY = this.item.y - 1;
      }
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
