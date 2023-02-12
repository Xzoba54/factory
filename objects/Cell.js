const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

export default class Cell {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.item = null;
    this.image = new Image();
    this.resourceImage = new Image();
    this.resource = null;
    this.calcOutput();
    this.randomResource();
    this.setImage();
    this.setResourceImage();
  }
  randomResource() {
    const random = Math.floor(Math.random() * 2);

    if (random == 0) this.resource = null;
    else if (random == 1) this.resource = "iron";
  }
  setResourceImage() {
    this.resourceImage.src = "../textures/ironResource.png";
  }
  setImage() {
    this.image.src = "../textures/dirt.png";
  }
  draw() {
    ctx.drawImage(this.image, this.x * this.size, this.y * this.size);

    if (this.resource == "iron") {
      ctx.drawImage(this.resourceImage, this.x * this.size, this.y * this.size);
    }

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
  isResource() {
    if (this.resource) return true;
    else return false;
  }
}
