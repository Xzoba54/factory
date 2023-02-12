const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

export default class Miner {
  constructor(name, x, y, size, direction) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.size = size;
    this.direction = direction;
    this.count = 0;
    this.capacity = 100;
    this.output = null;
    this.image = new Image();
    this.setImage();
    this.mine();
  }
  setImage() {
    if (this.direction === "right") this.image.src = "../textures/minerBottom.png";
    else if (this.direction === "bottom") this.image.src = "../textures/minerBottom.png";
  }
  draw() {
    ctx.drawImage(this.image, this.x * this.size, this.y * this.size);
    ctx.fillStyle = "orange";
    ctx.font = "30px Arial";
    ctx.fillText(this.count, this.x * this.size, this.y * this.size + 22);
  }
  mine() {
    setInterval(() => {
      if (this.count < this.capacity) this.count++;

      if (this.output) {
        if (this.output.count < this.output.capacity) {
          this.count--;
          this.output.count++;
        }
      }
    }, 1000);
  }
  addOutput(output) {
    this.output = output;
  }
}
