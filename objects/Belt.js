const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

export default class Belt {
  constructor(name, x, y, size, direction) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.size = size;
    this.direction = direction;
    this.count = 0;
    this.capacity = 4;
    this.output = null;
    this.image = new Image();
    this.setImage();
    this.start();
  }
  setImage() {
    if (this.direction === "right") this.image.src = "../textures/beltRight.png";
    else if (this.direction === "bottom") this.image.src = "../textures/beltBottom.png";
  }
  draw() {
    ctx.drawImage(this.image, this.x * this.size, this.y * this.size);
    ctx.fillStyle = "orange";
    ctx.font = "30px Arial";
    ctx.fillText(this.count, this.x * this.size, this.y * this.size + 22);
  }
  start() {
    setInterval(() => {
      if (this.output) {
        if (this.count > 0) {
          if (this.output.count < this.output.capacity) {
            this.count--;
            this.output.count++;
          }
        }
      }
    }, 1000);
  }
  isFull() {
    if (this.count < this.capacity) return false;
    else return true;
  }
  addOutput(output) {
    this.output = output;
  }
}
