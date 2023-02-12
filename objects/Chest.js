const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

export default class Chest {
  constructor(name, x, y, size, direction) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.size = size;
    this.direction = direction;
    this.count = 0;
    this.capacity = 100;
    this.image = new Image();
    this.setImage();
  }
  setImage() {
    this.image.src = "../textures/chest.png";
  }
  draw() {
    ctx.drawImage(this.image, this.x * this.size, this.y * this.size);
    ctx.fillStyle = "orange";
    ctx.font = "30px Arial";
    ctx.fillText(this.count, this.x * this.size, this.y * this.size + 22);
  }
}
