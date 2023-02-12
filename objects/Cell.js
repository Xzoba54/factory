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
