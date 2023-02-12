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
    this.image.src = `../textures/${this.name}${this.direction.charAt(0).toUpperCase() + this.direction.slice(1, this.direction.length)}.png`;
  }
  draw() {
    ctx.drawImage(this.image, this.x * this.size, this.y * this.size);

    ctx.fillStyle = "orange";
    ctx.font = "30px Arial";
    ctx.fillText(this.count, this.x * this.size, this.y * this.size + 22);
  }
  async start() {
    if (this.output) {
      const delay = (t) => new Promise((res) => setTimeout(res, t * 1000));
      await delay(0.05);

      if (!this.isFull()) {
        if (this.output.count > 0) {
          this.count++;
          this.output.count--;
        }
      }
    }

    requestAnimationFrame(this.start.bind(this));
  }
  isFull() {
    if (this.count < this.capacity) return false;
    else return true;
  }
  addOutput(output) {
    this.output = output;
  }
}
